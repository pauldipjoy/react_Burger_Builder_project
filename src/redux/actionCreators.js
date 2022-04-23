import axios from "axios";
import * as actionTypes from "./actionTypes.js";




export const addIngredient = (ingtype) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: ingtype,
  };
};

export const removeIngredient = (ingtype) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: ingtype,
  };
};

export const updatePurchasable = () => {
  return {
    type: actionTypes.UPDATE_PURCHASABLE,
  };
};

export const resetIngredients = () => {
  return {
    type: actionTypes.RESET_INGREDIENTS,
  };
};

export const loadOrders = (orders) => {
  return {
    type: actionTypes.LOAD_ORDERS,
    payload: orders,
  };
};

export const orderLoadFailed = () => {
  return {
    type: actionTypes.ORDER_LOAD_FAILED,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {

    const queryParams = '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get(
        'https://burger-builder1-43f71-default-rtdb.firebaseio.com/orders.json?auth=' +
          token + queryParams
      )
      .then((response) => {
        dispatch(loadOrders(response.data));
      })
      .catch((err) => {
        dispatch(orderLoadFailed());
      });
  }; 
};
