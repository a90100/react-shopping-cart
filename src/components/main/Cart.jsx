import React from 'react';
import styled from 'styled-components';
import Item from '../common/Item';
import { YellowBtn } from '../common/Button';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { deleteAllFromCart } from '../../store/actions/itemAction';

const CartWrapper = styled.div`
  margin: 20px 3%;

  .hr {
    border-bottom: 1px solid grey;
    clear: both;
  }

  .buy-part {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 20px;
  }
`;

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0
    }
  }

  getPrice = price => {
    let total = this.state.totalPrice;
    this.setState({ totalPrice: total -= price });
  }

  getItems = (items, auth) => {
    if (!items) {
      return;
    }

    return items.filter(item => item.uid === auth.uid).map((item) => <Item item={item} key={item.id} text={'從購物籃移除'} getPrice={this.getPrice} />);
  };

  removeAllItem = () => {
    this.props.deleteAllFromCart(this.props.auth.uid);
    this.setState({ totalPrice: 0 });
  }

  componentDidMount() {
    let total = 0;
    const { items, auth } = this.props;
    if(items) {
      items.filter(item => item.uid === auth.uid).map(item => this.setState({ totalPrice: total += item.price }));
    }
  }

  render() {
    const { items, auth } = this.props;

    if(!auth.uid) {
      return <Redirect to="/login" />;
    }

    return (
      <CartWrapper>
        <h2 style={{ marginLeft: '1%' }}>商品列表</h2>
        {this.getItems(items, auth)}
        <div className="hr"></div>
        <div className="buy-part">
          <span style={{ marginRight: '10px' }}>總金額 : $ {this.state.totalPrice}</span>
          <YellowBtn onClick={this.removeAllItem}>購買</YellowBtn>
        </div>
      </CartWrapper>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    items: state.firestore.ordered.cartItem,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps, { deleteAllFromCart }),
  firestoreConnect([
    { collection: 'cartItem' },
  ])
)(Cart);