export const createToAllItem = item => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const itemId = firestore.collection('totalItem').doc().id;

  firestore.collection('totalItem').doc(itemId).set({
    ...item,
    uid,
    itemId
  }).then(() => {
    dispatch({ type: 'CREATETO_ALLITEM', payload: item });
  }).catch(err => {
    console.log(err);
  })
}

export const addToCart = item => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;

  firestore.collection('cartItem').doc(item.itemId).set({
    ...item,
    uid
  }).then(() => {
    dispatch({ type: 'ADDTO_CART', payload: item });
  })
  .catch((err) => {
    console.log(err);
  });
}

export const removeFromCart = item => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore.collection('cartItem').doc(item.itemId).delete().then(() => {
    dispatch({ type: 'REMOVEFROM_CART', payload: null });
  })
}

export const deleteFromCart = item => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore.collection('totalItem').doc(item.itemId).delete().then(() => {
    dispatch({ type: 'DELETEFROM_CART', payload: null });
  })
}

export const deleteAllFromCart = id => (dispatch, getState, { getFirestore }) => {
  // 傳入參數 id 為 user id，用來跟每個 item 的 uid 做比較
  const firestore = getFirestore();
  firestore.collection('cartItem').get().then(snapshot => {
      snapshot.forEach(doc => {
        if(id === doc.data().uid) {
          firestore.collection('cartItem').doc(doc.id).delete().then(() => {
            dispatch({ type: 'DELETEALLFROM_CART', payload: null });
          })
        }
    });
  })
}

export const editItem = item => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore.collection('totalItem').doc(item.itemId).update({
    title: item.title,
    price: item.price,
    description: item.description,
    img: item.img
  }).then(() => {
    dispatch({ type: 'EDIT_ITEM', payload: item });
  }).catch(err => {
    console.log(err);
  })
}