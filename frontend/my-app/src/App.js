import './App.css';
import {useState,useEffect} from 'react'
import Itemlist from './components/Itemlist'
import TestComponent from './components/TestComponent';
import { ItemProvider } from './contexts/jsonItemsContext'


function App() {
  

  return (
    <div className="App">

    <div className='itemlist-outer-wrapper'>
      <ItemProvider >
        <Itemlist />
        <TestComponent />
      </ItemProvider>  
    </div>

    </div>
  );
}

export default App;
