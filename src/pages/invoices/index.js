import "./invoices.css";
import {NavLink} from 'react-router-dom';
import { useEffect } from "react";
import { connect } from "react-redux";
import { retrieveInvoices } from "../../redux/actions/invoiceActions";
import { startCase } from "lodash";
import moment from "moment";

function Invoices(props) {

	useEffect(()=> {
		props.dispatch(retrieveInvoices());
	},[])
	
	const getStatusClass = (status) => {
		switch(status){
			case "send": return "status-paid"
			case "not_send": return "status-unpaid"
			default: return "status-pending"
		}
	}
	return (
		<div class="invoice-page-wrapper">
			<div class="invoice-page-header">
				<div class="invoice-page-header-left">
					<h1>Invoices</h1>
					<NavLink to="/invoices/new">
						<p class="invoice-create">
							<i class='bx bx-plus-circle'></i>
							Create
						</p>
					</NavLink>
				</div>
				<div class="invoice-page-header-right">
					<div class="header__search">
						<input type="search" placeholder="Search Invoice" class="header__input" />
						<i class='bx bx-search header__icon'></i>
					</div>
				</div>
			</div>
			
			<table>
				<thead>
					<tr>
						<th>
							<label class="checkbox-container">
								<input type="checkbox" />All
								<span class="checkmark"></span>
							</label>
						</th>
						<th>Name <i class='bx bx-sort-alt-2'></i></th>
						<th>Price <i class='bx bx-sort-alt-2'></i></th>
						<th>Client <i class='bx bx-sort-alt-2'></i></th>
						<th>Status <i class='bx bx-sort-alt-2'></i></th>
						<th>Date <i class='bx bx-sort-alt-2'></i></th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{props.invoices.map(invoice =>
						<tr key={`invoice-${invoice.id}`}>
							<td>
								<div class="select-box">
									<label class="checkbox-container">
										<input type="checkbox" />
										<span class="checkmark"></span>
									</label>
									<i class='bx bx-file invoice-icon'></i>
								</div>
							</td>
							<td>
								<p class="invoice-name">{invoice.name}</p>
								<span class="invoice-number">Invoice no. {invoice.id}</span>
							</td>
							<td>$100.00</td>
							<td>{invoice.client && invoice.client.name}</td>
							<td>
								<p class={`status ${getStatusClass(invoice.status)}`}>{startCase(invoice.status)}</p>
							</td>
							<td>{moment(invoice.createdAt).format('hh:mm MM.DD.YYYY')}</td>
							<td>
								<div class="dropdown">
									<span>
										<i class='bx bx-dots-horizontal-rounded action-icon'></i>
									</span>
									<div class="dropdown-content">
										<a><i class='bx bx-edit'></i>Edit</a>
										<a><i class='bx bx-mail-send'></i>Re Send</a>
										<a><i class='bx bx-download'></i>Download</a>
										<a><i class='bx bx-archive'></i>Archive</a>
									</div>
								</div>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

function mapStateToProps(state) {
  const { invoice } = state;
  const { message } = state.toastrMessage;
  return {
    invoices: invoice.invoices,
    message
  };
}

export default connect(mapStateToProps)(Invoices);