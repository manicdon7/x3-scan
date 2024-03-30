import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Docs from './pages/Docs';
import Play from './pages/Play';
import Mint from './pages/Mint';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Documentation' element={<Docs/>} />
        <Route path='/playground' element={<Play/>} />
        <Route path='/mint/:transactionId' element={<Mint/>} />
      </Routes>
    </Router>
  )
}

export default App