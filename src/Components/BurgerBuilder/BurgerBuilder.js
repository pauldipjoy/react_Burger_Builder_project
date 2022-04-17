import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import {
  addIngredient,
  removeIngredient,
  updatePurchasable
} from "../../redux/actionCreators.js";
import Burger from "./Burger/Burger.js";
import Controls from "./Controls/Controls.js";
import Summary from "./Summary/Summary.js";


const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ingtype) => dispatch(addIngredient(ingtype)),
    removeIngredient: (ingtype) => dispatch(removeIngredient(ingtype)),
    updatePurchasable: () => dispatch(updatePurchasable()),
  };
};

class BurgerBuilder extends Component {
  state = {
    //* modal control state
    modalOpen: false,
  };

  addIngredientHandle = (type) => {
    this.props.addIngredient(type);
    this.props.updatePurchasable();
  };

  removeIngredientHandle = (type) => {
    this.props.removeIngredient(type);
    this.props.updatePurchasable();
  };

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };

  handleCheckout = () => {
    this.props.history.push("/checkout");
  };

  //// componentDidMount(){
  ////   this.props.history.push("/checkout")
  // //}

  render() {
    return (
      <div>
        <div className="d-flex flex-md-row flex-column">
          <Burger ingredients={this.props.ingredients} />
          <Controls
            ingredientAdded={this.addIngredientHandle}
            ingredientRemoved={this.removeIngredientHandle}
            price={this.props.totalPrice}
            toggleModal={this.toggleModal}
            purchasable={this.props.purchasable}
          />
        </div>
        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader>Your Order Summary</ModalHeader>
          <ModalBody>
            <h5>Total Price: {this.props.totalPrice.toFixed(0)} Rs/- </h5>
            <Summary ingredients={this.props.ingredients} />
          </ModalBody>
          <ModalFooter>
            <Button style={{ backgroundColor: "#D70F64"}}  onClick={this.handleCheckout}>
              Continue To Checkout!
            </Button>
            <Button color="secondary" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
