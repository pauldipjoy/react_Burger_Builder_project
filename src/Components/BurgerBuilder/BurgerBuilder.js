import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Burger from "./Burger/Burger.js";
import Controls from "./Controls/Controls.js";
import Summary from "./Summary/Summary.js";

const INGREDIENT_PRICES = {
  salad: 20,
  cheese: 40,
  meat: 90,
};

export default class BurgerBuilder extends Component {
  state = {
    ingredients: [
      // {type:'salad', amount:1},
      // {type:'cheese', amount: 2},
      // {type:'meat', amount: 3},

      { type: "salad", amount: 0 },
      { type: "cheese", amount: 0 },
      { type: "meat", amount: 0 },
    ],

    totalPrice: 80,

    //* modal control state
    modalOpen: false,

    purchasable: false,
  };

  updatePurchasable = (ingredients) => {
    const sum = ingredients.reduce((sum, element) => {
      return sum + element.amount;
    }, 0);

    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandle = (type) => {
    // console.log(type);
    const ingredients = [...this.state.ingredients];
    //console.log(ingredients);

    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    for (let item of ingredients) {
      if (item.type === type) item.amount++;
    }
    this.setState({
      ingredients: ingredients,
      totalPrice: newPrice,
    });
    this.updatePurchasable(ingredients);
  };

  removeIngredientHandle = (type) => {
    //console.log(type);
    const ingredients = [...this.state.ingredients];
    //console.log(ingredients);

    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

    for (let item of ingredients) {
      if (item.type === type) {
        if (item.amount <= 0) return;
        item.amount--;
      }
    }
    this.setState({
      ingredients: ingredients,
      totalPrice: newPrice,
    });

    this.updatePurchasable(ingredients);
  };

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };

  handleCheckout = () =>{
    this.props.history.push("/checkout")

  }

  //// componentDidMount(){
////   this.props.history.push("/checkout")
 // //}



  render() {
    return (
      <div>
        <div className="d-flex flex-md-row flex-column">
          <Burger ingredients={this.state.ingredients} />
          <Controls
            ingredientAdded={this.addIngredientHandle}
            ingredientRemoved={this.removeIngredientHandle}
            price={this.state.totalPrice}
            toggleModal={this.toggleModal}
            purchasable={this.state.purchasable}
          />
        </div>
        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader>Your Order Summary</ModalHeader>
          <ModalBody>
            <h5>Total Price: {this.state.totalPrice.toFixed(0)} Rs/- </h5>
            <Summary ingredients={this.state.ingredients} />
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.handleCheckout}>
              Continue To Checkout!
            </Button>
            <Button color="danger" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
