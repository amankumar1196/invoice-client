import "./header.css";
import { NavLink } from "react-router-dom";

function Header(props) {
  const { isNavOpen } = props;
  return (
    <header class={`header ${isNavOpen && "nav-open"}`}>
        <div class="header__container pl-32 pr-32">
          <div class="d-flex align-items-center">
            <p class="user-initials">
              Hi Aman
            </p>
          </div>
          <div class="invoice-page-header-right pl-32">
            <div class="header__search">
              <input type="search" placeholder="Search Invoice" class="header__input" />
              <i class='bx bx-search header__icon'></i>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <NavLink to="invoices/new" class="mr-16">
						  <button class="btn btn-primary d-flex align-items-center ml-8" onClick={()=>{}}><i class='bx bx-receipt mr-8 fs-20'></i> Create Invoice</button>
            </NavLink>
            <i class="bx bx-bell fs-20 color-grey-light ml-16 pl-32 mr-8"></i>
            <i class="bx bx-cog fs-20 color-grey-light mr-8 ml-8"></i>
            <div data-initials="AK" class="ml-16"></div>
          </div>
          

        </div>
    </header>
  );
}

export default Header;
