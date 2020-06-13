import React from 'react';
import styled from 'styled-components';
import { GreenBtn, RedBtn, BlueBtn } from './Button';
import { connect } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  deleteFromCart
} from '../../store/actions/itemAction';

const ItemWrapper = styled.div`
  width: 18%;
  margin: 0 1% 20px 1%;
  border: 1px solid grey;
  background-color: #f4f4f4;
  float: left;
  border-radius: 5px;
  position: relative;

  .img {
    background-size: cover;
    background-position: center center;
    width: 100%;
    height: 140px;
  }

  .content {
    padding: 0 10px 10px 10px;
  }

  .title {
    font-size: 20px;
    margin-bottom: 0;
  }

  .price {
    color: #1452ff;
  }

  .description {
    margin-top: 0;
    color: #c94900;
    height: 60px;
  }

  &:hover {
    border: 1px solid #000;
    transition: 0.5s;
  }

  .d-flex {
    display: flex;
    justify-content: space-between;
  }
`;

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      price: 0,
      description: '',
      img: '',
      uid: '',
      itemId: ''
    };
  }

  addItem = () => {
    this.props.addToCart(this.state);
  };

  removeItem = () => {
    this.props.removeFromCart(this.state);
    this.props.getPrice(this.state.price);
  };

  deleteItem = () => {
    this.props.deleteFromCart(this.state);
  }

  editItem = () => {
    this.props.getEditItem(this.state);
  }

  printBtn = (text) => {
    if (text === '加入購物籃') {
      return <GreenBtn onClick={this.addItem}>{text}</GreenBtn>;
    } else if (text === '從購物籃移除') {
      return <RedBtn onClick={this.removeItem}>{text}</RedBtn>;
    } else if (text === '移除') {
      return (
        <div className="d-flex">
          <BlueBtn onClick={this.editItem} style={{ marginRight: '5px' }}>編輯</BlueBtn>
          <RedBtn onClick={this.deleteItem}>{text}</RedBtn>
        </div>
      )
    }
  };

  componentDidMount() {
    const { item } = this.props;
    this.setState({
      title: item.title,
      price: item.price,
      description: item.description,
      img: item.img,
      uid: item.uid,
      itemId: item.itemId
    });
  }

  render() {
    const { item, text } = this.props;

    if (!item) {
      return;
    }

    return (
      <ItemWrapper>
        <div
          className="img"
          style={{ backgroundImage: `url(${item.img})` }}
        ></div>
        <div className="content">
          <p className="title">{item.title}</p>
          <p className="description">{item.description}</p>
          <div className="d-flex">
            <span className="price">${item.price}</span>
            {this.printBtn(text, item)}
          </div>
        </div>
      </ItemWrapper>
    );
  }
}

export default connect(null, { addToCart, removeFromCart, deleteFromCart })(
  Item
);
