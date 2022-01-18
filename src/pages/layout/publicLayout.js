import { Outlet } from 'react-router-dom';
import avatar from "../../assests/img/login1.svg"
import "./publicLayout.css";

function Layout() {
    return (
        <main class="page-wrapper">
        	<div class="adv-wrapper">
						<img src={avatar} class="adv-img"/>
					</div>
					<div class="form-wrapper">
						<div class="public-header">
							<div class="logo-details color-primary d-flex align-items-center">
								<i class='bx bx-receipt fs-24 mr-8'></i>
								<div class="logo_name fw-6 fs-20">Invoice.ai</div>
							</div>
							<div class="fs-12">Having Trouble? <span class="color-primary">Get Help</span></div>
						</div>
						<div class="form-content">
							<Outlet />
							<div class="or-wrapper">
								<span class="line"></span>
								<span class="or">Or</span>
								<span class="line"></span>
							</div>
							<button class="btn btn-outline-primary google-btn">
								<i class='bx bxl-google fs-16 pr-8'></i>
								Sign Up with Google
							</button>
						</div>
						<footer class="public-footer fs-12">&copy; Copyright 2021 invoicer.ai</footer>
					</div>
        </main>
    );
}

export default Layout;
