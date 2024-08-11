import React, { useState } from "react";
// import { db } from "./firebase"; // Ensure this imports your configured Firestore
// import { collection, addDoc } from "firebase/firestore";
import "./RegisterCandidate.css";

const RegisterCandidate: React.FC = () => {
  // State variables for form fields and error handling
  const [name, setName] = useState(""); // Candidate's name
  const [party, setParty] = useState(""); // Candidate's party
  const [fatherName, setFatherName] = useState(""); // Candidate's father's name
  const [address, setAddress] = useState(""); // Candidate's home address
  const [phone, setPhone] = useState(""); // Candidate's phone number
  const [error, setError] = useState<string | null>(null); // Error message
  const [loading, setLoading] = useState(false); // Loading state for form submission

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Basic validation for phone number (must be numeric)
    if (!/^\d+$/.test(phone)) {
      setError("Phone number must be numeric."); // Set error if phone number is not numeric
      return; // Exit function if validation fails
    }

    setLoading(true); // Set loading state to true
    setError(null); // Clear any previous errors

    try {
      // Placeholder for adding candidate to the backend (e.g., Firestore)
      // const candidatesCollectionRef = collection(db, "candidates");
      // await addDoc(candidatesCollectionRef, {
      //   name,
      //   party,
      //   fatherName,
      //   address,
      //   phone,
      //   votes: 0, // Set initial vote count to 0
      // });

      alert("Candidate registered successfully!"); // Alert on successful registration

      // Clear form fields after successful registration
      setName("");
      setParty("");
      setFatherName("");
      setAddress("");
      setPhone("");
    } catch (err) {
      console.error("Error:", err); // Log error to console
      setError("An error occurred while registering the candidate. Please try again."); // Set error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="candidate-form-container">
      <h1>Register Candidate</h1>
      <form onSubmit={handleSubmit}>
        {/* Input field for candidate's name */}
        <div className="input-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Input field for candidate's party */}
        <div className="input-field">
          <label htmlFor="party">Party</label>
          <input
            id="party"
            type="text"
            value={party}
            onChange={(e) => setParty(e.target.value)}
            required
          />
        </div>

        {/* Input field for candidate's father's name */}
        <div className="input-field">
          <label htmlFor="fatherName">Father's Name</label>
          <input
            id="fatherName"
            type="text"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            required
          />
        </div>

        {/* Textarea for candidate's home address */}
        <div className="input-field">
          <label htmlFor="address">Home Address</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Input field for candidate's phone number */}
        <div className="input-field">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {/* Display error message if there is an error */}
        {error && <p className="error">{error}</p>}

        {/* Submit button for the form */}
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Registering..." : "Register"} {/* Change button text based on loading state */}
        </button>
      </form>
    </div>
  );
};

export default RegisterCandidate;
