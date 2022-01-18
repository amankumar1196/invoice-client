import React from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from "react-redux";
import {useRef, useState, useEffect} from "react"
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';

import { InputField, SelectField } from '../../../components/form';
import countries from "../../../utils/countries";
import { retrieveClients, getClient, createClient } from '../../../redux/actions/clientActions';

function ClientForm(props) {
  const { globalFormValues, setGlobalFormValues, invoiceRef, activeSections, setActiveSections, clients, client} = props
  const [ isSelected, setSelected ] = useState(false)
  useEffect(()=>{
    console.log(globalFormValues);
  })
  useEffect(()=>{
    props.dispatch(retrieveClients());
  },[])
  let initialValues= null
  if(client && client.id){
    initialValues={
      ...client
    }
  } else initialValues={
    name: "",
    email: "",
    phone: "",
    address: {
      address_line_1: "",
      address_line_2: "",
      country: "United States",
      state: ""
    },
    userId: 1,
    registerKey: "e769143f-a099-4ef8-acf5-7295955ede59"
  }

  return (
    <Formik
      innerRef={invoiceRef}
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
        props.dispatch(createClient(values))
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 400);
      }}>

      {({values}) => {
        values != globalFormValues.client && setGlobalFormValues({...globalFormValues, client: values})
        const states = countries.find(item => values.address.country === item.name).states;
        return (
          <Form>
            {/* Invoice sections Client */}
            <button type="button" class={`accordion ${!activeSections.client && "mb-16"}`}>
              <div class="d-flex align-items-center justify-content-between">
                <p class="accordion-header d-flex align-items-center">
                  <i class='bx bx-user-pin'></i>
                  <span>Client Details</span>
                </p>
                <div className="d-flex align-items-center">
                  <button className="btn btn-sm btn-outline-primary mr-16" type="submit">
                    Create New
                  </button>
                  { clients.length > 0 && <div className="form-group w-100 pr-16 mb-0" style={{maxWidth: "10rem"}}>
                    <div class="input-field-wrapper">
                      <select className="form-control" onChange={(e)=>props.dispatch(getClient(e.target.value))}>
                        <option value=""></option>
                        {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                  </div> }
                  <i class={`bx fs-24 ${!activeSections.client ? "bx-chevron-right" : "bx-chevron-down"}`} onClick={()=> setActiveSections({...activeSections, client: !activeSections.client})}></i>
                </div>
              </div>
            </button>
            <div class={`panel ${activeSections.client && "active"}`}>
              <div>
                <InputField
                  label="Client Name"
                  name="name"
                  type="text"
                  placeholder=""
                />
                <div class="d-flex w-100">
                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder=""
                    wrapperClass="form-group w-100 pr-16"
                  />

                  <InputField
                    label="Phone"
                    name="phone"
                    type="number"
                    placeholder=""
                    wrapperClass="form-group w-100 pl-16"
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

                <div class="d-flex w-100">
                  <SelectField label="Country" name="address.country" wrapperClass="form-group w-100 pr-16">
                    <option value=""></option>
                    {countries.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </SelectField>

                  <SelectField label="State" name="address.state" wrapperClass="form-group w-100 pl-16">
                    <option value=""></option>
                    {states.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                  </SelectField>
                </div>

              </div>
            </div>
          </Form>
        )}
      }
    </Formik>
	);
}

function mapStateToProps(state) {
  const { message } = state.toastrMessage;
  const { client } = state;
  return {
    clients: client.clients,
    client: client.client
  };
}

export default connect(mapStateToProps)(ClientForm);