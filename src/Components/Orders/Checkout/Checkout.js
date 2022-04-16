import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
  };
};

class Checkout extends Component {
  state = {
    values: {
      deliveryAddress: "",
      phone: "",
      paymentType: "Cash On Delivery",
    },
  };

  goBack = () => {
    this.props.history.goBack("/");
  };

  inputChangeHandler = (e) => {
    this.setState({
      values: {
        ...this.state.values,
        [e.target.name]: e.target.value,
      },
    });
  };

  submitHandler = () => {
    const order = {
      ingredients: this.props.ingredients,
      customer: this.state.values,
      price: this.props.totalPrice,
      orderTime: new Date(),
    };
    axios
      .post(
        "https://burger-builder-a41c1-default-rtdb.firebaseio.com/orders.json",
        order
      )
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    ////console.log(this.state.values);
    ////console.log(order);
  };

  render() {
    return (
      <div>
        <h4
          style={{
            border: "1px solid grey",
            boxShadow: "1px 1px #888888",
            borderRadius: "5px",
            padding: "20px",
          }}
        >
          Payment: {this.props.totalPrice} Rs/-
        </h4>
        <form
          style={{
            border: "1px solid grey",
            boxShadow: "1px 1px #888888",
            borderRadius: "5px",
            padding: "20px",
          }}
        >
          <textarea
            name="deliveryAddress"
            value={this.state.values.deliveryAddress}
            className="form-control"
            placeholder="your address"
            onChange={(e) => this.inputChangeHandler(e)}
          ></textarea>
          <br />
          <input
            name="phone"
            className="form-control"
            value={this.state.values.phone}
            placeholder="number"
            onChange={(e) => this.inputChangeHandler(e)}
          />
          <br />
          <select
            name="paymentType"
            className="form-control"
            value={this.state.values.paymentType}
            onChange={(e) => this.inputChangeHandler(e)}
          >
            <option value="Cash On Delivery">Cash On Delivery</option>
            <option value="Paytm">Paytm</option>
          </select>
          <br />
          <Button
            style={{ backgroundColor: "#D70F64" }}
            className="mr-auto"
            onClick={this.submitHandler}
          >
            Place Order
          </Button>
          <Button color="secondary" className="ml-1" onClick={this.goBack}>
            Cancel
          </Button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Checkout);
