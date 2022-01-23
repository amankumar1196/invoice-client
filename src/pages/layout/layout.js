import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { connect } from "react-redux";
import Header from '../header/header';
import Sidebar from '../sidebar/sidebar';

function Layout(props) {
    const [isNavOpen, toggleNav] = useState(true);

    return (
      <div>
        <Header isNavOpen={isNavOpen} />
        <Sidebar isNavOpen={isNavOpen} toggleNav={toggleNav}  setLoggedIn={props.setLoggedIn}/>
        <main class={`main-wrapper ${isNavOpen && "nav-open"}`}>
          <div class="main-content">
            <Outlet />
          </div>
        </main>
      </div>
    );
}

export default connect()(Layout);
