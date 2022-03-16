import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {ToastContainer} from "react-toastify";

import Home from '../pages/Home';
import Login from '../pages/Login';
import Places from '../pages/Places';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/places' element={<Places />}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App;