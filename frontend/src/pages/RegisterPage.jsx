import React, { useState, useEffect } from 'react';
import { CheckCircle2, Eye, EyeOff, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RecommendedSearches from '../components/RecommendedSearches';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Password strength checker
  const checkPasswordStrength = (password) => {
    if (!password) return { score: 0, feedback: '' };

    let score = 0;
    const feedback = [];

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) {
      return { score, feedback: 'Weak - Add uppercase, numbers, or symbols' };
    } else if (score <= 4) {
      return { score, feedback: 'Good - Consider adding more complexity' };
    } else {
      return { score, feedback: 'Strong - Great password!' };
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));

    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo(0, 0);
    }, 1500);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 2) return 'bg-red-500';
    if (passwordStrength.score <= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  if (isSuccess) {
    return (
      <div className="pt-32 pb-20 px-6 md:px-12 bg-gradient-to-b from-white to-[#F5F1EB]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[#C8A96A]/20 blur-xl rounded-full"></div>
                <CheckCircle2 className="w-20 h-20 text-[#C8A96A] relative" />
              </div>
            </div>
            <h2 className="text-4xl font-serif font-bold text-[#0B0B0B] mb-4">Welcome to Vikash!</h2>
            <p className="text-lg text-[#6B6B6B] mb-2">
              Your account has been created successfully.
            </p>
            <p className="text-[#6B6B6B] mb-8">
              We've sent a confirmation email to <span className="font-medium text-[#0B0B0B]">{formData.email}</span>
            </p>

            <div className="bg-white border border-[#E8E1D9] rounded-lg p-8 mb-8 shadow-sm">
              <div className="space-y-4 text-left mb-6">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#C8A96A]" />
                  <span className="text-[#6B6B6B]">Save your favorite properties</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#C8A96A]" />
                  <span className="text-[#6B6B6B]">Receive property alerts</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#C8A96A]" />
                  <span className="text-[#6B6B6B]">Access exclusive deals</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#C8A96A]" />
                  <span className="text-[#6B6B6B]">Connect with agents</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate('/')}
                className="block w-full px-8 py-3 bg-[#C8A96A] text-white font-medium uppercase tracking-wider rounded-lg hover:bg-[#B8955A] transition-all duration-300"
              >
                Start Exploring
              </button>
              <button
                onClick={() => navigate('/plots')}
                className="block w-full px-8 py-3 border-2 border-[#C8A96A] text-[#C8A96A] font-medium uppercase tracking-wider rounded-lg hover:bg-[#F5F1EB] transition-all duration-300"
              >
                Browse Properties
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6 md:px-12 bg-gradient-to-b from-[#F5F1EB] to-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#0B0B0B] mb-6 leading-tight">
            Create Your Account
          </h1>
          <p className="text-xl text-[#6B6B6B] font-light max-w-2xl">
            Join thousands of buyers and sellers who trust Vikash for their real estate journey. Create an account to save properties, receive alerts, and connect with our agents.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-6 md:px-12 bg-[#F5F1EB]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#C8A96A] text-white rounded-lg flex items-center justify-center">
                ❤️
              </div>
              <div>
                <h4 className="font-medium text-[#0B0B0B] mb-1">Save Listings</h4>
                <p className="text-sm text-[#6B6B6B]">Bookmark your favorite properties</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#C8A96A] text-white rounded-lg flex items-center justify-center">
                🔔
              </div>
              <div>
                <h4 className="font-medium text-[#0B0B0B] mb-1">Get Alerts</h4>
                <p className="text-sm text-[#6B6B6B]">Never miss new listings</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#C8A96A] text-white rounded-lg flex items-center justify-center">
                ⭐
              </div>
              <div>
                <h4 className="font-medium text-[#0B0B0B] mb-1">Exclusive Access</h4>
                <p className="text-sm text-[#6B6B6B]">Special deals for members</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#C8A96A] text-white rounded-lg flex items-center justify-center">
                👥
              </div>
              <div>
                <h4 className="font-medium text-[#0B0B0B] mb-1">Expert Support</h4>
                <p className="text-sm text-[#6B6B6B]">Connect with our agents</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-2xl mx-auto">
          {/* Error Summary */}
          {Object.keys(errors).length > 0 && (
            <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 font-medium mb-3">Please correct the following errors:</p>
              <ul className="list-disc list-inside space-y-1 text-red-600">
                {Object.values(errors).map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-[#0B0B0B] mb-3 uppercase tracking-widest">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('firstName')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-0 py-3 border-b-2 bg-transparent text-[#0B0B0B] placeholder-[#BFBFBF] focus:outline-none transition-all ${
                    errors.firstName
                      ? 'border-red-500 focus:border-red-500'
                      : focusedField === 'firstName'
                      ? 'border-[#C8A96A]'
                      : 'border-[#E8E1D9]'
                  }`}
                  placeholder="John"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-2">{errors.firstName}</p>}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-[#0B0B0B] mb-3 uppercase tracking-widest">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('lastName')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-0 py-3 border-b-2 bg-transparent text-[#0B0B0B] placeholder-[#BFBFBF] focus:outline-none transition-all ${
                    errors.lastName
                      ? 'border-red-500 focus:border-red-500'
                      : focusedField === 'lastName'
                      ? 'border-[#C8A96A]'
                      : 'border-[#E8E1D9]'
                  }`}
                  placeholder="Doe"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-2">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#0B0B0B] mb-3 uppercase tracking-widest">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-0 py-3 border-b-2 bg-transparent text-[#0B0B0B] placeholder-[#BFBFBF] focus:outline-none transition-all ${
                  errors.email
                    ? 'border-red-500 focus:border-red-500'
                    : focusedField === 'email'
                    ? 'border-[#C8A96A]'
                    : 'border-[#E8E1D9]'
                }`}
                placeholder="john.doe@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-[#0B0B0B] mb-3 uppercase tracking-widest">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-0 py-3 border-b-2 bg-transparent text-[#0B0B0B] placeholder-[#BFBFBF] focus:outline-none transition-all ${
                  errors.phone
                    ? 'border-red-500 focus:border-red-500'
                    : focusedField === 'phone'
                    ? 'border-[#C8A96A]'
                    : 'border-[#E8E1D9]'
                }`}
                placeholder="+91 98765 43210"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#0B0B0B] mb-3 uppercase tracking-widest">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-0 py-3 border-b-2 bg-transparent text-[#0B0B0B] placeholder-[#BFBFBF] focus:outline-none transition-all pr-10 ${
                    errors.password
                      ? 'border-red-500 focus:border-red-500'
                      : focusedField === 'password'
                      ? 'border-[#C8A96A]'
                      : 'border-[#E8E1D9]'
                  }`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#0B0B0B] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}

              {/* Password Strength */}
              {formData.password && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium text-[#6B6B6B]">Password Strength</p>
                    <p className={`text-xs font-medium ${
                      passwordStrength.score <= 2 ? 'text-red-500' :
                      passwordStrength.score <= 4 ? 'text-yellow-500' : 'text-green-500'
                    }`}>
                      {passwordStrength.feedback}
                    </p>
                  </div>
                  <div className="h-1 bg-[#E8E1D9] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${getPasswordStrengthColor()}`}
                      style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-[#0B0B0B] mb-3 uppercase tracking-widest">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-0 py-3 border-b-2 bg-transparent text-[#0B0B0B] placeholder-[#BFBFBF] focus:outline-none transition-all pr-10 ${
                    errors.confirmPassword
                      ? 'border-red-500 focus:border-red-500'
                      : focusedField === 'confirmPassword'
                      ? 'border-[#C8A96A]'
                      : 'border-[#E8E1D9]'
                  }`}
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#0B0B0B] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>}
            </div>

            {/* T&C Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 w-4 h-4 accent-[#C8A96A] cursor-pointer rounded"
              />
              <label htmlFor="terms" className="text-[#6B6B6B] text-sm cursor-pointer">
                I agree to the <a href="#" className="text-[#C8A96A] hover:underline">Terms & Conditions</a> and <a href="#" className="text-[#C8A96A] hover:underline">Privacy Policy</a>
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#C8A96A] text-white font-medium uppercase tracking-widest rounded-lg hover:bg-[#B8955A] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-[#E8E1D9]">
              <p className="text-[#6B6B6B]">
                Already have an account?{' '}
                <a href="/login" className="text-[#C8A96A] font-medium hover:underline">
                  Login here
                </a>
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Recommended Searches */}
      <RecommendedSearches />
    </div>
  );
};

export default RegisterPage;
