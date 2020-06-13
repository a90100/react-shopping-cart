export const login = (credential) => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  firebase
    .auth()
    .signInWithEmailAndPassword(credential.email, credential.password)
    .then(() => {
      dispatch({ type: "LOGIN_SUCCESS" });
    })
    .catch((err) => {
      dispatch({ type: "LOGIN_ERROR", err });
    });
};

export const signout = () => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: "SIGNOUT_SUCCESS" });
    });
};

export const register = (newUser) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((res) => {
      // 在 firestore 建立 document
      return firestore.collection("users").doc(res.user.uid).set({
        email: newUser.email,
        password: newUser.password,
        userName: newUser.name,
      });
    })
    .then(() => {
      dispatch({ type: "REGISTER_SUCCESS" });
    })
    .catch((err) => {
      dispatch({ type: "REGISTER_ERROR", err });
    });
};
