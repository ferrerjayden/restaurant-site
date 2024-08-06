import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Restaurants from './pages/Restaurants';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Default from './pages/Default';
import { CreateRestaurant } from './pages/restaurants/CreateRestaurant';
import { ViewRestaurant } from './pages/restaurants/ViewRestaurant';
import { CreateReview } from './pages/reviews/CreateReview';

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
          <Route path="/restaurants/create" element={<CreateRestaurant/>}/>
          <Route path="/restaurants/view/:id" element={<ViewRestaurant/>}/>
          <Route path="/restaurants/:restaurantId/reviews/create" element={<CreateReview/>}/>
        {/* route to visit restaurant, route to edit restaurant */}
        </Routes>
    </BrowserRouter>
  );
}

export default App;
