
import { Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Home/Homepage'
import Cartpage from './Pages/Cart/Cartpage'
import Loginpage from './Pages/Loginpage';
import PageNotFound from './Pages/PageNotFound';
import Registerpage from './Pages/Registerpage';
import Forgotpassword from './Pages/Forgotpassword';
import Profile from './Pages/USER-DASHBOARD/Profile';
import Productpage from './Pages/Product/Productpage';
import Dashboard from './Pages/ADMIN/Dashboard';
import Checkout from './Pages/Checkout';
import Search from './Pages/Search';
import PrivateRoute from './Components/PrivateRoute';
import CategoryProducts from './Pages/CategoryProducts';
import AboutPage from './Pages/AboutPage';
import ProductRviews from './Pages/ProductRviews';
import RegistrationNote from './Pages/RegistrationNote';
import ResetPassword from './Pages/ResetPassword';
import VerifyEmail from './Pages/VerifyEmail';
import PrivateRoute1 from './Components/PrivateRoute1';
import UserDashboard from './Pages/USER-DASHBOARD/UserDashboard';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/cart' element={<Cartpage/>}/>
      <Route path='/login' element={<Loginpage/>} />
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path='/Search' element={<Search/>} />
      <Route path='/About' element={<AboutPage/>} />
      <Route path='/new-user' element={<RegistrationNote/>}/>
      <Route path='/product_reviews/:id' element={<ProductRviews/>} />
      <Route path='/forgot-password' element={<Forgotpassword/>}/>
      <Route path='/reset-password/:token' element={<ResetPassword/>}/>
      <Route path='/verify-email/:token' element={<VerifyEmail/>}/>
      <Route path='/user-profile' element={<Profile/>} />
      <Route path='/product_category/:category' element={<CategoryProducts/>} />
      <Route path='/product/:id' element={<Productpage/>}/>
      <Route path='*' element={<PageNotFound/>}/>
      <Route path='/register'element={<Registerpage/>} />
      <Route element={<PrivateRoute/>} >
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Route>
      <Route element={<PrivateRoute1/>} >
        <Route path='/Customer' element={<UserDashboard/>}/>
      </Route>
    </Routes>
    </>
  );
}

export default App;
