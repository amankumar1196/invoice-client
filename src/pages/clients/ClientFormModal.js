import "./client.css";
import {NavLink} from 'react-router-dom';
import { connect } from "react-redux";
import { useEffect } from "react";
import ModalPortal from "../../components/modal/ModalPortal";

import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';

import { InputField, SelectField } from '../../components/form';
import countries from "../../utils/countries";
import { retrieveClients, createClient, clientEditing, getClient } from '../../redux/actions/clientActions';

function Clients(props) {
  const { clientFormSubmit, client, clientEditingId } = props

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
    <ModalPortal>
      <div class={`modal account-modal ${clientEditingId ? "show" : "fade"}`} id="editBudgetModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true">
        <div class="modal-dialog mt-0 modal-dialog-scrollable">
          <div class="modal-content h-100">
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
              onSubmit={(values, { setSubmitting, resetForm }) => {
                clientFormSubmit(values)
                resetForm()
              }}>

                {({values}) => {
                  const states = countries.find(item => values.address.country === item.name).states;
                  return (
                    <Form>
                      <div class="modal-header pt-24 px-24 border-bottom-0 d-flex align-items-center">
                        <h3 class="text-neutral-900 mb-0" id="exampleModalLabel">{clientEditingId !== "new" ? "Update" : "Create"} Client</h3>
                        <div class="cross-modal-icon curser-pointer close mr-8" onClick={() => props.dispatch(clientEditing(false))} data-dismiss="modal" aria-label="Close"><i class="bx bx-x text-neutral-900 font-size-24"></i></div>
                      </div>
                      <div class="modal-body pt-0 px-24 pt-32">
                        <div>
                          <span className="d-block pb-16 fw-6">Basic details</span>
                          <InputField
                            label="Client Name"
                            name="name"
                            type="text"
                            placeholder=""
                          />
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

                          <span className="d-block mt-32 pb-16 fw-6">Address details</span>
                          <InputField
                            label="Address Line 1"
                            name="address.address_line_1"
                            type="text"
                            placeholder=""
                            wrapperClass="form-group w-100"
                          />

                          <InputField
                            label="Address Line 2"
                            name="address.address_line_2"
                            type="text"
                            placeholder=""
                            wrapperClass="form-group w-100"
                          />

                          {/* <div class="d-flex w-100"> */}
                            <SelectField label="Country" name="address.country" wrapperClass="form-group w-100">
                              <option value=""></option>
                              {countries.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                            </SelectField>

                            <SelectField label="State" name="address.state" wrapperClass="form-group w-100">
                              <option value=""></option>
                              {states.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                            </SelectField>
                          {/* </div> */}
                        </div>
                      </div>
                      <div class="modal-footer">
                        <div class="d-flex align-items-center justify-content-between w-100">
                          <button class="btn btn-outline-secondary w-50 ml-16 mr-8 fs-16" type="button" onClick={() => props.dispatch(clientEditing(false))}>Cancel</button>
                          <button class="btn btn-primary w-50 ml-8 mr-16 fs-16" type="submit">{clientEditingId !== "new" ? "Update" : "Create"}</button>
                        </div>
                      </div>
                    </Form>
                  )
                }}
            </Formik>
          </div>
        </div>
      </div>
    </ModalPortal>
	);
}

function mapStateToProps(state) {
  const { message } = state.toastrMessage;
  const { client } = state;
  return {
    clients: client.clients,
    client: client.client,
    clientEditingId: client.editing
  };
}

export default connect(mapStateToProps)(Clients);