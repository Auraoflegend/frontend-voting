import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate, Navigate } from 'react-router-dom';
import Home from './SignUp-SignIn';
import VoteForCandidate from './VoteForCandidate';
import RegisterCandidate from './RegisterCandidate';
import Result from './result';
import './App.css';

const PrivateRoute: React.FC<{ element: JSX.Element; isLoggedIn: boolean }> = ({ element, isLoggedIn }) => {
  return isLoggedIn ? element : <Navigate to="/" />;
};

function VotingUser() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (session) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/">User Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <>
              <li>
                <Link to="/vote">Vote for Candidate</Link>
              </li>
              <li>
                <Link to="/register">Register Candidate</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
          <li>
            <Link to="/result">Voting Results</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/vote" element={<PrivateRoute element={<VoteForCandidate />} isLoggedIn={isLoggedIn} />} />
        <Route path="/register" element={<PrivateRoute element={<RegisterCandidate />} isLoggedIn={isLoggedIn} />} />
        <Route path="/result" element={<Result />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default VotingUser;
