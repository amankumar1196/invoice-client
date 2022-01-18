import React from 'react';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { InputField } from '../../components/form';
import { login } from "../../redux/actions/authActions";

const SigninForm = (props) => {
  return (
    <>
      <h2>Login to Dashboard</h2>
      <Formik
        initialValues={{
          password: '',
          email: ''
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .required('Required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          props.dispatch(login(values))
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          // }, 400);
        }}
      >
        <Form>
          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder=""
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder=""
          />

          <div className="d-flex align-items-center justify-content-between">
            <button type="submit" className="btn btn-primary text-right">Login</button>
            <span className="fs-12">New User? <NavLink to="/sign-up">Sign Up</NavLink></span>
          </div>
        </Form>
      </Formik>
    </>
  );
};

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.toastrMessage;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(SigninForm);