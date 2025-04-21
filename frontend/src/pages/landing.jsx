import React from 'react';
import "../App.css";
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const router = useNavigate();

  return (
    <div className='landingPageContainer'>
      {/* Navbar */}
      <nav>
        <div className='navHeader'>
          <h2>MY ZOOM..</h2>
        </div>
        <div className='navlist'>
          <p onClick={() => router("/Guest-User")}>Join as Guest</p>
          <p onClick={() => router("/auth")}>Register</p>

          {/* Updated Login Button */}
          <button
            onClick={() => router("/auth")}
            className="loginButton"
            style={{
              padding: '8px 16px',
              background: 'linear-gradient(45deg, #3f51b5, #1a237e)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.3s ease',
              boxShadow: '0 4px 12px rgba(63, 81, 181, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(63, 81, 181, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(63, 81, 181, 0.3)';
            }}
          >
            Login
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="landingMainContainer">
        <div>
          <h1 className="animatedHeading">
            <span className="gradientText" style={{ color: "#FF9839" }}>Connect</span> with your loved Ones
          </h1>
          <p>Cover a distance by MY ZOOM</p>
          <div role='button'>
            <Link to="/auth" className='getStartedLink'>
              Get Started
            </Link>
          </div>
        </div>
        {/* Styled Image */}
        <div className="imageContainer">
          <img src="/mobile.png" alt="Phone" className="landingImage" />
        </div>
      </div>
    </div>
  );
}
