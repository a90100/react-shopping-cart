const initState = {
  items: [],
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADDTO_CART":
      return state;
    case "REMOVEFROM_CART":
      return state;
    case "DELETEFROM_CART":
      return state;
    case "DELETEALLFROM_CART":
      return state;
    case "EDIT_ITEM":
      return state;
    default:
      return state;
  }
};

export default cartReducer;
