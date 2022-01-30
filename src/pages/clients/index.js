import "./client.css";
import { connect } from "react-redux";
import { useEffect } from "react";
import { deleteClient, retrieveClients, clientEditing, createClient, updateClient, getClient } from "../../redux/actions/clientActions";
import ClientFormModal from "./ClientFormModal";
import { clearFilter, setFilter } from "../../redux/actions/filterActions";
import Pagination from "../../components/pagination/Pagination";
import Table from "../../components/table/Table";
import moment from "moment";
import Search from "../../components/search/Search";

function Clients(props) {
	const { clients, currentUser, filters, pagination } = props;

	useEffect(()=>{
		getClients({...filters, extraParams: { ...filters.extraParams, registerKey: currentUser.registerKey}, include: ["address"]})
		return () => {
			props.dispatch(clearFilter());
		}
	},[])

	const getClients = (filters) => {
		props.dispatch(retrieveClients(filters))
		props.dispatch(setFilter(filters));
	}	

	const clientFormEdit = (id) => {
		if(id !== "new")
			props.dispatch(getClient(id));
		props.dispatch(clientEditing(id));
	}	

	const clientFormSubmit = (data) => {
    const id = data.id || '';
    if (id === '') {
      props.dispatch(createClient(data));
    } else {
      props.dispatch(updateClient(data));
    }
  }

  return (
		<div class="invoice-page-wrapper">
			<div class="invoice-page-header">
				<div class="invoice-page-header-left">
					<h1>Clients</h1>
					<p class="page-create-button" onClick={() => clientFormEdit("new")}>
						<i class='bx bx-plus-circle'></i>
						Create Client
					</p>
				</div>
				<Search 
					filters={filters}
					placeholder="Search clients by name or email"
					searchHook={(val) => getClients(val)}
				/>

			</div>
			<div class="table-pagination-wrapper">
				<Table
					columns={[
						{name: "S.No"},
						{name: "Name", value: "name", onClickColumnHook: (val) => getClients(val)},
						{name: "Email", value: "email", onClickColumnHook: (val) => getClients(val)},
						{name: "Phone", value: "phone", onClickColumnHook: (val) => getClients(val)},
						{name: "Added On", value: "createdAt", onClickColumnHook: (val) => getClients(val)},
						{name: "Address"},
						{name: "Actions"}
					]}
					data={[]}
				>
					{clients && clients.map((client, index) => 
						<tr key={client.id}>
							<td>{((filters.rpp*filters.page)-filters.rpp+index+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</td>
							<td>
								<p class="invoice-name">{client.name}</p>
							</td>
							<td>{client.email}</td>
							<td>{client.phone}</td>
							<td>{moment(client.createdAt).format("DD MMM, YYYY")}</td>
							<td>
								<p class="truncate">{client.address && `${client.address.address_line_1}, ${client.address.state}, ${client.address.country}`}</p>
							</td>
							<td>
								<div class="dropdown">
									<span>
										<i class='bx bx-dots-horizontal-rounded action-icon'></i>
									</span>
									<div class="dropdown-content">
										<a onClick={() => clientFormEdit(client.id)}><i class='bx bx-edit'></i>Edit</a>
										<a onClick={()=> props.dispatch(deleteClient(client.id))}><i class='bx bx-archive'></i>Delete</a>
									</div>
								</div>
							</td>
						</tr>
					)}
				</Table>
				{/* <table>
					<thead>
						<tr>
							<th>S.No <i class='bx bx-sort-alt-2'></i></th>
							<th onClick={() => getClients({...filters, sortBy: "name", sortDirection: filters.sortDirection == "DESC" ? "ASC" : "DESC"})}>Name <i class='bx bx-sort-alt-2'></i></th>
							<th onClick={() => getClients({...filters, sortBy: "email", sortDirection: filters.sortDirection == "DESC" ? "ASC" : "DESC"})}>Email <i class='bx bx-sort-alt-2'></i></th>
							<th onClick={() => getClients({...filters, sortBy: "phone", sortDirection: filters.sortDirection == "DESC" ? "ASC" : "DESC"})}>Phone <i class='bx bx-sort-alt-2'></i></th>
							<th>Address <i class='bx bx-sort-alt-2'></i></th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{clients && clients.map((client, index) => 
							<tr key={client.id}>
								<td>{index+1}</td>
								<td>
									<p class="invoice-name">{client.name}</p>
								</td>
								<td>{client.email}</td>
								<td>{client.phone}</td>
								<td>
									<p>{client.address && `${client.address.address_line_1}, ${client.address.state}, ${client.address.country}`}</p>
								</td>
								<td>
									<div class="dropdown">
										<span>
											<i class='bx bx-dots-horizontal-rounded action-icon'></i>
										</span>
										<div class="dropdown-content">
											<a onClick={() => clientFormEdit(client.id)}><i class='bx bx-edit'></i>Edit</a>
											<a onClick={()=> props.dispatch(deleteClient(client.id))}><i class='bx bx-archive'></i>Delete</a>
										</div>
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table> */}
				<Pagination filters={filters} pagination={pagination} currentTotalRecords={clients.length} filterHook={(filters) => getClients(filters)} />
			</div>
			<ClientFormModal clientFormSubmit={ clientFormSubmit }/>
		</div>
	);
}

function mapStateToProps(state) {
  const { client, auth, filters } = state;
  return {
    clients: client.clients,
    client: client.client,
		currentUser: auth.user,
		pagination: client.pagination,
		filters
  };
}

export default connect(mapStateToProps)(Clients);
