import './App.css';
import Lobby from './components/Lobby';
import { Route, Router, Routes } from 'react-router-dom';
import Room from './components/Room';
function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Lobby/>}/>
          <Route path='/room/:roomId' element={<Room/>}/>
        </Routes>
      </Router>
  );
}

export default App;
