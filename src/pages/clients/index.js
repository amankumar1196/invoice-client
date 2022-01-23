import "./Client.css";
import { connect } from "react-redux";
import { useEffect } from "react";
import { deleteClient, retrieveClients, clientEditing, createClient, updateClient, getClient } from "../../redux/actions/clientActions";
import ClientFormModal from "./ClientFormModal";

function Clients(props) {
	const { clients, currentUser } = props;

	useEffect(()=>{
		props.dispatch(retrieveClients({extraParams: { registerKey: currentUser.registerKey}, include: ["address"]}))
	},[])

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
					<p class="invoice-create" onClick={() => clientFormEdit("new")}>
						<i class='bx bx-plus-circle'></i>
						Create Client
					</p>
				</div>
				<div class="invoice-page-header-right">
					<div class="header__search">
						<input type="search" placeholder="Search Client" class="header__input" />
						<i class='bx bx-search header__icon'></i>
					</div>
				</div>
			</div>
			
			<table>
				<thead>
					<tr>
						<th>S.No <i class='bx bx-sort-alt-2'></i></th>
						<th>Name <i class='bx bx-sort-alt-2'></i></th>
						<th>Email <i class='bx bx-sort-alt-2'></i></th>
						<th>Phone <i class='bx bx-sort-alt-2'></i></th>
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
			</table>
			<ClientFormModal clientFormSubmit={ clientFormSubmit }/>
		</div>
	);
}

function mapStateToProps(state) {
  const { client, auth } = state;
  return {
    clients: client.clients,
    client: client.client,
		currentUser: auth.user
  };
}

export default connect(mapStateToProps)(Clients);