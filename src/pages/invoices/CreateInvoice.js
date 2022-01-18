import React from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from "react-redux";
import "./createInvoice.css";
import {useRef, useState, useEffect} from "react"

import { createInvoice } from "../../redux/actions/invoiceActions"
import InvoiceItemsForm from "./components/InvoiceItemForm";
import ClientForm from "./components/ClientForm";
import CompanyForm from "./components/CompanyForm";

function CreateInvoice(props) {
	const [isDrop, setDropState] = useState(false)
	const [file, setFile] = useState(null)
	const [globalFormValues, setGlobalFormValues] = useState({
		invoiceItems: {},
		client: {}
	})
	const [activeSections, setActiveSections] = useState({logo: true, company: true, client: true})
	const inputRef = useRef(null);
	const invoiceItemsRef = useRef();
	const clientRef = useRef();
	const companyRef = useRef();
	
	const onDragOver = (e) => {
		e.preventDefault();
		setDropState(true);
	}
	const onDragLeave = (e) => {
		e.preventDefault();
		setDropState(false)
	}
	const onDrop = (e) => {
		e.preventDefault();
		setDropState(false)
		var file = e.dataTransfer.files[0];
		setAndValidateFile(file);
	}
	const fileUpload = (e) => {
		e.preventDefault();
		var file = e.target.files[0];
		setAndValidateFile(file);
	}

	const setAndValidateFile = (file) => {
		var validExtensions = ["image/jpeg", "image/jpg", "image/png"];
		if(!validExtensions.some(i=> file.type === i)) {
			return alert("Wrong format upload")
		} else {
			let fileReader = new FileReader();
			fileReader.onload = () => {
				let fileUrl = fileReader.result;
				setFile(fileUrl)
			}
			fileReader.readAsDataURL(file);
		}
	}

	// const initialValues = { username: "", email: "", password: "" };
  // const [formValues, setFormValues] = useState(initialValues);
  // const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setFormErrors(validate(formValues));
  //   setIsSubmit(true);
  // };

  // useEffect(() => {
  //   console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(formValues);
  //   }
  // }, [formErrors]);
	
  // const validate = (values) => {
  //   const errors = {};
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  //   if (!values.username) {
  //     errors.username = "Username is required!";
  //   }
  //   if (!values.email) {
  //     errors.email = "Email is required!";
  //   } else if (!regex.test(values.email)) {
  //     errors.email = "This is not a valid email format!";
  //   }
  //   if (!values.password) {
  //     errors.password = "Password is required";
  //   } else if (values.password.length < 4) {
  //     errors.password = "Password must be more than 4 characters";
  //   } else if (values.password.length > 10) {
  //     errors.password = "Password cannot exceed more than 10 characters";
  //   }
  //   return errors;
  // };

  return (
		<div>
			<div class="create-invoice-wrapper">
				<div class="create-invoice-left">
					<div class="create-invoice-header mb-24">
						<h1>Create Invoices</h1>
						<NavLink to="/invoices">
							<p class="invoice-create">
								<i class='bx bx-notepad mr-8'></i>
								Invoice List
							</p>
						</NavLink>
					</div>

					{/* Invoice sections */}
					{/* Invoice sections Logo */}
					<button class={`accordion ${!activeSections.logo && "mb-16"}`} onClick={()=> setActiveSections({...activeSections, logo: !activeSections.logo})}>
						<div class="d-flex align-items-center justify-content-between">
							<p class="accordion-header d-flex align-items-center">
								<i class='bx bx-photo-album'></i>
								<span>Add Logo</span>
							</p>
							<p><i class={`bx fs-24 ${!activeSections.logo ? "bx-chevron-right" : "bx-chevron-down"}`}></i></p>
						</div>
					</button>
					<div class={`panel ${activeSections.logo && "active"}`}>
						{!file ? 
							<div 
								class={`drag-area ${isDrop ? "active" : ""}`} 
								onDragOver={onDragOver} 
								onDragLeave={onDragLeave}
								onDrop={onDrop}
							>
								<div class="icon">
									<i class='bx bxs-file-image' ></i>
								</div>

								{isDrop ?
									<span class="drag-header">Release to Upload</span>
									:
									<span class="drag-header">Drop your image here or <span class="button" onClick={()=> inputRef.current.click()}>browse</span></span>
								}
								<input ref={inputRef} type="file" onChange={fileUpload} hidden/>
								<span class="drag-header-subtitle">Supports: JPG, JPEG, PNG</span>

							</div>
							:
							<div class="drag-area">
								<img class="uploaded-file pt-24" src={file} />
								<div class="d-flex align-items-center pt-24 pb-16">
									<button class="btn btn-sm btn-outline-danger d-flex align-items-center mr-8" onClick={()=> setFile(null)}><i class='bx bx-x-circle mr-8 fs-24'></i> Cancel</button>
									<button class="btn btn-sm btn-outline-primary d-flex align-items-center ml-8" onClick={()=>{}}><i class='bx bx-cloud-upload mr-8 fs-24'></i> Upload</button>
								</div>
							</div>
							}
					</div>

					{/* Invoice sections Company */}
					<CompanyForm 
						invoiceRef={companyRef}
						globalFormValues={globalFormValues}
						setGlobalFormValues={setGlobalFormValues}
						activeSections={activeSections}
						setActiveSections={setActiveSections}
					/>

					{/* Invoice sections Client */}
					<ClientForm 
						invoiceRef={clientRef}
						globalFormValues={globalFormValues}
						setGlobalFormValues={setGlobalFormValues}
						activeSections={activeSections}
						setActiveSections={setActiveSections}
					/>

					{/* Invoice sections Data Details */}
					<InvoiceItemsForm 
						invoiceRef={invoiceItemsRef}
						globalFormValues={globalFormValues}
						setGlobalFormValues={setGlobalFormValues}
					/>

				</div>
				<div class="create-invoice-right">
					<div class="preview-wrapper">
						<div class="preview-header">
							<p>Preview</p>
							<div class="preview-actions">
								<div class="tooltip">
									<i class='bx bx-fullscreen fs-20 icons'></i>
									<span class="tooltiptext">Full Screen</span>
								</div>
								<div class="tooltip ml-16 mr-16">
									<i class='bx bx-book fs-20 icons'></i>
									<span class="tooltiptext">PDF</span>
								</div>
								<div class="tooltip">
									<i class='bx bx-printer fs-20 icons'></i>
									<span class="tooltiptext">Print</span>
								</div>
							</div>
							<div class="text-right">
								<button class="btn btn-outline-primary mr-8" type="submit" onClick={() => globalFormValues.client.id && props.dispatch(createInvoice({...globalFormValues.invoiceItems, clientId: globalFormValues.client.id}))}>Save</button>
								<button class="btn btn-primary ml-8">Save and Send</button>
							</div>
						</div>

						<div class="preview-section-wrapper">
							<div class="preview-content">
								<div class="company-details-wrapper-header">
									<div class="company-logo">
										<svg width="80" height="27" viewBox="0 0 131 27" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M21.132 0.512V6.164H14.256V26H7.2V6.164H0.396V0.512H21.132ZM39.5516 21.752H30.5156L29.1116 26H21.6596L30.9836 0.619998H39.1556L48.4436 26H40.9556L39.5516 21.752ZM37.7876 16.424L35.0516 8.144L32.2796 16.424H37.7876ZM69.5379 18.656C69.5379 20.072 69.1779 21.356 68.4579 22.508C67.7379 23.66 66.6819 24.572 65.2899 25.244C63.8979 25.916 62.2299 26.252 60.2859 26.252C57.3339 26.252 54.8979 25.544 52.9779 24.128C51.0819 22.712 50.0499 20.696 49.8819 18.08H57.4059C57.4779 18.968 57.7539 19.628 58.2339 20.06C58.7139 20.492 59.3019 20.708 59.9979 20.708C60.6219 20.708 61.1019 20.552 61.4379 20.24C61.7979 19.928 61.9779 19.484 61.9779 18.908C61.9779 18.14 61.6299 17.552 60.9339 17.144C60.2379 16.712 59.1339 16.244 57.6219 15.74C56.0139 15.188 54.6819 14.648 53.6259 14.12C52.5939 13.592 51.6939 12.8 50.9259 11.744C50.1819 10.688 49.8099 9.332 49.8099 7.676C49.8099 6.092 50.2179 4.736 51.0339 3.608C51.8499 2.456 52.9659 1.592 54.3819 1.016C55.7979 0.415999 57.4059 0.115999 59.2059 0.115999C62.1339 0.115999 64.4619 0.811999 66.1899 2.204C67.9419 3.572 68.9019 5.504 69.0699 8H61.4739C61.3779 7.208 61.1259 6.62 60.7179 6.236C60.3339 5.852 59.8179 5.66 59.1699 5.66C58.6179 5.66 58.1859 5.804 57.8739 6.092C57.5619 6.38 57.4059 6.812 57.4059 7.388C57.4059 8.108 57.7419 8.672 58.4139 9.08C59.1099 9.488 60.1899 9.944 61.6539 10.448C63.2619 11.024 64.5939 11.588 65.6499 12.14C66.7059 12.692 67.6179 13.496 68.3859 14.552C69.1539 15.608 69.5379 16.976 69.5379 18.656ZM86.4312 12.968L96.2952 26H87.7632L79.7352 14.732V26H72.6432V0.512H79.7352V11.528L87.8352 0.512H96.2952L86.4312 12.968Z" fill="black"/>
											<path d="M121.88 0.512L112.88 17.9V26H105.824V17.9L96.8237 0.512H104.924L109.424 10.232L113.888 0.512H121.88ZM130.199 19.088V26H123.035V19.088H130.199Z" fill="#FABB18"/>
										</svg>
									</div>
									<div class="company-details-wrapper d-flex">
										<div class="left">
											<div class="details-item">
												<span>Client</span>
												<p>Accenture Pvt. Ltd.</p>
											</div>
											<div class="details-item">
												<span>Phone No.</span>
												<p>8976134548</p>
											</div>
											<div class="details-item">
												<span>Email</span>
												<p>abc@accenture.co</p>
											</div>
										</div>
										<div class="right">
											<div class="details-item">
												<span>Address 1</span>
												<p>234-F</p>
											</div>
											<div class="details-item">
												<span>Address 2</span>
												<p>Phase 2, Tower</p>
											</div>
											<div class="d-flex justify-content-between">
												<div class="details-item mr-8">
													<span>State</span>
													<p>Gurugram</p>
												</div>
												<div class="details-item ml-8">
													<span>Country</span>
													<p>India</p>
												</div>
											</div>
											
										</div>
									</div>
								</div>
								
								<div class="total-wrapper">
									<span>Total Amount</span>
									<span>$300.00</span>
								</div>

								<div class="client-details-wrapper">
									<div class="left">
										<div class="details-item">
											<span>Client</span>
											<p>{clientRef.current && clientRef.current.values && clientRef.current.values.name}</p>
										</div>
										<div class="details-item">
											<span>Phone No.</span>
											{/* <p>9011134567</p> */}
											<p>{clientRef.current && clientRef.current.values && clientRef.current.values.phone}</p>
										</div>
										<div class="details-item">
											<span>Email</span>
											{/* <p>abc@bluebash.co</p> */}
											<p>{clientRef.current && clientRef.current.values && clientRef.current.values.email}</p>
										</div>
									</div>
									<div class="right">
										<div class="details-item">
											<span>Address 1</span>
											{/* <p>Atrim-45, Quack City</p> */}
											<p>{clientRef.current && clientRef.current.values && clientRef.current.values.address_line_1}</p>
										</div>
										<div class="details-item">
											<span>Address 2</span>
											{/* <p>Phase 8B, Mohali, Punjab</p> */}
											<p>{clientRef.current && clientRef.current.values && clientRef.current.values.address_line_2}</p>
										</div>
										<div class="d-flex justify-content-between">
											<div class="details-item mr-8">
												<span>State</span>
												{/* <p>Mohali</p> */}
												<p>{clientRef.current && clientRef.current.values && clientRef.current.values.state}</p>
											</div>
											<div class="details-item ml-8">
												<span>Country</span>
												{/* <p>India</p> */}
												<p>{clientRef.current && clientRef.current.values && clientRef.current.values.country}</p>
											</div>
										</div>
										
									</div>

								</div>

								<table>
									<thead>
										<tr>
											<th>Description</th>
											<th>Rate</th>
											<th>Qty</th>
											<th>Line Total</th>
										</tr>
									</thead>
									<tbody>
										{invoiceItemsRef.current && invoiceItemsRef.current.values.invoiceItems.map((item, index) =>
											<tr>
												<td>
													<p class="invoice-name">{item.description}</p>
												</td>
												<td>$100.00</td>
												<td>{item.quantity}</td>
												<td>$200.00</td>
											</tr>
										)}
									</tbody>
								</table>

								<div class="note-wrapper">
									<span>Note</span>
									<p>
										It is a long established fact that a reader will be distracted by the readable content of a page when looking at a layout. 
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.toastrMessage;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(CreateInvoice);