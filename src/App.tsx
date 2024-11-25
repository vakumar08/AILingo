import './App.css';
import AILingo from './components/AILingo/AILingo';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AILingo />} />
      </Routes>
    </div>
  );
}

export default App;
