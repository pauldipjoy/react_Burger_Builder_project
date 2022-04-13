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
