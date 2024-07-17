import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Restaurants from './pages/Restaurants';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Default from './pages/Default';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/restaurants" element={<Restaurants/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="*" element={<Default/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
