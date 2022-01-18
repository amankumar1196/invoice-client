import './App.css';
import { Routes, Route, Navigate} from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './pages/layout/layout';
import PublicLayout from './pages/layout/publicLayout';
import Dashboard from './pages/dashboard'
import Invoices from './pages/invoices'
import CreateInvoice from './pages/invoices/CreateInvoice'
import Clients from './pages/clients';

import SignInForm from './pages/Public/signIn';
import SignUpForm from './pages/Public/signUp';

const App = (props) => {
  const isLoggedIn = props.isLoggedIn || localStorage.getItem("access-token")
  return (
    <>
      {
        isLoggedIn ?
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="invoices" element={<Invoices />} />
            <Route path="invoices/new" element={<CreateInvoice />} />
            <Route path="clients" element={<Clients />} />
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path='*' element={<Navigate to='/' />} />
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
    </>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.toastrMessage;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(App);
