import "./client.css";
import { connect } from "react-redux";
import { useEffect } from "react";
import { deleteMember, retrieveMembers, memberEditing, createMember, updateMember, getMember } from "../../redux/actions/memberActions";
// import ClientFormModal from "./ClientFormModal";

function Members(props) {
	const { members, currentUser } = props;

	useEffect(()=>{
		props.dispatch(retrieveMembers({extraParams: { registerKey: currentUser.registerKey}, include: ["address"]}))
	},[])

	const memberFormEdit = (id) => {
		if(id !== "new")
			props.dispatch(getMember(id));
		props.dispatch(memberEditing(id));
	}	

	const memberFormSubmit = (data) => {
    const id = data.id || '';
    if (id === '') {
      props.dispatch(createMember(data));
    } else {
      props.dispatch(updateMember(data));
    }
  }

  return (
		<div class="invoice-page-wrapper">
			<div class="invoice-page-header">
				<div class="invoice-page-header-left">
					<h1>Members</h1>
					<p class="invoice-create" onClick={() => memberFormEdit("new")}>
						<i class='bx bx-plus-circle'></i>
						Create Member
					</p>
				</div>
				<div class="invoice-page-header-right">
					<div class="header__search">
						<input type="search" placeholder="Search Member" class="header__input" />
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
					{members && members.map((member, index) => 
						<tr key={member.id}>
							<td>{index+1}</td>
							<td>
								<p class="invoice-name">{member.name}</p>
							</td>
							<td>{member.email}</td>
							<td>{member.phone}</td>
							<td>
								<p>{member.address && `${member.address.address_line_1}, ${member.address.state}, ${member.address.country}`}</p>
							</td>
							<td>
								<div class="dropdown">
									<span>
										<i class='bx bx-dots-horizontal-rounded action-icon'></i>
									</span>
									<div class="dropdown-content">
										<a onClick={() => memberFormEdit(member.id)}><i class='bx bx-edit'></i>Edit</a>
										<a onClick={()=> props.dispatch(deleteMember(member.id))}><i class='bx bx-archive'></i>Delete</a>
									</div>
								</div>
							</td>
						</tr>
					)}
				</tbody>
			</table>
			{/* <ClientFormModal memberFormSubmit={ memberFormSubmit }/> */}
		</div>
	);
}

function mapStateToProps(state) {
  const { member, auth } = state;
  return {
    // members: member.members,
    // member: member.member,
		currentUser: auth.user
  };
}

export default connect(mapStateToProps)(Members);