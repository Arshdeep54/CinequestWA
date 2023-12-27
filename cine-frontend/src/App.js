import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Homepage from './components/Homepage';
import About from './components/About';
import Userprofile from './components/Userprofile';
import Loginpage from './components/Loginpage';
import Signuppage from './components/Signuppage';
import Services from './components/Services';
import ContactPage from './components/ContactPage';
import ChangePassword from './components/ChangePassword';
import MoviePage from './components/MoviePage';
import VerifyEmail from './components/VerifyEmail';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/movies/:uid' element={<MoviePage />} />
          <Route path='/about' element={<About />} />
          <Route path='/auth/profile' element={<Userprofile />} />
          <Route path='/auth/login' element={<Loginpage />} />
          <Route path='/auth/signup' element={<Signuppage />} />
          <Route path='/auth/verifyemail' element={<VerifyEmail />} />
          <Route path='/auth/changepassword' element={<ChangePassword />} />
          <Route
            path='/auth/reset/:uid/:sent_token'
            element={<ChangePassword />}
          />
          <Route path='/services' element={<Services />} />
          <Route path='/contact' element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
