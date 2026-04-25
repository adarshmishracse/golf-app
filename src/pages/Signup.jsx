import { useState } from "react";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleSignup = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Signup successful");

    navigate("/dashboard");   // ✅ redirect after signup

  } catch (err) {
    alert(err.message);
  }
};

 return (
  <div className="flex items-center justify-center h-screen">
    <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-80">
      <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

      <input
        className="w-full p-2 mb-3 rounded bg-black/40"
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        className="w-full p-2 mb-4 rounded bg-black/40"
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button
        onClick={handleSignup}
        className="w-full bg-purple-600 p-2 rounded"
      >
        Create Account
      </button>
    </div>
  </div>
);
}