import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { useEffect } from "react"
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { InputField, SelectField } from '../../../components/form';
import countries from "../../../utils/countries";
import { retrieveClients, getClient, createClient, updateClient, clientEditing } from '../../../redux/actions/clientActions';
import ClientFormModal from '../../clients/ClientFormModal';

function ClientForm(props) {
  const { globalFormValues, setGlobalFormValues, clients, client, filters, currentUser, dispatch } = props

  useEffect(()=>{
    dispatch(retrieveClients({...filters, extraParams: { ...filters.extraParams, registerKey: currentUser.registerKey}, include: [ "address" ]}));
    return () => dispatch(clientEditing(false));
  },[])

  const clientFormSubmit = async (data) => {
    let clientId;
    const id = data.id || '';
    if (id === '') {
      clientId = await props.dispatch(createClient(data));
    } else {
      clientId = await props.dispatch(updateClient(data));
    }
    props.dispatch(getClient(clientId.id))
  }

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
      country: "",
      state: ""
    },
  }

  return (
    <Fragment>
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
      >
        {({values}) => {
          values != globalFormValues.client && setGlobalFormValues({...globalFormValues, client: values})
          const states = values.address.country && countries.find(item => values.address.country === item.name).states;

          return (
            <Form>
              <button type="button" class={`accordion`}>
                <div class="d-flex align-items-center justify-content-between">
                  <p class="accordion-header d-flex align-items-center">
                    <i class='bx bx-user-pin'></i>
                    <span>Client Details</span>
                  </p>
                  <div className="d-flex align-items-center">
                    { clients.length > 0 && <div className="form-group w-100 mb-0" style={{maxWidth: "10rem"}}>
                      <div class="input-field-wrapper">
                        <select className="form-control" value={client.id ? client.id : "null"} onChange={(e)=> e.target.value === "null" ? props.dispatch(clientEditing(false)) : props.dispatch(getClient(e.target.value))}>
                          <option value="null">Select Client</option>
                          {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                    </div> }
                    <button className="btn btn-sm btn-outline-primary ml-16" type="button" onClick={() => props.dispatch(clientEditing(client.id ? client.id : "new"))}>
                      {client.id ? "Update Client" : "Add Client" }
                    </button>
                  </div>
                </div>
              </button>
              <div class={`panel active`}>
                <div>
                  <InputField
                    label="Client Name"
                    name="name"
                    type="text"
                    placeholder="Placeholder"
                    disabled
                  />
                  <div class="d-flex w-100">
                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="Placeholder"
                      wrapperClass="form-group w-100 pr-16"
                      disabled
                    />

                    <InputField
                      label="Phone"
                      name="phone"
                      type="number"
                      placeholder="Placeholder"
                      wrapperClass="form-group w-100 pl-16"
                      disabled
                    />
                  </div>

                  <div class="d-flex w-100">
                    <InputField
                      label="Address Line 1"
                      name="address.address_line_1"
                      type="text"
                      placeholder="Placeholder"
                      wrapperClass="form-group w-100 pr-16"
                      disabled
                    />

                    <InputField
                      label="Address Line 2"
                      name="address.address_line_2"
                      type="text"
                      placeholder="Placeholder"
                      wrapperClass="form-group w-100 pl-16"
                      disabled
                    />
                  </div>

                  <div class="d-flex w-100">
                    <SelectField disabled label="Country" name="address.country" wrapperClass="form-group w-100 pr-16">
                      <option value=""></option>
                      {countries.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </SelectField>

                    <SelectField disabled label="State" name="address.state" wrapperClass="form-group w-100 pl-16">
                      <option value=""></option>
                      {states && states.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                    </SelectField>
                  </div>

                </div>
              </div>
            </Form>
          )}
        }
      </Formik>

      <ClientFormModal clientFormSubmit={clientFormSubmit}/>

    </Fragment>
	);
}

function mapStateToProps(state) {
  const { client, invoice, auth, filters } = state;
  return {
    clients: client.clients,
    client: client.client,
    currentUser: auth.user,
    filters,
    invoiceEditing: invoice.editing
  };
}

export default connect(mapStateToProps)(ClientForm);