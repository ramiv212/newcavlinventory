import './App.css';
import Itemlist from './components/Itemlist'
import { ItemProvider } from './contexts/jsonItemsContext'


function App() {
  

  return (
    <div className="App">

    <div className='itemlist-outer-wrapper'>
      <ItemProvider >
        <Itemlist />
      </ItemProvider>  
    </div>

    </div>
  );
}

export default App;
