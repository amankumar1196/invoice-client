import React, { Fragment } from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from "react-redux";
import {useRef, useState, useEffect} from "react"
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';

import { InputField, SelectField } from '../../../components/form';
import countries from "../../../utils/countries";
import { retrieveCompanies, getCompany, createCompany, updateCompany, companyEditing } from '../../../redux/actions/companyActions';
import CompanyFormModal from '../../organizations/CompanyFormModal';

function CompanyForm(props) {
  const { globalFormValues, setGlobalFormValues, invoiceRef, activeSections, setActiveSections, companies, company} = props
  const [ isSelected, setSelected ] = useState(false)
  
  useEffect(()=>{
    props.dispatch(retrieveCompanies());
  },[])

  const companyFormSubmit = async (data) => {
    let companyId;
    const id = data.id || '';
    if (id === '') {
      companyId = await props.dispatch(createCompany(data));
    } else {
      companyId = await props.dispatch(updateCompany(data));
    }
    props.dispatch(getCompany(companyId.id))
  }

  let initialValues= null
  if(company && company.id){
    initialValues={
      ...company
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
    <Fragment>
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
          props.dispatch(createCompany(values))
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          // }, 400);
        }}>

        {({values}) => {
          values != globalFormValues.company && setGlobalFormValues({...globalFormValues, company: values})
          const states = countries.find(item => values.address.country === item.name).states;
          return (
            <Form>
              {/* Invoice sections Client */}
              <button type="button" class={`accordion ${!activeSections.company && "mb-16"}`}>
                <div class="d-flex align-items-center justify-content-between">
                  <p class="accordion-header d-flex align-items-center">
                    <i class='bx bx-calendar-edit'></i>
                    <span>Company Details</span>
                  </p>
                  <div className="d-flex align-items-center">
                    { companies.length > 0 && <div className="form-group w-100 mb-0" style={{maxWidth: "10rem"}}>
                      <div class="input-field-wrapper">
                        <select className="form-control" value={company.id ? company.id : "null"} onChange={(e)=> e.target.value === "null" ? props.dispatch(companyEditing(false)) : props.dispatch(getCompany(e.target.value))}>
                          <option value=""></option>
                          {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                    </div> }
                    <button className="btn btn-sm btn-outline-primary ml-16" type="button" onClick={() => props.dispatch(companyEditing(company.id ? company.id : "new"))}>
                      Create New
                    </button>
                    {/* <i class={`bx fs-24 ${!activeSections.company ? "bx-chevron-right" : "bx-chevron-down"}`} onClick={()=> setActiveSections({...activeSections, company: !activeSections.company})}></i> */}
                  </div>
                </div>
              </button>
              <div class={`panel ${activeSections.company && "active"}`}>
                <div>
                  <InputField
                    label="Company Name"
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

      <CompanyFormModal companyFormSubmit={companyFormSubmit} />
    </Fragment>
	);
}

function mapStateToProps(state) {
  const { message } = state.toastrMessage;
  const { company } = state;
  return {
    companies: company.companies,
    company: company.company
  };
}

export default connect(mapStateToProps)(CompanyForm);