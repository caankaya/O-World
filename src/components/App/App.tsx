import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import '../../styles/globals.css';
import '../../styles/alien-font.css';
import '../../styles/orbitron-font.css';

import NavBar from '../NavBar';
import SideBar from '../SideBar';
import Home from '../Home';
import About from '../About';
import Footer from '../Footer';
import StarsCanvas from '../Stars';

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
        <StarsCanvas />
      </div>
    </Router>
  );
}

export default App;
