import React from "react";
import styled from "styled-components";
import Item from "../common/Item";
import { YellowBtn } from "../common/Button";
import { Label, Input, InputWrapper } from "../common/FormComponents";
import { connect } from "react-redux";
import { createToAllItem, editItem } from "../../store/actions/itemAction";
import { storage } from "../../config/fbConfig";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

const UserWrapper = styled.div`
  margin: 20px 3%;

  .hr {
    border-bottom: 1px solid grey;
    clear: both;
  }

  .d-flex {
    display: flex;
  }
`;

const YellowBtnPos = styled(YellowBtn)`
  float: right;
  margin: 20px 10px 20px 0;
`;

const Warn = styled.span`
  color: red;
`;

class User extends React.Component {
  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
    this.priceInput = React.createRef();
    this.descriptionInput = React.createRef();
  }
  
  state = {
    title: "",
    price: 0,
    description: "",
    img: "",
    editState: false,
    uid: '',
    itemId: ''
  };

  getItems = (items, auth) => {
    if (!items) {
      return;
    }

    return items
      .filter((item) => item.uid === auth.uid)
      .map((item) => <Item item={item} key={item.id} text={"移除"} getEditItem={this.getEditItem} />);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.description) {
      this.setState({ description: "無描述" });
    }

    const uploadTask = storage
      .ref(`images/${this.state.img.name}`)
      .put(this.state.img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // console.log(snapshot);
      },
      (error) => {
        // console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(this.state.img.name)
          .getDownloadURL()
          .then((url) => {
            this.setState({ img: url });
            this.setState({ price: parseInt(this.state.price) });

            if(!this.state.editState) {
              this.props.createToAllItem({
                title: this.state.title,
                price: this.state.price,
                description: this.state.description,
                img: this.state.img
              });
            } else {
              this.props.editItem({
                title: this.titleInput.value,
                price: parseInt(this.priceInput.value),
                description: this.descriptionInput.value,
                img: this.state.img,
                uid: this.state.uid,
                itemId: this.state.itemId
              })
              this.setState({ editState: false });
            }
          });
      }
    );
  };

  handleInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  insertImage = (e) => {
    if (e.target.files[0]) {
      this.setState({ img: e.target.files[0] });
    }
  };

  getEditItem = (state) => {
    this.setState({ editState: true });
    this.setState({ uid: state.uid });
    this.setState({ itemId: state.itemId });
    this.titleInput.value = state.title;
    this.priceInput.value = state.price;
    this.descriptionInput.value = state.description;
  }

  render() {
    const { items, auth } = this.props;

    if (!auth.uid) {
      return <Redirect to="/" />;
    }

    return (
      <UserWrapper>
        <h2 style={{ marginLeft: "1%" }}>我的商品</h2>
        {this.getItems(items, auth)}
        <div className="hr"></div>
        <h2 style={{ marginLeft: "1%" }}>{ this.state.editState ? '編輯商品' : '新增商品'}</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="d-flex">
            <InputWrapper>
              <Label htmlFor="title">
                商品名稱<Warn> (* 必填)</Warn>
              </Label>
              <Input
                type="text"
                id="title"
                autoComplete="off"
                onChange={this.handleInput}
                maxLength="30"
                ref={value => this.titleInput = value}
              />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="price">
                商品價格(新台幣)<Warn> (* 必填)</Warn>
              </Label>
              <Input
                type="number"
                id="price"
                autoComplete="off"
                min="0"
                onChange={this.handleInput}
                ref={value => this.priceInput = value}
              />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="description">商品簡述(30字內)</Label>
              <Input
                type="text"
                id="description"
                autoComplete="off"
                onChange={this.handleInput}
                maxLength="30"
                ref={value => this.descriptionInput = value}
              />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="img">
                商品照片<Warn> (* 必填)</Warn>
              </Label>
              <Input
                type="file"
                id="img"
                autoComplete="off"
                min="0"
                accept="image/*"
                onChange={this.insertImage}
              />
            </InputWrapper>
          </div>
          <YellowBtnPos type="submit">{ this.state.editState ? '更新' : '上架'}</YellowBtnPos>
        </form>
      </UserWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.firestore.ordered.totalItem,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps, { createToAllItem, editItem }),
  firestoreConnect([
    // 當 collection 內的內容改變時，就會呼叫 firestoreReducer，把資料傳到 state
    { collection: "totalItem" },
    { collection: "cartItem" },
  ])
)(User);
