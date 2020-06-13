import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import carousel1 from "../../imgs/carousel1.jpg";
import carousel2 from "../../imgs/carousel2.jpg";
import carousel3 from "../../imgs/carousel3.jpg";
import styled from "styled-components";
import Item from "../common/Item";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

const CarouselMargin = styled(Carousel)`
  margin: 30px 4% 0 4%;
`;

const ItemList = styled.div`
  margin: 0 3%;
`;

const Dashboard = ({ items, auth }) => {
  if (!auth.uid) {
    return <Redirect to="/login" />;
  }

  const getItems = (items) => {
    if (!items) {
      return;
    }

    return items
      .filter((item) => item.uid !== auth.uid)
      .map((item) => <Item item={item} key={item.id} text={"加入購物籃"} />);
  };

  return (
    <>
      <CarouselMargin>
        <div>
          <img src={carousel1} alt="" />
        </div>
        <div>
          <img src={carousel2} alt="" />
        </div>
        <div>
          <img src={carousel3} alt="" />
        </div>
      </CarouselMargin>
      <h2 style={{ marginLeft: "4%" }}>商品列表</h2>
      <ItemList>{getItems(items)}</ItemList>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.firestore.ordered.totalItem,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    // 當 collection 內的內容改變時，就會呼叫 firestoreReducer，把資料傳到 state
    { collection: "totalItem" },
    { collection: "cartItem" },
  ])
)(Dashboard);
