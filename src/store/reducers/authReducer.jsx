const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return {
        ...state,
        authError: "登入失敗，請檢查是否已註冊或是密碼輸入是否正確",
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        authError: null,
      };
    case "SIGNOUT_SUCCESS":
      return state;
    case "REGISTER_SUCCESS":
      return {
        ...state,
        authError: null,
      };
    case "REGISTER_ERROR":
      return {
        ...state,
        authError: "註冊失敗，該帳戶已被使用",
      };
    default:
      return state;
  }
};

export default authReducer;
