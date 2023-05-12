import logo from './logo.svg';
import './App.css';
import Holi from './Holi';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import Salary from './Salary';
import * as React from 'react'

function App() {

  return (
    <>
      <Route path="/" component={Holi} />
      <Route path="/Salary" component={Salary} />
    </>
  );
}

export default App;
