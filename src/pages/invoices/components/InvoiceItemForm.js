import React from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from "react-redux";
import {useRef, useState, useEffect} from "react"
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';

import { InputField } from '../../../components/form';
import { retrieveInvoices } from '../../../redux/actions/invoiceActions';

function InvoiceItemForm(props) {
  const { globalFormValues, setGlobalFormValues, invoiceRef} = props

  useEffect(()=>{
    console.log(globalFormValues);
  })
  return (
    <Formik
      innerRef={invoiceRef}
      initialValues={{
        name: "",
        date: new Date(),
        invoiceItems: [{description: "", quantity: 0, price: 0}],
        userId: 1,
        registerKey: "e769143f-a099-4ef8-acf5-7295955ede59"
      }}
      validationSchema={
        // props.setU(new Date()),
        Yup.object({
        name: Yup.string()
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
        // props.dispatch(retrieveInvoices())
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 400);
      }}>

      {({values}) => {
        values != globalFormValues.invoiceItems && setGlobalFormValues({...globalFormValues, invoiceItems: values})
        
        return (
          <Form>
            {/* Invoice sections Data Details */}
            <FieldArray
              name="invoiceItems"
              render={({ insert, remove, push }) => (
                <>
              <div class="accordion d-flex align-items-center justify-content-between">
                <p class="accordion-header d-flex align-items-center">
                  <i class='bx bx-spreadsheet'></i>
                  <span>Invoice Details</span>
                </p>
                <p><button class="d-flex align-items-center btn btn-sm btn-outline-primary" type="button" onClick={() => {push({description: "", quantity: 0, price: 0})}}><i class='bx bx-plus'></i> Add Row</button></p>
              </div>
              <div class="panel active">
                <InputField
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Invoice name"
                />
                {values.invoiceItems.map((invoice, index) => (
                  <div key={index}>
                    <label className="d-flex justify-content-center fs-12">Invoice Item {index+1}</label>
                    {/** both these conventions do the same */}
                    <div className="d-flex mb-16" key={index}>

                      <div className="w-100">
                        <InputField
                          label="Description"
                          name={`invoiceItems[${index}].description`}
                          type="text"
                          placeholder="Item name"
                        />
                        <div class="d-flex w-100">
                          <InputField
                            label="Quantity"
                            name={`invoiceItems[${index}].quantity`}
                            type="number"
                            wrapperClass="form-group w-100 pr-16"
                            />
                          <InputField
                            label="Rate"
                            name={`invoiceItems[${index}].price`}
                            type="number"
                            wrapperClass="form-group w-100 pl-16"
                          />
                        </div>
                      </div>
                      {index != 0 && <div className='pt-20 ml-16'>
                        <button class="btn btn-sm btn-outline-primary" type="button" onClick={() => remove(index)}>
                          <i className="bx bx-trash fs-16 "></i>
                        </button> 
                      </div>}
                    </div>
                  </div>
                ))}
              </div>
              </>
            )}
            />

          </Form>
        )}
      }
    </Formik>
	);
}

export default InvoiceItemForm;