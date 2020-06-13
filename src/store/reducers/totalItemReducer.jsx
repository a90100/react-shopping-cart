const initState = {
  items: []
};

const totalItemReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATETO_ALLITEM':
      return state;
    default:
      return state;
  }
};

export default totalItemReducer;
