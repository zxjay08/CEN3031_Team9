//import logo from './logo.svg';
import React from 'react'
import {Routes, Route, BrowserRouter, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import { Selection } from './pages/Selection'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Selection />}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App