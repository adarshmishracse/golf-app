import { useState } from "react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

 return (
  <div className="flex items-center justify-center h-screen">
    <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-80">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

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
        onClick={handleLogin}
        className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded"
      >
        Login
      </button>
      <p className="text-sm mt-4 text-center">
  New user?
  <a
    href="/signup"
    className="text-purple-400 ml-1 hover:underline"
  >
    Create account
  </a>
</p>
    </div>
  </div>
);
}