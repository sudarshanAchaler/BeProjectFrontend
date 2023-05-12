import { useSignup } from "@/hooks/useSignUp";
import { useState } from "react";

const signup = () => {
  const genders = ["male", "female", "other"];

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState(genders[0]);
  const [mobile, setMobile] = useState("");

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username,email,password,firstName,lastName,birthDate,gender,mobile)
  };

  return (
    <form className="signup text-center shadow" onSubmit={handleSubmit}>
      <h2 className="fw-bold text-xl mb-4">Signup</h2>
      <div className="container-md">
      <div className="row text-start">
        <div className="col-md-6">
          <label>Email address:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <label>Username:</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />

          <label>First name:</label>
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />

          <label>Last Name:</label>
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
        <div className="col-md-6">
          <label>Birth Date:</label>
          <input
            type="date"
            onChange={(e) => setBirthDate(e.target.value)}
            value={birthDate}
          />
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            {genders.map((value) => (
              <option value={value} key={value}>
                {value}{" "}
              </option>
            ))}{" "}
          </select>
          <label>Mobile:</label>
          <input
            type="tel"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
          />
        </div>
      </div>
      <div className="row text-center">
        <button className="btn btn-dark btn-lg fw-bold" disabled={isLoading}>Signup</button>
      </div>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default signup;
