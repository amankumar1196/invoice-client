import React from 'react';
import { useField } from 'formik';
import "./form.css";

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const isError = meta.touched && meta.error;
  
  return (
    <div className={`${props.wrapperClass ? props.wrapperClass : "form-group"}`}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <div class="input-field-wrapper">
        <input className={`form-control ${isError && "is-invalid"}`} {...field} {...props} />
        {isError && <i class='bx bx-error-circle pr-8 fs-16 is-invalid'></i> }
      </div>
      {isError ? (
        <div className="error invalid-feedback">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputField;