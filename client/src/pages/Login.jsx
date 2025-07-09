import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, username, password);
      // Redirect or update UI on successful login
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFacebookLogin = async () => {
    setError(null);
    const provider = new (await import('firebase/auth')).FacebookAuthProvider();
    try {
      await (await import('firebase/auth')).signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white text-white flex flex-col space-y-6 w-full max-w-screen-xl mx-auto p-20">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded shadow-md w-full max-w-md mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{' '}
            <a href="/register" className="text-pink-400 hover:underline">
              Register here
            </a>
          </p>
        </div>
        <div className="mt-4 space-y-2">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Login with Google
          </button>
          <button
            type="button"
            onClick={handleFacebookLogin}
            className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
          >
            Login with Facebook
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
