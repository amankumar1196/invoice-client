// const MyCheckbox = ({ children, ...props }) => {
//   const [field, meta] = useField({ ...props, type: 'checkbox' });
//   return (
//     <div>
//       <label className="checkbox-input">
//         <input type="checkbox" {...field} {...props} />
//         {children}
//       </label>
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// };

import React from 'react';
import { useField } from 'formik';
import "./form.css";

const CheckboxField = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  const isError = meta.touched && meta.error;

  return (
    <div className={`${props.wrapperClass ? props.wrapperClass : "form-group"}`}>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {/* <label htmlFor={props.id || props.name}>{label}</label> */}
      {/* <div class="input-field-wrapper">
        <input className={`form-control ${isError && "is-invalid"}`} {...field} {...props} />
        {isError && <i class='bx bx-error-circle pr-8 fs-16 is-invalid'></i> }
      </div> */}
      {isError ? (
        <div className="error invalid-feedback">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CheckboxField;