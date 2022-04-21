import axios from "axios";
import * as actionTypes from './actionTypes';


export const authSuccess = (token, userId) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId,
        }
    }
}



export const auth = (email, password, mode) => (dispatch) => {
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

  let authUrl = null;
  if (mode === "Sign Up") {
    authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  } else {
    authUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  }

  const API_KEY = "AIzaSyCRaN_mciZqI4ACwkezp6IGBv4D3__O6-k";

  axios
    .post(authUrl + API_KEY, authData)
    .then((response) =>{
        localStorage.setItem('token' , response.data.idToken);
        localStorage.setItem('userId' , response.data.localId);
        const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('expirationTime' , expirationTime)
        dispatch(authSuccess(response.data.idToken, response.data.localId))
    });
};

//* Local storage check token -

export const authCheck = () => dispatch =>{
  const token = localStorage.getItem('token');
  if(!token){
    //! logout
  }else{
    const expirationTime = new Date(localStorage.getItem('expirationTime'));
    if(expirationTime <= new Date()){
      //! logout
    } else {
      const userId = localStorage.getItem('userId');
      dispatch(authSuccess(token, userId))
    }
  }
}