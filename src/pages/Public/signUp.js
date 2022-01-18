import React from 'react';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { InputField } from '../../components/form';
import { register } from '../../redux/actions/authActions';

const SignupForm = (props) => {
  return (
    <>
      <h2>Register to Invoicer</h2>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          acceptedTerms: false, // added for our checkbox
          role: 'user', // added for our select
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .required('Required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          props.dispatch(register(values))
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          // }, 400);
        }}
      >
        <Form>
          <InputField
            label="First Name"
            name="firstName"
            type="text"
            placeholder=""
          />

          <InputField
            label="Last Name"
            name="lastName"
            type="text"
            placeholder=""
          />

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
            <button type="submit" className="btn btn-primary text-right">Sign Up</button>
            <span className="fs-12">Existing User? <NavLink to="/sign-in">Sign In</NavLink></span>
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

export default connect(mapStateToProps)(SignupForm);