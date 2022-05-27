import React from 'react';
import './App.css';
import Layout from './components/Layout';
import Login from './components/Login';
import Missing from './components/Missing';
import RequireAuth from './components/RequireAuth';
import { Route, Routes } from "react-router-dom"
import Register from './components/Register';
import Thank from "./components/Thank"
import Student from "./components/Student"



function App() {

  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="thank" element={<Thank />} />


          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Student />} />
          </Route>
                 

          {/* catch all */}
         <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
