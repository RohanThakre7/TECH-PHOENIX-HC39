import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import FieldPage from "./pages/FieldPage/FieldPage";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import LoginPage from "./pages/LoginSignup/LoginPage";
import SignupPage from "./pages/LoginSignup/SignupPage";
import QuizComponent from "./pages/Quiz/QuizComponent"; // Import the quiz component
import { AuthProvider } from "./context/authContext"; // Make sure it's inside Router now
import "./App.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/fields/:domainTitle" element={<FieldPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/quiz" element={<QuizComponent />} />{" "}
              {/* New route for quiz */}
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
