import axios from "axios";
import { Formik } from "formik";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalBody } from "reactstrap";
import { resetIngredients } from "../../../redux/actionCreators.js";
import Spinner from "../../Spinner/Spinner";

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetIngredients: () => dispatch(resetIngredients()),
  };
};

class Checkout extends Component {
  state = {
    values: {
      deliveryAddress: "",
      phone: "",
      paymentType: "Cash On Delivery",
    },
    isLoading: false,
    isModalOpen: false,
    modalMsg: "",
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

  submitHandler = (values) => {
    this.setState({
      isLoading: true,
    });
    const order = {
      ingredients: this.props.ingredients,
      customer: values,
      price: this.props.totalPrice,
      orderTime: new Date(),
    };
    axios
      .post(
        "https://burger-builder1-43f71-default-rtdb.firebaseio.com/orders.json",
        order
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMsg: "Order placed Successfully!",
          });
          this.props.resetIngredients();
        } else {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMsg: "Something went wrong! Order Again!",
          });
        }
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          isModalOpen: true,
          modalMsg: "Something went wrong! Order Again!",
        });
      });
    ////console.log(this.state.values);
    ////console.log(order);
  };

  render() {
    let form = (
      <div>
        <h4
          style={{
            border: "1px solid grey",
            boxShadow: "1px 1px #888888",
            borderRadius: "5px",
            padding: "20px",
          }}
        >
          Payment: {this.props.totalPrice} Rs
        </h4>
        <Formik
          initialValues={{
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery",
          }}
          validate={(values) => {
            const errors = {};
            return errors;
          }}
          onSubmit={(values) => {
            this.submitHandler(values);
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            errors,
            touched,
          }) => (
            <form
              style={{
                border: "1px solid grey",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px",
              }}
              onSubmit={handleSubmit}
            >
              <textarea
                name="deliveryAddress"
                id="deliveryAddress"
                value={values.deliveryAddress}
                className="form-control"
                placeholder="Your Address"
                onChange={handleChange}
                onBlur={handleBlur}
              ></textarea>
              <span>
                {errors.deliveryAddress &&
                  touched.deliveryAddress &&
                  errors.deliveryAddress}
              </span>
              <br />
              <input
                name="phone"
                id="phone"
                className="form-control"
                value={values.phone}
                placeholder="number"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <br />
              <select
                name="paymentType"
                id="paymentType"
                className="form-control"
                value={values.paymentType}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="Cash On Delivery">Cash On Delivery</option>
                <option value="Paytm">Paytm</option>
              </select>
              <br />
              <Button
                style={{ backgroundColor: "#D70F64" }}
                className="mr-auto"
                ////onClick={this.submitHandler}
                disabled={!this.props.purchasable}
              >
                Place Order
              </Button>
              <Button color="secondary" className="ml-1" onClick={this.goBack}>
                Cancel
              </Button>
            </form>
          )}
        </Formik>
      </div>
    );

    return (
      <div>
        {this.state.isLoading ? <Spinner /> : form}
        <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
          <ModalBody>
            <p>{this.state.modalMsg}</p>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
