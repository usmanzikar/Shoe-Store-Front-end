import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; 

function InputField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onFocus,
  onBlur,
  isFocused,
  required = false,
  errorMessage = '',
}) {
  return (
    <div className="relative w-full mb-6">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => onFocus(name)}
        onBlur={() => onBlur(name)}
        className={`peer w-full border-b-2 border-gray-300 focus:border-orange-500 outline-none bg-transparent py-2 text-gray-900 placeholder-transparent
          ${errorMessage ? 'border-red-500' : ''}
        `}
        placeholder={label}
        autoComplete={name === 'password' ? 'current-password' : 'off'}
        required={required}
      />
      <label
        htmlFor={name}
        className={`
          absolute left-0 top-2 text-gray-500 text-sm cursor-text
          transition-all duration-300 ease-in-out
          peer-placeholder-shown:top-2 peer-placeholder-shown:left-0 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
          ${isFocused || value ? 'top-[-0.75rem] left-0 text-orange-500 text-xs' : ''}
        `}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {errorMessage && (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
      )}
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ from AuthContext

  const [form, setForm] = useState({ email: '', password: '' });
  const [focused, setFocused] = useState({ email: false, password: false });
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const onFocus = (field) => setFocused(prev => ({ ...prev, [field]: true }));
  const onBlur = (field) => { if (!form[field]) setFocused(prev => ({ ...prev, [field]: false })); };

  const onSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!form.email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!validateEmail(form.email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!form.password) {
      setPassError('Password is required');
      valid = false;
    } else {
      setPassError('');
    }

    if (!valid) return;

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email: form.email,
        password: form.password
      });

      // ✅ Save token and user in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Update AuthContext immediately (Triggers Navbar update)
      login(res.data.user);

      alert("Login successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center px-4 pt-16 border-t-4 border-green-500">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8 border border-orange-500">
          <h2 className="text-3xl font-semibold mb-6 text-center text-orange-600">Login</h2>
          <form onSubmit={onSubmit} noValidate>
            <InputField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              isFocused={focused.email}
              required
              errorMessage={emailError}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              isFocused={focused.password}
              required
              errorMessage={passError}
            />

            <div className="flex justify-end mb-4 text-sm text-orange-600 hover:underline cursor-pointer">
              <button
                type="button"
                onClick={() => alert('Forgot password flow (not implemented)')}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-semibold transition-colors"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <button
            type="button"
            className="mt-5 w-full flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-xl" />
            Login with Google
          </button>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-orange-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
