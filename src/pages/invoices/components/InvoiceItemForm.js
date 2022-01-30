import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';

import { InputField } from '../../../components/form';
import { invoiceEditing } from '../../../redux/actions/invoiceActions';

function InvoiceItemForm(props) {
  const { globalFormValues, setGlobalFormValues, currentUser, invoice, dispatch } = props

  useEffect(()=>{
    return () => dispatch(invoiceEditing(false));
  },[])


  let initialValues = null;
  if(invoice && invoice.id){
    initialValues = {
      ...invoice,
      invoiceItems: invoice.invoice_items
    }
  } else initialValues = {
    name: "",
    invoiceItems: [{description: "", quantity: 0, price: 0}],
    userId: currentUser.id,
    registerKey: currentUser.registerKey
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        ...initialValues
      }}
      validationSchema={
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
    >

      {({values}) => {
        values != globalFormValues.invoiceItems && setGlobalFormValues({...globalFormValues, invoiceItems: values})
        
        return (
          <Form>
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
                { values.invoiceItems.map((invoice, index) => (
                  <div key={index}>
                    <label className="d-flex justify-content-center fs-12">Invoice Item {index+1}</label>
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

function mapStateToProps(state) {
  const { invoice, auth } = state;
  return {
    invoice: invoice.invoice,
    currentUser: auth.user
  };
}

export default connect(mapStateToProps)(InvoiceItemForm);