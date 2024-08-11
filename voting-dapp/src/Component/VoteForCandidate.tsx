import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./voteforcandidate.css";

interface Candidate {
  id: string;
  name: string;
  party: string;
  votes: number;
}

const VoteForCandidate: React.FC = () => {
  // State to hold the list of candidates
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  // State to track if the user has already voted
  const [hasVoted, setHasVoted] = useState(false);

  // State to hold the time remaining for voting
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // State to determine if voting is currently allowed
  const [votingAllowed, setVotingAllowed] = useState(true);

  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Function to initialize the voting timer
  const initializeTimer = () => {
    const startTime = localStorage.getItem("votingStartTime");

    if (startTime) {
      // Calculate time remaining based on stored start time
      const startTimestamp = new Date(startTime).getTime();
      const currentTime = new Date().getTime();
      const duration = 60 * 1000; // 1 minute in milliseconds
      const timeElapsed = currentTime - startTimestamp;
      const timeRemaining = Math.max(duration - timeElapsed, 0);

      setTimeLeft(Math.ceil(timeRemaining / 1000)); // Convert milliseconds to seconds
      setVotingAllowed(timeRemaining > 0);
    } else {
      // Start a new timer if none exists
      const newStartTime = new Date().toISOString();
      localStorage.setItem("votingStartTime", newStartTime);
      setTimeLeft(60); // 1 minute in seconds
      setVotingAllowed(true);
    }
  };

  useEffect(() => {
    initializeTimer(); // Initialize timer when component mounts

    // Set up a countdown interval to update the remaining time
    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime !== null && prevTime > 0) {
          const newTimeLeft = prevTime - 1;
          if (newTimeLeft <= 0) {
            setVotingAllowed(false);
            clearInterval(countdownInterval); // Stop the interval when time is up
            navigate("/result"); // Redirect to results page
            return 0;
          }
          return newTimeLeft;
        }
        return prevTime; // If prevTime is null or <= 0, return it unchanged
      });
    }, 1000);

    return () => {
      clearInterval(countdownInterval); // Clean up the interval on component unmount
    };
  }, [navigate]);

  // Function to handle voting for a candidate
  const handleVote = (candidateId: string) => {
    if (hasVoted) {
      alert("You have already voted!"); // Alert if user has already voted
      return;
    }

    if (!votingAllowed) {
      alert("Voting time has expired!"); // Alert if voting time has expired
      return;
    }

    // Simulate the voting process
    alert(`Thank you for voting for candidate ${candidateId}!`);
    setHasVoted(true); // Update state to reflect that the user has voted
  };

  return (
    <div className="vote-container">
      <h1>Vote for Candidate</h1>
      <div className="timer">
        <p>
          Time remaining to vote:{" "}
          {timeLeft !== null ? `${timeLeft} seconds` : "Loading..."} {/* Display remaining time */}
        </p>
      </div>
      <ul className="candidates-list">
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            <p>
              {candidate.name} ({candidate.party}) - Votes: {candidate.votes}
            </p>
            <button
              onClick={() => handleVote(candidate.id)} // Handle vote button click
              disabled={hasVoted || !votingAllowed} // Disable button if user has voted or voting is not allowed
            >
              Vote
            </button>
          </li>
        ))}
      </ul>
      {!votingAllowed && (
        <button onClick={() => initializeTimer()} className="reset-button">
          Reset Voting Timer
        </button> // Button to reset the voting timer
      )}
    </div>
  );
};

export default VoteForCandidate;
