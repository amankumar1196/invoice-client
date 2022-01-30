import React from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import "./createInvoice.css";
import { useState, useEffect } from "react"

import { createInvoice, getInvoice, updateInvoice } from "../../redux/actions/invoiceActions"
import InvoiceItemsForm from "./components/InvoiceItemForm";
import ClientForm from "./components/ClientForm";
import CompanyForm from "./components/CompanyForm";
import { getClient } from '../../redux/actions/clientActions';
import { getCompany } from '../../redux/actions/companyActions';
import Preview from './components/Preview';

function CreateInvoice(props) {
	let history = useNavigate();
	let params = useParams();
	const invoiceEditingId = params.id

	const [activeStep, setActiveStep] = useState({invoiceItems: false, company: true, client: false})
	const [globalFormValues, setGlobalFormValues] = useState({
		invoiceItems: {},
		client: {},
		company: {}
	})

	const invoiceEdit = async (id) => {
		const invoice = await props.dispatch(getInvoice(id, { include: ["invoice_items"] }))
		props.dispatch(getClient(invoice.clientId, {include: ["address"]}))
		props.dispatch(getCompany(invoice.companyId, {include: ["address"]}))
	}

	useEffect(() => {
		invoiceEditingId && invoiceEdit(invoiceEditingId)
	},[invoiceEditingId])

	const invoiceFormSubmit = async (data) => {
    const id = data.id || '';
    if (id === '') {
      await props.dispatch(createInvoice(data));
    } else {
      await props.dispatch(updateInvoice(data));
    }
		history("/invoices")
  }


  return (
		<div>
			<div class="create-invoice-wrapper">
				<div class="create-invoice-left">
					<div class="create-invoice-header mb-24">
						<h1>{ invoiceEditingId ? "Update" : "Create" } Invoice</h1>
						<NavLink to="/invoices">
							<p class="page-create-button">
								<i class='bx bx-notepad mr-8'></i>
								Invoice List
							</p>
						</NavLink>
					</div>

					{/* Invoice STEP sections */}
					<ul id="progressbar">
						<li class={activeStep.company && "active"} id="account" onClick={() => setActiveStep({company: true, client: false, invoiceItems: false})}><strong>Company</strong></li>
						<li class={activeStep.client && "active"} id="personal" onClick={() => setActiveStep({company: false, client: true, invoiceItems: false})}><strong>Client</strong></li>
						<li class={activeStep.invoiceItems && "active"} id="confirm" onClick={() => setActiveStep({company: false, client: false, invoiceItems: true})}><strong>Invoice Items</strong></li>
					</ul>

					{/* Invoice sections Company */}
					<div style={{display: !activeStep.company ? "none" : "block"}}>
						<CompanyForm 
							globalFormValues={globalFormValues}
							setGlobalFormValues={setGlobalFormValues}
						/>

						<div className="d-flex justify-content-end">
							<button className="btn btn-sm btn-outline-primary d-flex align-items-center" onClick={() => setActiveStep({company: false, client: true, invoiceItems: false})}>
								<i class="bx bx-right-arrow-alt"></i>
							</button>
						</div>
					</div>

					{/* Invoice sections Client */}
					<div style={{display: !activeStep.client ? "none" : "block"}}>
						<ClientForm
							globalFormValues={globalFormValues}
							setGlobalFormValues={setGlobalFormValues}
						/>
						<div className="d-flex justify-content-end">
							<button className="btn btn-sm btn-outline-primary d-flex align-items-center mr-8" onClick={() => setActiveStep({company: true, client: false, invoiceItems: false})}>
								<i class="bx bx-left-arrow-alt"></i>
							</button>
							<button className="btn btn-sm btn-outline-primary d-flex align-items-center" onClick={() => setActiveStep({company: false, client: false, invoiceItems: true})}>
								<i class="bx bx-right-arrow-alt"></i>
							</button>
						</div>
					</div>

					{/* Invoice sections Data Details */}
					<div style={{display: !activeStep.invoiceItems ? "none" : "block"}}>
						<InvoiceItemsForm 
							globalFormValues={globalFormValues}
							setGlobalFormValues={setGlobalFormValues}
						/>
						<div className="d-flex justify-content-end">
							<button className="btn btn-sm btn-outline-primary d-flex align-items-center" onClick={() => setActiveStep({company: false, client: true, invoiceItems: false})}>
								<i class="bx bx-left-arrow-alt"></i>
							</button>
						</div>
					</div>

				</div>
				<div class="create-invoice-right">
					<Preview
						globalFormValues={globalFormValues}
						setActiveStep={setActiveStep}
						invoiceFormSubmit={invoiceFormSubmit}
					/>
				</div>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.auth;
  const { company, filters } = state;
  return {
		currentUser: user,
    isLoggedIn,
		company: company.company,
		filters
  };
}

export default connect(mapStateToProps)(CreateInvoice);