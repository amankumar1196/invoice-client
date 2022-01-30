import "./invoices.css";
import {NavLink, useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { startCase } from "lodash";
import moment from "moment";
import { retrieveInvoices, getAllInvoicesIds, invoiceEditing, getInvoice } from "../../redux/actions/invoiceActions";
import Search from "../../components/search/Search";
import Pagination from "../../components/pagination/Pagination";
import { clearFilter, setFilter } from "../../redux/actions/filterActions";
import Table from "../../components/table/Table";
import {MultiSelectDropdown} from "../../components/form";
import { getClient } from "../../redux/actions/clientActions";
import { getCompany } from "../../redux/actions/companyActions";

function Invoices(props) {
	const { currentUser, filters, pagination, invoices } = props;
	const [ invoiceIds, setInvoiceIds ] = useState([]);
	const history = useNavigate();

	useEffect(()=> {
		getInvoices({...filters, extraParams: { ...filters.extraParams, registerKey: currentUser.registerKey}, include: [ "client" ]})
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

	const getStatusClass = (status) => {
		switch(status){
			case "send": return "status-paid"
			case "not_send": return "status-unpaid"
			default: return "status-pending"
		}
	}

	const setAllInvoicesIds = async (checked) => {
		if(checked) {
			const allInvoiceIds = await props.dispatch(getAllInvoicesIds({...filters, sortBy:"id", sortDirection: "ASC", rpp: 99999999}))
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
							return ( <label class="checkbox-container">
								<input type="checkbox" checked={pagination.totalRecords === invoiceIds.length} onClick={(e) => setAllInvoicesIds(e.target.checked)}/>All
								<span class="checkmark"></span>
							</label> )
						}
					},
					{name: "Name", value: "name", onClickColumnHook: (val) => getInvoices(val)},
					{name: "Price", value: "price", onClickColumnHook: (val) => getInvoices(val)},
					{name: "Client", value: "name", modal: "client", onClickColumnHook: (val) => getInvoices(val)},
					{ name: "Status",
						width: "100px",
						render: () => {
							return ( <label class="d-flex align-items-center">
								Status
								<MultiSelectDropdown />
							</label> )
						}
					},
					{name: "Date", value: "createdAt", onClickColumnHook: (val) => getInvoices(val)},
					{name: "Last modified", value: "updatedAt", onClickColumnHook: (val) => getInvoices(val)},
					{name: "Actions"}
				]}
			>
				{ props.invoices.map(invoice =>
					<tr key={`invoice-${invoice.id}`}>
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
						<td>$100.00</td>
						<td>{invoice.client && invoice.client.name}</td>
						<td>
							<p class={`status ${getStatusClass(invoice.status)}`}>{startCase(invoice.status)}</p>
						</td>
						<td>{moment(invoice.createdAt).format('hh:mm MM.DD.YYYY')}</td>
						<td>{moment(invoice.updatedAt).startOf('second').fromNow()}</td>
						<td>
							<div class="dropdown">
								<span>
									<i class='bx bx-dots-horizontal-rounded action-icon'></i>
								</span>
								<div class="dropdown-content">
									<a onClick={() => clientFormEdit(invoice.id)}><i class='bx bx-edit'></i>Edit</a>
									<a><i class='bx bx-mail-send'></i>Re Send</a>
									<a><i class='bx bx-download'></i>Download</a>
									<a><i class='bx bx-archive'></i>Archive</a>
								</div>
							</div>
						</td>
					</tr>
				)}
			</Table>
			<Pagination filters={filters} pagination={pagination} currentTotalRecords={invoices.length} filterHook={(filters) => getInvoices(filters)} />
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