import "./invoices.css";
import {NavLink, useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { startCase } from "lodash";
import moment from "moment";
import { retrieveInvoices, getAllInvoicesIds, invoiceEditing, getInvoice, deleteInvoice, showInvoicePreview, downloadInvoicePDF } from "../../redux/actions/invoiceActions";
import Search from "../../components/search/Search";
import Pagination from "../../components/pagination/Pagination";
import { clearFilter, setFilter } from "../../redux/actions/filterActions";
import Table from "../../components/table/Table";
import { MultiSelectDropdown, SingleSelectDropdown} from "../../components/form";
import { getClient } from "../../redux/actions/clientActions";
import { getCompany } from "../../redux/actions/companyActions";
import ActionBox from "../../components/actionBox/ActionBox";
import InvoiceShow from "./InvoiceShow";

function Invoices(props) {
	const { currentUser, filters, pagination, invoices, dispatch } = props;
	const [ invoiceIds, setInvoiceIds ] = useState([]);
	const [ previewValues, setPreviewValues ] = useState({
		company: {},
		client: {},
		invoiceItems: {}
	});
	const history = useNavigate();

	useEffect(()=> {
		getInvoices({...filters, extraParams: { registerKey: currentUser.registerKey, archived: 0 }, include: [ "client" ]})
		return () => props.dispatch(clearFilter());
	},[])

	const getInvoices = (filters) => {
		props.dispatch(retrieveInvoices(filters))
		props.dispatch(setFilter(filters))
	}
	
	const clientFormEdit = async (id) => {
		if(id !== "new"){
			const invoice = await props.dispatch(getInvoice(id, {include: ["invoice_items"]}))
			props.dispatch(getClient(invoice.clientId, {include: ["address"]}))
			props.dispatch(getCompany(invoice.companyId, {include: ["address"]}))
		}
		await props.dispatch(invoiceEditing(id));
		history(`/invoices/${id}`)
	}	

	const invoicePreview = async (id) => {
		const invoice = await props.dispatch(getInvoice(id, {include: ["invoice_items"]}))
		const company = await props.dispatch(getCompany(invoice.companyId, {include: ["address"]}))
		const client = await props.dispatch(getClient(invoice.clientId, {include: ["address"]}))

		setPreviewValues({
			invoiceItems: {...invoice, invoiceItems: invoice.invoice_items},
			client,
			company: company ? company : {}
		})
		localStorage.setItem("invoiceValues", JSON.stringify({
			invoiceItems: {...invoice, invoiceItems: invoice.invoice_items},
			client,
			company: company ? company : {}
		}))
		props.dispatch(showInvoicePreview(true));
	}
	
	const handleDownloadInvoicePDF = (id) => {
		dispatch(downloadInvoicePDF(id))
	}

	const onInvoiceDelete = (data) => {
		props.dispatch(deleteInvoice(data))
	}

	const getStatusClass = (status) => {
		switch(status){
			case "send": return "status-paid"
			case "not_send": return "status-unpaid"
			default: return "status-pending"
		}
	}

	const setAllInvoicesIds = async (checked) => {
		if(checked) {
			const allInvoiceIds = await props.dispatch(getAllInvoicesIds({...filters, sortBy:"id", sortDirection: "ASC", page:1, rpp: 99999999}))
			setInvoiceIds([...allInvoiceIds])
		} else {
			setInvoiceIds([])
		}
	}

	const onInvoicSelect = async (id) => {
		if(invoiceIds.includes(id)) {
			setInvoiceIds(invoiceIds.filter(item => item !== id))
		} else {
			setInvoiceIds([...invoiceIds, id])
		}
	}

	return (
		<div class="invoice-page-wrapper">
			<div class="invoice-page-header">
				<div class="invoice-page-header-left">
					<h1>Invoices</h1>
					<NavLink to="/invoices/new">
						<p class="page-create-button">
							<i class='bx bx-plus-circle'></i>
							Create
						</p>
					</NavLink>
				</div>
				<Search
					filters={filters}
					searchHook={(val) => getInvoices(val)}
					placeholder="Search invoices by invoice/client name"
				/>
			</div>
			

			<Table
				columns={[
					{ name: "All",
						render: () => {
							return ( 
								<div className="d-flex align-items-start">
									<label class="checkbox-container">
										<input type="checkbox" checked={pagination.totalRecords === invoiceIds.length} onClick={(e) => setAllInvoicesIds(e.target.checked)}/>All
										<span class={`${pagination.totalRecords === invoiceIds.length ? "checkmark" : "not-all-checkmark"}`}></span>
									</label>
									{ invoiceIds.length > 0 && 
										<ActionBox
											viewIcon="chevron-down"
											position="right"
											iconStyle="fs-20 color-dark"
											items={[
												{ name: "Bulk Actions"},
												{ name: "Send", icon: "mail-send", onClickAction: () => {} },
												{ name: "Download", icon: "download", onClickAction: () => {} },
												{ name: "Archive", icon: "archive", onClickAction: () => onInvoiceDelete() }
											]}
										/>
									}
								</div>
							)
						}
					},
					{name: "Name", value: "name", allowSorting: true, onClickColumnHook: (val) => getInvoices(val)},
					// {name: "Price", value: "price", onClickColumnHook: (val) => getInvoices(val)},
					{name: "Client", value: "client.name", modal: "client", allowSorting: true, onClickColumnHook: (val) => getInvoices(val)},
					{ name: "Status", style: "d-flex justify-content-between align-items-center",
						filterMethod: () => {
							return ( <MultiSelectDropdown
									title="Status"
									uniqueKey="value"
									defaultSelectedValues={["pending","send","not_send"]}
									requiredSelected
      						showContent={false}
									onChangeHook={(val) => getInvoices({...filters, extraParams: { ...filters.extraParams, status: val}})}
									customRenderDropDownIcon={() => <i class="bx bx-slider fw-6 fs-16"></i>}
									data={[
										{
											label: "Pending",
											value: "pending"
										},
										{
											label: "Send",
											value: "send"
										},
										{
											label: "Not Send",
											value: "not_send"
										}
									]}
								/>
							)
						}
					},
					{name: "Date", value: "createdAt", allowSorting: true, onClickColumnHook: (val) => getInvoices(val), style: "d-flex justify-content-between align-items-center",
						filterMethod: () => {
							return ( <SingleSelectDropdown
									title="Time Period"
									uniqueKey="value"
									defaultSelectedValue="0"
									showContent={false}
									onChangeHook={(val) => getInvoices({...filters, extraParams: { ...filters.extraParams, createdAt: val}})}
									customRenderDropDownIcon={() => <i class="bx bx-slider fw-6 fs-16"></i>}
									data={[
										{
											label: "All Time",
											value: "0"
										},
										{
											label: "Today",
											value: "1"
										},
										{
											label: "Past 7 days",
											value: "2"
										},
										{
											label: "This month",
											value: "3"
										},
										{
											label: "Last month",
											value: "4"
										},
										{
											label: "Last 12 month",
											value: "5"
										},
										{
											label: "Custom",
											value: "6"
										}
									]}
								/>
							)
						}
					},
					{name: "Last modified", value: "updatedAt", allowSorting: true, onClickColumnHook: (val) => getInvoices(val)},
					{name: "Actions"}
				]}
			>
				{ props.invoices.map(invoice =>
					!invoice.archived && 
						<tr key={`invoice-${invoice.id}`} className={`${invoiceIds.indexOf(invoice.id) > -1 && "bg-primary-light"}`}>
							<td>
								<div class="select-box">
									<label class="checkbox-container">
										<input type="checkbox" checked={invoiceIds.includes(invoice.id)} onClick={() => onInvoicSelect(invoice.id)}/>
										<span class="checkmark"></span>
									</label>
									<i class='bx bx-file invoice-icon'></i>
								</div>
							</td>
							<td>
								<p class="invoice-name truncate">{invoice.name}</p>
								<span class="invoice-number">Invoice no. {invoice.id}</span>
							</td>
							{/* <td>$100.00</td> */}
							<td>{invoice.client && invoice.client.name}</td>
							<td>
								<p class={`status ${getStatusClass(invoice.status)}`}>{startCase(invoice.status)}</p>
							</td>
							<td>{moment(invoice.createdAt).format('hh:mm MM.DD.YYYY')}</td>
							<td>{moment(invoice.updatedAt).startOf('second').fromNow()}</td>
							<td>
								<ActionBox
									viewIcon="dots-horizontal-rounded"
									iconStyle="action-icon"
									items={[
										{ name: "Preview", icon: "expand", onClickAction: () => invoicePreview(invoice.id) },
										{ name: "Edit", icon: "edit", onClickAction: () => clientFormEdit(invoice.id) },
										{ name: "Re Send", icon: "mail-send", onClickAction: () => {} },
										{ name: "Download", icon: "download", onClickAction: () => handleDownloadInvoicePDF(invoice.id) },
										{ name: "Archive", icon: "archive", onClickAction: () => onInvoiceDelete({ id: invoice.id, archived: true }) }
									]}
								/>
								{/* <div class="dropdown">
									<span>
										<i class='bx bx-dots-horizontal-rounded action-icon'></i>
									</span>
									<div class="dropdown-content">
										<a onClick={() => clientFormEdit(invoice.id)}><i class='bx bx-edit'></i>Edit</a>
										<a><i class='bx bx-mail-send'></i>Re Send</a>
										<a><i class='bx bx-download'></i>Download</a>
										<a onClick={() => onInvoiceDelete({ id: invoice.id, archived: true })}><i class='bx bx-archive'></i>Archive</a>
									</div>
								</div> */}
							</td>
						</tr>
				)}
			</Table>
			<Pagination
				filters={filters}
				pagination={pagination}
				currentTotalRecords={invoices.length}
				filterHook={(filters) => getInvoices(filters)}
				infoTextDisplay={invoiceIds.length > 0 ? () => <span className="color-grey-light fs-14">No. of Invoices Selected: {invoiceIds.length.toLocaleString("es-US", { minimumIntegerDigits: 2 })} </span> : null}
			/>
      <InvoiceShow globalFormValues={previewValues} />
		</div>
	);
}

function mapStateToProps(state) {
  const { invoice, auth, filters } = state;
  return {
    invoices: invoice.invoices,
		pagination: invoice.pagination,
    currentUser: auth.user,
		filters
  };
}

export default connect(mapStateToProps)(Invoices);