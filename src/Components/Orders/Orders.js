import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../../redux/actionCreators";
import Spinner from "../Spinner/Spinner.js";
import Order from "./Order/Order";

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    orderLoading: state.orderLoading,
    orderErr: state.orderErr,
    token: state.token,
    userId: state.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
  };
};
class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token, this.props.userId);
  }
  componentDidUpdate() {
    console.log(this.props);
  }
  render() {
    let orders = null;
    if (this.props.orderErr) {
      orders = (
        <p
          style={{
            border: "1px solid grey",
            boxShadow: "1px 1px #888888",
            borderRadius: "5px",
            padding: "20px",
            marginBottom: "10px",
          }}
        >
          Sorry! Failed To Load Orders
        </p>
      );
    } else {
      if (this.props.orders.length === 0) {
        orders = (
          <p
            style={{
              border: "1px solid grey",
              boxShadow: "1px 1px #888888",
              borderRadius: "5px",
              padding: "20px",
              marginBottom: "10px",
            }}
          >
            You Have No Load Orders!
          </p>
        );
      } else {
        orders = this.props.orders.map((order) => {
          ////console.log(order);
          return <Order order={order} key={order.id} />;
        });
      }
    }

    return <div>{this.props.orderLoading ? <Spinner /> : orders}</div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
