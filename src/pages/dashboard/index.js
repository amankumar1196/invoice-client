import "./dashboard.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
  {
    name: 'M',
    // uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'T',
    // uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'W',
    // uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'T',
    // uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'F',
    // uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'S',
    // uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'S',
    // uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];


function Dashboard() {
	const [activeTab, setActiveTab] = useState(0)
	return (
		<section class="d-flex">
			<div  class="dashboard-wrapper-left">
				<div class="dashboard-header">
					<h1>Dashboard</h1>
					<i class='bx bx-slider filter-icon'></i>
				</div>

				

				<div class="d-flex">
					<div class="dashboard-overview">
						<div class="card-wrapper">
							<div class="card">
								<div class="card-header">
									<div class="d-flex align-items-center">
										<i class='bx bx-bar-chart-square color-primary fs-20 mr-8'></i>
										No. of Invoices
									</div>
									<span class="color-grey-light">Today</span>
								</div>
								<div class="card-content">
									<span class="fs-24 fw-6">24</span>
								</div>
							</div>
						</div>
						<div class="card-wrapper">
							<div class="card">
								<div class="card-header">
									<div class="d-flex align-items-center">
										<i class='bx bx-credit-card color-primary fs-20 mr-8'></i>
										Invoiced Amount
									</div>
									<span class="color-grey-light">Today</span>
								</div>
								<div class="card-content">
									<span class="fs-24 fw-6">$3600.00</span>
								</div>
							</div>
						</div>
						<div class="card-wrapper">
							<div class="card">
								<div class="card-header">
									<div class="d-flex align-items-center">
										<i class='bx bx-list-ol color-primary fs-20 mr-8'></i>
										No. of Invoices
									</div>
									<span class="color-grey-light">Month</span>
								</div>
								<div class="card-content">
									<span class="fs-24 fw-6">635</span>
								</div>
							</div>
						</div>
						<div class="card-wrapper">
							<div class="card">
								<div class="card-header">
									<div class="d-flex align-items-center">
										<i class='bx bx-dollar-circle color-primary fs-20 mr-8'></i>
										Invoiced Amount
									</div>
									<span class="color-grey-light">Month</span>
								</div>
								<div class="card-content">
									<span class="fs-24 fw-6">$768095.00</span>
								</div>
							</div>
						</div>
					</div>
					<div class="dashboard-graph-wrapper">
						<div class="dashboard-graph">
							{/* <ResponsiveContainer width="100%" height="100%"> */}
							<BarChart
								width={250}
								height={260}
								data={data}
								margin={{
									top: 5,
									right: 30,
									left: 20,
									bottom: 5,
								}}
							>
								{/* <CartesianGrid strokeDasharray="3 3" /> */}
								<XAxis dataKey="name" />
								{/* <YAxis /> */}
								{/* <Tooltip /> */}
								<Legend />
								<Bar name="No. of Invoices" dataKey="pv" fill="#3a67d9" barSize={20}/>
								{/* <Bar dataKey="uv" fill="#82ca9d" /> */}
							</BarChart>
							{/* </ResponsiveContainer> */}
						</div>
					</div>
				</div>

				<div class="dashboard-recent-wrapper">
					<div class="dashboard-recent-header">
						<div class="d-flex align-items-center">
							<button class={`btn btn-${activeTab === 0 ? "primary" : "outline-primary"} d-flex align-items-center mr-8`} onClick={() => setActiveTab(0)}>
								The most recent Invoices
							</button>
							<button class={`btn btn-${activeTab === 1 ? "primary" : "outline-primary"} d-flex align-items-center ml-8`} onClick={() => setActiveTab(1)}>
								Recent Clients
							</button>
						</div>
						<NavLink to="invoices">
							<div class="view-all-invoice d-flex align-items-center">
								<i class="bx bx-spreadsheet fs-20 mr-8"></i>
								All List
							</div>
						</NavLink>
					</div>
					<div class="dashboard-recent-content">
						{activeTab === 0 && 
							<table>
								<thead>
									<tr>
										<th>Name</th>
										<th>Price</th>
										<th>Client</th>
										<th>Status</th>
										<th>Date</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<p class="invoice-name">New Project expense invoice</p>
											<span class="invoice-number">Invoice no. 88</span>
										</td>
										<td>$100.00</td>
										<td>Apple</td>
										<td>
											<p class="status status-unpaid">Not Send</p>
										</td>
										<td>11:21 08.10.2121</td>
										
									</tr>
									<tr>
										<td>
											<p class="invoice-name">New Project expense invoice</p>
											<span class="invoice-number">Invoice no. 88</span>
										</td>
										<td>$100.00</td>
										<td>Apple</td>
										<td>
											<p class="status status-paid">Send</p>
										</td>
										<td>11:21 08.10.2121</td>
									</tr>
									<tr>
										<td>
											<p class="invoice-name">New Project expense invoice</p>
											<span class="invoice-number">Invoice no. 88</span>
										</td>
										<td>$100.00</td>
										<td>Apple</td>
										<td>
											<p class="status status-pending">Pending</p>
										</td>
										<td>11:21 08.10.2121</td>
									</tr>
									<tr>
										<td>
											<p class="invoice-name">New Project expense invoice</p>
											<span class="invoice-number">Invoice no. 88</span>
										</td>
										<td>$100.00</td>
										<td>Apple</td>
										<td>
											<p class="status status-pending">Pending</p>
										</td>
										<td>11:21 08.10.2121</td>
									</tr>
								</tbody>
							</table>
						}
						{activeTab === 1 && 
							<table>
								<thead>
									<tr>
										<th>Client Name</th>
										<th>Issue Date</th>
										<th>Due Date</th>
										<th>Amount</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<p class="invoice-name">New Project expense invoice</p>
										</td>
										<td>$100.00</td>
										<td>Apple</td>
										<td>
											<p class="status status-unpaid">Not Send</p>
										</td>
										<td>11:21 08.10.2121</td>
										
									</tr>
									<tr>
										<td>
											<p class="invoice-name">New Project expense invoice</p>
										</td>
										<td>$100.00</td>
										<td>Apple</td>
										<td>
											<p class="status status-paid">Send</p>
										</td>
										<td>11:21 08.10.2121</td>
									</tr>
									<tr>
										<td>
											<p class="invoice-name">New Project expense invoice</p>
										</td>
										<td>$100.00</td>
										<td>Apple</td>
										<td>
											<p class="status status-pending">Pending</p>
										</td>
										<td>11:21 08.10.2121</td>
									</tr>
									<tr>
										<td>
											<p class="invoice-name">New Project expense invoice</p>
										</td>
										<td>$100.00</td>
										<td>Apple</td>
										<td>
											<p class="status status-pending">Pending</p>
										</td>
										<td>11:21 08.10.2121</td>
									</tr>
								</tbody>
							</table>
						}
					</div>
				</div>
			</div>
			
			<div class="dashboard-wrapper-right">
				<div class="dashboard-feed">
					<div class="feed-header">
						<div class="d-flex align-items-center">
							<i class='bx bx-bell fs-20 mr-8'></i>
							Feed
						</div>
						<span class="fs-10">This Month</span>
					</div>
					<div class="feed-content">
						<div class="view-all-activity">
							<NavLink to="">View All</NavLink>
						</div>
						<ul class="timeline">
							<li class="timeline-event">
								<div class="timeline-event-icon-wrapper">
									<label class="timeline-event-icon"></label>
								</div>
								<div class="timeline-event-copy">
									<h5>New Client</h5>
									<p class="color-grey-light">1 Hour Ago</p>
									<div class="d-flex">
										<i class='bx bx-user-circle color-primary fs-24'></i>
										<article class="client-details ml-8">
											<p><strong>Name:</strong> Aman</p>
											<p><strong>Phone:</strong> 9087654321</p>
											<p><strong>Email:</strong> aman@abc.com</p>
										</article>
									</div>
								</div>
							</li>
							<li class="timeline-event">
								<div class="timeline-event-icon-wrapper">
									<label class="timeline-event-icon"></label>
								</div>
								<div class="timeline-event-copy">
									<h5>Invoice Send</h5>
									<p class="color-grey-light">2 Hour Ago</p>
									<div class="d-flex">
										<i class='bx bx-paper-plane color-primary fs-24'></i>
										<article class="client-details ml-8">
											<p><strong>Invoice No:</strong> #1234356</p>
											<p><strong>To:</strong> Bluebash Consulting</p>
											<p><strong>Email:</strong> aman@abc.com</p>
										</article>
									</div>
								</div>
							</li>
							<li class="timeline-event">
								<div class="timeline-event-icon-wrapper">
									<label class="timeline-event-icon"></label>
								</div>
								<div class="timeline-event-copy">
									<h5>Created Invoice</h5>
									<p class="color-grey-light">Tue 6:30 AM - 23 July, 2021</p>
									<div class="d-flex">
										<i class='bx bx-receipt color-primary fs-24'></i>
										<article class="client-details ml-8">
											<p><strong>Invoice No:</strong> #1234356</p>
											<p><strong>Amount:</strong> $3400.00</p>
										</article>
									</div>
								</div>
							</li>
<li class="timeline-event">
								<div class="timeline-event-icon-wrapper">
									<label class="timeline-event-icon"></label>
								</div>
								<div class="timeline-event-copy">
									<h5>New Client</h5>
									<p class="color-grey-light">1 Hour Ago</p>
									<div class="d-flex">
										<i class='bx bx-user-circle color-primary fs-24'></i>
										<article class="client-details ml-8">
											<p><strong>Name:</strong> Aman</p>
											<p><strong>Phone:</strong> 9087654321</p>
											<p><strong>Email:</strong> aman@abc.com</p>
										</article>
									</div>
								</div>
							</li>
							<li class="timeline-event">
								<div class="timeline-event-icon-wrapper">
									<label class="timeline-event-icon"></label>
								</div>
								<div class="timeline-event-copy">
									<h5>Invoice Send</h5>
									<p class="color-grey-light">2 Hour Ago</p>
									<div class="d-flex">
										<i class='bx bx-paper-plane color-primary fs-24'></i>
										<article class="client-details ml-8">
											<p><strong>Invoice No:</strong> #1234356</p>
											<p><strong>To:</strong> Bluebash Consulting</p>
											<p><strong>Email:</strong> aman@abc.com</p>
										</article>
									</div>
								</div>
							</li>
							<li class="timeline-event">
								<div class="timeline-event-icon-wrapper">
									<label class="timeline-event-icon"></label>
								</div>
								<div class="timeline-event-copy">
									<h5>Created Invoice</h5>
									<p class="color-grey-light">Tue 6:30 AM - 23 July, 2021</p>
									<div class="d-flex">
										<i class='bx bx-receipt color-primary fs-24'></i>
										<article class="client-details ml-8">
											<p><strong>Invoice No:</strong> #1234356</p>
											<p><strong>Amount:</strong> $3400.00</p>
										</article>
									</div>
								</div>
							</li>

							<li class="timeline-event">
								<div class="timeline-event-icon-wrapper">
									<label class="timeline-event-icon"></label>
								</div>
								<div class="timeline-event-copy">
									<h5 class="color-primary">
										<NavLink to="">More ...</NavLink>
									</h5>
								</div>
							</li>
						</ul>  
					</div>
				</div>

			</div>			
		</section>
	);
}

export default Dashboard;