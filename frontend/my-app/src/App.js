import './App.css';
import Itemlist from './components/Itemlist'
import { ItemProvider } from './contexts/jsonItemsContext'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

function App() {
  

  return (
    <div className="App">

      <Topbar />

    <div className='itemlist-outer-wrapper'>

      <Sidebar />

      <div className='main-window'>
        <ItemProvider >
        <BrowserRouter>
          <Routes>
            <Route path="/items" element={<Itemlist />}>    
            </Route>
          </Routes>
        </BrowserRouter>

        </ItemProvider>
      </div>
    </div>

    </div>
  );
}

export default App;
