import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Contact from './pages/Contact';

function App() {
  return (
    <div className=" h-screen  bg-gradinet">
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
