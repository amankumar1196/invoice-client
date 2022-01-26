import './App.css';
import { Routes, Route, Navigate} from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import Layout from './pages/layout/layout';
import PublicLayout from './pages/layout/publicLayout';
import Dashboard from './pages/dashboard'
import Invoices from './pages/invoices'
import CreateInvoice from './pages/invoices/CreateInvoice'
import Clients from './pages/clients';
// import Organizations from './pages/organizations';
import Members from './pages/organizations';

import SignInForm from './pages/Public/signIn';
import SignUpForm from './pages/Public/signUp';
import Toastr from './components/toastr/Toastr';
import { getCurrentUser } from "./redux/actions/authActions";

const App = (props) => {
  const { isLoggedIn, currentUser } = props;
  const isLogged = isLoggedIn || localStorage.getItem("access-token")

  useEffect(()=> {
    isLogged && props.dispatch(getCurrentUser({ include: ["address", "roles"] }))
  },[isLogged])

  return (
    <>
      {
        isLogged ?
          <Routes>
            { currentUser && [
              <Route path="/" element={<Layout />}>
                <Route path="invoices" element={<Invoices />} />
                <Route path="invoices/new" element={<CreateInvoice />} />
                <Route path="clients" element={<Clients />} />
                <Route path="members" element={<Members />} />
                <Route path="/" element={<Dashboard />} />
              </Route>,
              <Route path='*' element={<Navigate to='/' />} /> ]
            }
          </Routes>
        :
        <>
          <Routes>
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<SignInForm />} />
              <Route path="/sign-in" element={<SignInForm />} />
              <Route path="/sign-up" element={<SignUpForm />} />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </>
      }
      <Toastr/>
    </>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state.auth;
  return {
    isLoggedIn,
    currentUser: user
  };
}

export default connect(mapStateToProps)(App);
