import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ShowList from './ShowList/ShowList';
import ShowPreview from './ShowPreview/ShowPreview';

function App() {
  return (
    <Router>
      <div className='container'>
        <Route exact path="/" component={ShowList}></Route>
        <Route path="/show/:id" component={ShowPreview}></Route>
      </div>
    </Router>
  );
}

export default App;
