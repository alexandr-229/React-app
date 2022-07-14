import React from 'react'
import './App.css';
import { Home } from './home/index';
import { SingleCity } from './SingleCity'
import { useCitiesList } from './hoock/useCitiesList';

import { Route, Routes } from 'react-router-dom';

export const GlobalContext = React.createContext()

function App() {
  const [ state, dispatch ] = useCitiesList()
  return(
    <div className='App'>
      <GlobalContext.Provider value={{ state, dispatch }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/city/:city" element={<SingleCity />}/>
          <Route path='*' element={<Home />}/>
        </Routes>
      </GlobalContext.Provider>
    </div>
  )
}

export default App;
