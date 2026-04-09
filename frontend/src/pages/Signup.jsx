import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      const res = await API.post("/auth/signup", {
        name,
        email,
        password
      });

      console.log("Signup response:", res.data);

      alert("Signup Successful ✅");

      navigate("/login");

    } catch (err) {

      console.error("Signup error:", err.response?.data || err.message);

      alert(
        err.response?.data?.message ||
        "Signup failed. Please try again."
      );

    }

  };

  return (

    <div>

      <h2>Signup</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button onClick={handleSignup}>
        Signup
      </button>

    </div>

  );
}