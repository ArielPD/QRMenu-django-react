import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {ToastContainer} from "react-toastify";

import { AuthProvider } from '../contexts/AuthContext';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Place from '../pages/Place';
import Places from '../pages/Places';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/places' element={
              <PrivateRoute> 
                <Places />
              </PrivateRoute>
          }/>
          <Route path='/places/:id' element={
              <PrivateRoute> 
                <Place />
              </PrivateRoute>
          }/>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </AuthProvider>
  )
}

export default App;