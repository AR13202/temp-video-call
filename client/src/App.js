import './App.css';
import Lobby from './components/Lobby';
import { Route, Routes } from 'react-router-dom';
import Room from './components/Room';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Lobby/>}/>
        <Route path='/room/:roomId' element={<Room/>}/>
      </Routes>
    </div>
  );
}

export default App;
