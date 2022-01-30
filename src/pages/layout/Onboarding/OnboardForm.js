import React from 'react';
import { connect } from "react-redux";
import {useRef, useState, useEffect} from "react"
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { InputField, SelectField, CheckboxField } from '../../../components/form';
import countries from "../../../utils/countries";
import FileUpload from '../../../components/form/FileUpload';

function CompanyForm(props) {
  const { currentUser, handleSubmit } = props
  const [ accountType, setAccountType ] = useState("1")

  let initialValues= null
  if(accountType === "1") {
    initialValues = {
      name: "",
      email: "",
      phone: "",
      address: {
        address_line_1: "",
        address_line_2: "",
        country: "United States",
        state: ""
      },
      userId: currentUser.id,
      registerKey: currentUser.registerKey
    }
  } else {
    initialValues = {
      name: currentUser.firstName + " " + currentUser.lastName,
      email: currentUser.email,
      phone: currentUser.phone,
      address: {
        address_line_1: "",
        address_line_2: "",
        country: "United States",
        state: ""
      },
      userId: currentUser.id,
      registerKey: currentUser.registerKey
    }
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
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
        phone: Yup.string()
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          handleSubmit({...values, accountType})
          setSubmitting(false);
        }, 3000);
      }}>

      {({values, isSubmitting, setFieldValue}) => {
        const states = values.address.country && countries.find(item => values.address.country === item.name).states;

        return (
          <Form>
            <div>
              <SelectField label="Use Invoicer as:" name="account_type" wrapperClass="form-group w-50 pr-16 mb-0" value={accountType} onChange={event => setAccountType(event.target.value)}>
                <option value="1">Organization</option>
                <option value="2">Individual</option>
              </SelectField>
              
              <p className="fs-12 pb-16 pt-8"><strong>Note: </strong> 
                {accountType === "1" ? 
                  "Account as organization means you have flexibility to add/manage/communicate amoung your team members and manage other associated organizations."
                  :
                  "Account as individual means you are the only owner/member of account."
                }
              </p>

              <InputField
                label={`${accountType === "1" ? "Company Name" : "Name"}`}
                name="name"
                type="text"
                placeholder=""
              />
              <div class="d-flex">
                <div class="d-flex flex-column w-50 pr-16">
                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder=""
                    wrapperClass="form-group w-100"
                  />

                  <InputField
                    label="Phone"
                    name="phone"
                    type="number"
                    placeholder=""
                    wrapperClass="form-group w-100"
                  />
                </div>

                <FileUpload
                  label="Upload Logo"
                  wrapperClass="w-50 pl-16 mb-16"
                  onUploadHook={(val) => setFieldValue("logo", val)}
                />
              </div>

              <div class="d-flex w-100">
                <InputField
                  label="Address Line 1"
                  name="address.address_line_1"
                  type="text"
                  placeholder=""
                  wrapperClass="form-group w-100 pr-16"
                />

                <InputField
                  label="Address Line 2"
                  name="address.address_line_2"
                  type="text"
                  placeholder=""
                  wrapperClass="form-group w-100 pl-16"
                />
              </div>

              <div class="d-flex w-100 pb-16">
                <SelectField label="Country" name="address.country" wrapperClass="form-group w-100 pr-16">
                  <option value=""></option>
                  {countries.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </SelectField>

                <SelectField label="State" name="address.state" wrapperClass="form-group w-100 pl-16">
                  <option value=""></option>
                  {states && states.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                </SelectField>
              </div>

              <CheckboxField name="agree" wrapperClass="pb-16 fs-12">
                I agree that above information given is correct.
              </CheckboxField>
              
              <button class="btn btn-primary w-100">{isSubmitting ? "Setting your Account..." : "Submit" }</button>
            </div>
          </Form>
        )}
      }
    </Formik>
	);
}

function mapStateToProps(state) {
  const { company, auth } = state;
  return {
    company: company.company,
    currentUser: auth.user
  };
}

export default connect(mapStateToProps)(CompanyForm);