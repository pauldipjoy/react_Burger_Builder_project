import { Formik } from "formik";
import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../../redux/authActionCreators";


const mapDispatchToProps = (dispatch) =>{
  return{
    auth: (email, password) => dispatch(auth(email, password))
  }
}

class Auth extends Component {
  state = {
    mode: "Sign Up",
  };

  switchModeHandler = () => {
    this.setState({
      mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up",
    });
  };

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            email: "",
            password: "",
            passwordConfirm: "",
          }}
          onSubmit={(values) => {
            ////console.log("Values:", values);
            this.props.auth(values.email, values.password)
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required!";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required!";
            } else if (values.password.length < 4) {
              errors.password = "Must be atleast 4 Characters!";
            }

            if (this.state.mode === "Sign Up") {
              if (!values.passwordConfirm) {
                errors.passwordConfirm = "Required!";
              } else if (values.password !== values.passwordConfirm) {
                errors.passwordConfirm = "Password field does not match!";
              }
            }

            ////console.log("Errors:", errors);
            return errors;
          }}
        >
          {({ values, handleChange, handleSubmit, errors }) => (
            <div
              style={{
                border: "1px solid grey",
                padding: "15px",
                borderRadius: "5px",
              }}
            >
              <button
                style={{
                  width: "100%",
                  border: "1px solid grey",
                  backgroundColor: "#D70F64",
                  color: "white",
                  borderRadius: "5px",
                  fontSize: "2rem",
                }}
                className="btn btn-lg"
                onClick={this.switchModeHandler}
              >
                Switch To {this.state.mode === "Sign Up" ? "Login" : "Sign Up"}
              </button>
              <form onSubmit={handleSubmit}>
                <br />
                <br />
                <input
                  name="email"
                  placeholder="Enter Your Email"
                  className="form-control"
                  value={values.email}
                  onChange={handleChange}
                />
                <span style={{ color: "#D70F64" }}>{errors.email}</span>
                <br />
                <input
                  name="password"
                  placeholder="Enter Password"
                  className="form-control"
                  value={values.password}
                  onChange={handleChange}
                />
                <span style={{ color: "#D70F64" }}>{errors.password}</span>
                <br />
                {this.state.mode === "Sign Up" ? (
                  <div>
                    <input
                      name="passwordConfirm"
                      placeholder="Confirm Password"
                      className="form-control"
                      value={values.passwordConfirm}
                      onChange={handleChange}
                    />
                    <span style={{ color: "#D70F64" }}>
                      {errors.passwordConfirm}
                    </span>
                  </div>
                ) : null}
                <br />
                <button type="submit" className="btn btn-success">
                  {this.state.mode === "Sign Up" ? "Sign Up" : "Log in"}
                </button>
              </form>
            </div>
          )}
        </Formik>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Auth);
