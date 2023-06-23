import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import '../../styles/globals.css';
import '../../styles/alien-font.css';
import '../../styles/orbitron-font.css';

import Home from '../Home';
import About from '../About';
import Legal from '../Legal';
import Earth from '../Earth';
import Error404 from '../Error404';
import Layout from '../Layout';
import Country from '../Country';
import Profil from '../Profile';
import Administrator from '../Administrator';

function App() {
  // Récupération de l'ID du pays depuis l'URL
  return (
    <Router>
      <Routes>
        {/* Routes with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/profile" element={<Profil />} />
          <Route path="/administrator" element={<Administrator />} />
          <Route path="/world" element={<Earth />} />
          <Route path="/country/:id" element={<Country />} />
        </Route>
        {/* 404 Page without Layout */}
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
