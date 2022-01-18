import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';
import "./sidebar.css";

function Sidebar(props) {
    const { isNavOpen, toggleNav, dispatch } = props;

  return (
    <div class={`sidebar ${isNavOpen && "open"}`}>
      <div class="logo-details">
          <i class='bx bx-receipt icon'></i>
          <div class="logo_name">Invoice.ai</div>
          <i class='bx bx-menu' id="btn" onClick={() => toggleNav(!isNavOpen)}></i>
      </div>
      <ul class="nav-list">
        <li>
          <NavLink to="/">
            <i class='bx bx-grid-alt'></i>
            <span class="links_name">Dashboard</span>
          </NavLink>
          <span class="tooltip">Dashboard</span>
        </li>
        <li>
          <NavLink to="/invoices">
            <i class='bx bx-receipt' ></i>
            <span class="links_name">Invoices</span>
          </NavLink>
          <span class="tooltip">Invoices</span>
        </li>
        <li>
          <NavLink to="/clients">
            <i class='bx bx-user' ></i>
            <span class="links_name">Clients</span>
          </NavLink>
          <span class="tooltip">Clients</span>
        </li>
        <li>
          <NavLink to="/analytics">
            <i class='bx bx-pie-chart-alt-2' ></i>
            <span class="links_name">Analytics</span>
          </NavLink>
          <span class="tooltip">Analytics</span>
        </li>
        <li>
          <NavLink to="/archive">
            <i class='bx bx-archive' ></i>
            <span class="links_name">Archive</span>
          </NavLink>
          <span class="tooltip">Archive</span>
        </li>
        <li>
          <NavLink to="/setting">
            <i class='bx bx-cog' ></i>
            <span class="links_name">Setting</span>
          </NavLink>
          <span class="tooltip">Setting</span>
        </li>
        <li>
            <a onClick={() => dispatch(logout())}>
              <i class='bx bx-log-out' id="log_out" ></i>
              <span class="links_name">Logout</span>
            </a>
            <span class="tooltip">Logout</span>
        </li>
      </ul>
    </div>
  );
}

export default connect()(Sidebar);
