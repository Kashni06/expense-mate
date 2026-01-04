import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AUTH_KEY = "expensemate_user";

export default function Auth() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleAuth = () => {
    if (!email || !password) return;

    if (isSignup) {
      if (!name || password !== confirm) return;

      // Save user (mock DB)
      localStorage.setItem(AUTH_KEY, JSON.stringify({ name, email }));
    } else {
      // Login (mock check)
      const stored = localStorage.getItem(AUTH_KEY);
      if (!stored) return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="grid md:grid-cols-2 gap-12 max-w-4xl w-full px-6">
        {/* LEFT CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mb-4">
            EM
          </div>

          <h2 className="text-2xl font-bold mb-2">
            {isSignup ? "Create your account" : "Welcome back"}
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            {isSignup
              ? "Sign up to start using ExpenseMate"
              : "Sign in to continue to ExpenseMate"}
          </p>

          {isSignup && (
            <input
              className="input mb-3"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            className="input mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="input mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {isSignup && (
            <input
              type="password"
              className="input mb-4"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          )}

          <button
            onClick={handleAuth}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium"
          >
            {isSignup ? "Sign up" : "Sign in"}
          </button>

          <p
            className="text-sm text-center mt-4 text-purple-600 cursor-pointer"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Or sign in" : "Don't have an account? Sign up"}
          </p>
        </div>

        {/* RIGHT INFO CARD */}
        <div className="hidden md:flex bg-white rounded-2xl shadow-xl p-8 items-center justify-center text-center">
          <div>
            <h3 className="text-xl font-semibold mb-3">
              Secure. Fast. Friendly.
            </h3>
            <p className="text-gray-500 leading-relaxed">
              Use ExpenseMate to manage shared expenses with friends. Upload
              bills, split items, and export reports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
