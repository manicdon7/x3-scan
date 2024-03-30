import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Docs from './pages/Docs';
import Play from './pages/Play';
import ContractIntegration from './Contract/ContractIntegration';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Documentation' element={<Docs/>} />
        <Route path='/playground' element={<Play/>} />
      </Routes>
    </Router>
  )
}

export default App