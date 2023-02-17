import Home from './components/js/Home';
import Connection from './components/js/Connection';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {
  return (
    <div> 
      <BrowserRouter>
      <Routes>
        <Route path='/connection' element={<Connection></Connection>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
              </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
