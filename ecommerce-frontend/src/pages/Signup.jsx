import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../store/authSlice';
import { Eye, EyeOff, ShoppingBag } from 'lucide-react';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    dispatch(signup({ name: form.name, email: form.email }));
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-10 px-4">

      {/* Logo */}
      <Link to="/" className="flex items-center mb-6">
        <ShoppingBag className="w-8 h-8 text-amazon-orange mr-2" />
        <span className="text-3xl font-bold text-amazon">E-Shop</span>
        <span className="text-amazon-orange font-bold text-xl ml-0.5">.in</span>
      </Link>

      {/* Card */}
      <div className="bg-white rounded-lg border border-gray-300 shadow-sm w-full max-w-sm p-6">
        <h1 className="text-2xl font-medium text-gray-900 mb-4">Create account</h1>

        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 rounded px-4 py-2 mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">Your name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amazon-orange focus:border-amazon-orange"
              placeholder="First and last name"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">Email address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amazon-orange focus:border-amazon-orange"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amazon-orange focus:border-amazon-orange"
                placeholder="At least 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Passwords must be at least 6 characters.</p>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">Re-enter password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amazon-orange focus:border-amazon-orange"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black font-semibold py-2 px-4 rounded text-sm border border-[#FCD200] transition-colors"
          >
            Create your E-Shop account
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4">
          By creating an account, you agree to E-Shop's{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">Conditions of Use</span> and{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">Privacy Notice</span>.
        </p>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Already have an account?</span>
          </div>
        </div>

        <Link to="/login">
          <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded text-sm border border-gray-300 transition-colors">
            Sign in
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
