import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Result.css';

// Define the Candidate interface to structure candidate data
interface Candidate {
  id: string;
  name: string;
  party: string;
  votes: number;
}

const Result: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [timeLeft, setTimeLeft] = useState(60); // Timer countdown in seconds
  const [winner, setWinner] = useState<Candidate | null>(null);
  const navigate = useNavigate();

  // Simulate fetching candidates data
  useEffect(() => {
    // This function simulates fetching candidate data from the backend
    const simulateFetchCandidates = () => {
      // Example candidates data for simulation purposes
      const exampleCandidates: Candidate[] = [
        { id: '1', name: 'Alice', party: 'Party A', votes: 10 },
        { id: '2', name: 'Bob', party: 'Party B', votes: 15 },
        { id: '3', name: 'Charlie', party: 'Party C', votes: 5 },
      ];
      setCandidates(exampleCandidates);
    };

    simulateFetchCandidates();
  }, []);

  // Determine the candidate with the maximum votes
  useEffect(() => {
    if (candidates.length > 0) {
      const maxVoteCandidate = candidates.reduce(
        (max, candidate) => (candidate.votes > max.votes ? candidate : max),
        candidates[0]
      );
      setWinner(maxVoteCandidate);
    }
  }, [candidates]);

  // Timer countdown logic
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdownInterval);
          resetVotesAndUserData(); // Call to reset votes and user data
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [navigate, candidates]);

  // Simulate resetting votes and user data
  const resetVotesAndUserData = () => {
    // Example of resetting votes to 0 for all candidates
    setCandidates((prevCandidates) =>
      prevCandidates.map((candidate) => ({ ...candidate, votes: 0 }))
    );

    // Clear the timer from local storage
    localStorage.removeItem('votingStartTime');

    alert('Votes and user data have been reset!');

    // Redirect to home page after reset
    navigate('/');
  };

  return (
    <div className="result-container">
      <h1>Voting Result</h1>
      <div className="result-timer">
        <p>Data will be reset in: {timeLeft} seconds</p>
      </div>
      {winner ? (
        <div className="winner">
          <h2>Winner:</h2>
          <p>{winner.name} ({winner.party}) - Votes: {winner.votes}</p>
        </div>
      ) : (
        <p>No votes were cast.</p>
      )}
    </div>
  );
};

export default Result;
