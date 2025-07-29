import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const specialChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?";

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
        autoComplete={name === 'password' ? 'new-password' : 'off'}
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

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [passErrors, setPassErrors] = useState([]);
  const [emailError, setEmailError] = useState('');
  const [passRequiredError, setPassRequiredError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pw = form.password;
    const errors = [];

    if (pw.length < 8) errors.push('At least 8 characters');
    if (!/[A-Z]/.test(pw)) errors.push('Must include a capital letter');
    if (!/[0-9]/.test(pw)) errors.push('Must include a number');
    if (!new RegExp('[' + specialChars.split('').map(c => '\\' + c).join('') + ']').test(pw))
      errors.push('Must include a special character');

    setPassErrors(errors);
    if (pw === '') setPassRequiredError('Password is required');
    else setPassRequiredError('');
  }, [form.password]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const onFocus = (field) => setFocused(prev => ({ ...prev, [field]: true }));

  const onBlur = (field) => {
    if (!form[field]) {
      setFocused(prev => ({ ...prev, [field]: false }));
    }
  };

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
      setPassRequiredError('Password is required');
      valid = false;
    }

    if (passErrors.length > 0) valid = false;
    if (!valid) return;

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/users/signup", {
        name: form.name,
        email: form.email,
        password: form.password
      });
      alert(res.data.message || "Signup successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-8 mt-20">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
          <h2 className="text-3xl font-semibold mb-6 text-center text-orange-600">
            Create an Account
          </h2>
          <form onSubmit={onSubmit} noValidate>
            <InputField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              isFocused={focused.name}
              required
            />
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
              errorMessage={passRequiredError}
            />
            {form.password && passErrors.length > 0 && (
              <ul className="mb-4 text-red-600 text-sm list-disc list-inside space-y-1">
                {passErrors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            )}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-semibold transition-colors"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
          <button
            type="button"
            className="mt-5 w-full flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-xl" />
            Sign up with Google
          </button>
          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-orange-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
