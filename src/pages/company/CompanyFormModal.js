import "../../components/modal/Modal.css";
import { connect } from "react-redux";
import ModalPortal from "../../components/modal/ModalPortal";

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { InputField, SelectField } from '../../components/form';
import countries from "../../utils/countries";
import { companyEditing } from '../../redux/actions/companyActions';

function CompanyForm(props) {
  const { companyFormSubmit, company, companyEditingId, currentUser } = props

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
    userId: currentUser.id,
    registerKey: currentUser.registerKey
  }

  return (
    <ModalPortal>
      <div class={`modal account-modal ${companyEditingId ? "show" : "fade"}`} id="editBudgetModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true">
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
                companyFormSubmit(values)
                resetForm()
              }}>

                {({values}) => {
                  const states = countries.find(item => values.address.country === item.name).states;
                  return (
                    <Form>
                      <div class="modal-header pt-24 px-24 d-flex align-items-center">
                        <h3 class="text-neutral-900 mb-0" id="exampleModalLabel">{companyEditingId !== "new" ? "Update" : "Create"} Company</h3>
                        <div class="cross-modal-icon curser-pointer close mr-8" onClick={() => props.dispatch(companyEditing(false))} data-dismiss="modal" aria-label="Close"><i class="bx bx-x text-neutral-900 font-size-24"></i></div>
                      </div>
                      <div class="modal-body pt-0 px-24 pt-32">
                        <div>
                          <span className="d-block pb-16 fw-6">Basic details</span>
                          <InputField
                            label="Company Name"
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
                            type="text"
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
                          <button class="btn btn-outline-secondary w-50 ml-16 mr-8 fs-16" type="button" onClick={() => props.dispatch(companyEditing(false))}>Cancel</button>
                          <button class="btn btn-primary w-50 ml-8 mr-16 fs-16" type="submit">{companyEditingId !== "new" ? "Update" : "Create"}</button>
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
  const { company, auth } = state;
  return {
    company: company.company,
    companyEditingId: company.editing,
    currentUser: auth.user
  };
}

export default connect(mapStateToProps)(CompanyForm);