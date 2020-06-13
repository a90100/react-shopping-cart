import authReducer from './authReducer';
import totalItemReducer from './totalItemReducer';
import cartReducer from './cartReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  totalItem: totalItemReducer,
  cart: cartReducer,
  firestore: firestoreReducer, // 取出 firebase 的資料
  firebase: firebaseReducer, // 取得 firebase auth
});

export default rootReducer;