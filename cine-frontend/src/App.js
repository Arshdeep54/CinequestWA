import { BrowserRouter, Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Homepage from "./components/Homepage";
import About from "./components/About";
import Userprofile from "./components/Userprofile";
import Loginpage from "./components/Loginpage";
import Signuppage from "./components/Signuppage";
import Services from "./components/Services";
import ContactPage from "./components/ContactPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Userprofile />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
