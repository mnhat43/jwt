import './App.scss';
import NavHeader from './components/Navigation/NavHeader';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect, useState } from 'react';
import _ from "lodash";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import AppRoutes from './routes/AppRoutes';
import { Rings } from 'react-loader-spinner'
import { UserContext } from './context/UserContext';

function App() {

  const { user } = useContext(UserContext);

  return (
    <>
      <Router>
        {
          user && user.isLoading ?
            <div className='loading-container'>
              <Rings
                heigth="100"
                width="100"
                color='#1877f2'
                ariaLabel='loading'
              />
              <div>Loading data...</div>
            </div>

            :
            <>
              <div className="app-header">
                <NavHeader />
              </div>
              <div className="app-container">
                <AppRoutes />
              </div>
            </>
        }

      </Router>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
