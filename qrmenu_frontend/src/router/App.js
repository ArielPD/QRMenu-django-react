import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {ToastContainer} from "react-toastify";

import Home from '../pages/Home';
import Login from '../pages/Login';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App;