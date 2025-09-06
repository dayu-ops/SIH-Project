import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { addCertificate } from '../apiService';

const PortalPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Login/Register form states
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    institutionName: '', 
    email: '', 
    password: '' 
  });
  
  // Certificate form state
  const [certificateForm, setCertificateForm] = useState({
    studentName: '',
    rollNumber: '',
    courseName: '',
    grade: '',
    issueDate: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email/password
      if (loginForm.email && loginForm.password) {
        setIsLoggedIn(true);
        setMessage({ type: 'success', text: 'Login successful!' });
      } else {
        setMessage({ type: 'error', text: 'Please enter email and password' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Simulate register API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (registerForm.institutionName && registerForm.email && registerForm.password) {
        setMessage({ type: 'success', text: 'Registration successful! Please login.' });
        setActiveTab('login');
        setRegisterForm({ institutionName: '', email: '', password: '' });
      } else {
        setMessage({ type: 'error', text: 'Please fill all fields' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCertificate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Call the actual API
      await addCertificate(certificateForm);
      setMessage({ type: 'success', text: 'Certificate added successfully to database and blockchain!' });
      setCertificateForm({
        studentName: '',
        rollNumber: '',
        courseName: '',
        grade: '',
        issueDate: ''
      });
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to add certificate. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMessage({ type: '', text: '' });
    setCertificateForm({
      studentName: '',
      rollNumber: '',
      courseName: '',
      grade: '',
      issueDate: ''
    });
  };

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-4">
              Institution Portal
            </h1>
            <p className="text-xl text-gray-600">
              {isLoggedIn 
                ? 'Manage and add new certificate records to the blockchain'
                : 'Access your institution dashboard to manage certificates'
              }
            </p>
          </div>

          <div className="card">
            {!isLoggedIn ? (
              /* Login/Register Tabs */
              <div>
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200 mb-8">
                  <button
                    onClick={() => setActiveTab('login')}
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'login'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setActiveTab('register')}
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'register'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Register
                  </button>
                </div>

                {/* Message Display */}
                {message.text && (
                  <div className={`mb-6 p-4 rounded-lg ${
                    message.type === 'success' 
                      ? 'bg-secondary-50 text-secondary-700 border border-secondary-200'
                      : 'bg-accent-50 text-accent-700 border border-accent-200'
                  }`}>
                    {message.text}
                  </div>
                )}

                {/* Login Form */}
                {activeTab === 'login' && (
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                      <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="login-email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="institution@example.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        id="login-password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                  </form>
                )}

                {/* Register Form */}
                {activeTab === 'register' && (
                  <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                      <label htmlFor="register-institution" className="block text-sm font-medium text-gray-700 mb-2">
                        Institution Name
                      </label>
                      <input
                        type="text"
                        id="register-institution"
                        value={registerForm.institutionName}
                        onChange={(e) => setRegisterForm({ ...registerForm, institutionName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="Jharkhand University"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="register-email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="institution@example.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        id="register-password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="Create a strong password"
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Registering...' : 'Register Institution'}
                    </button>
                  </form>
                )}
              </div>
            ) : (
              /* Dashboard - Add Certificate Form */
              <div>
                {/* Header with Logout */}
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-heading font-bold text-dark">
                    Add New Certificate Record
                  </h2>
                  <button
                    onClick={handleLogout}
                    className="text-accent-500 hover:text-accent-600 font-medium flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>

                {/* Message Display */}
                {message.text && (
                  <div className={`mb-6 p-4 rounded-lg ${
                    message.type === 'success' 
                      ? 'bg-secondary-50 text-secondary-700 border border-secondary-200'
                      : 'bg-accent-50 text-accent-700 border border-accent-200'
                  }`}>
                    {message.text}
                  </div>
                )}

                {/* Certificate Form */}
                <form onSubmit={handleAddCertificate} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="student-name" className="block text-sm font-medium text-gray-700 mb-2">
                        Student Name *
                      </label>
                      <input
                        type="text"
                        id="student-name"
                        value={certificateForm.studentName}
                        onChange={(e) => setCertificateForm({ ...certificateForm, studentName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="roll-number" className="block text-sm font-medium text-gray-700 mb-2">
                        Roll Number *
                      </label>
                      <input
                        type="text"
                        id="roll-number"
                        value={certificateForm.rollNumber}
                        onChange={(e) => setCertificateForm({ ...certificateForm, rollNumber: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="2021001"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="course-name" className="block text-sm font-medium text-gray-700 mb-2">
                        Course Name *
                      </label>
                      <input
                        type="text"
                        id="course-name"
                        value={certificateForm.courseName}
                        onChange={(e) => setCertificateForm({ ...certificateForm, courseName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="Bachelor of Technology"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                        Grade *
                      </label>
                      <select
                        id="grade"
                        value={certificateForm.grade}
                        onChange={(e) => setCertificateForm({ ...certificateForm, grade: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        required
                      >
                        <option value="">Select Grade</option>
                        <option value="A+">A+</option>
                        <option value="A">A</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                        <option value="C+">C+</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="issue-date" className="block text-sm font-medium text-gray-700 mb-2">
                        Issue Date *
                      </label>
                      <input
                        type="date"
                        id="issue-date"
                        value={certificateForm.issueDate}
                        onChange={(e) => setCertificateForm({ ...certificateForm, issueDate: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-primary-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm text-primary-700">
                          <strong>Note:</strong> This will add the certificate record to both the database and the blockchain. 
                          The transaction will be permanently recorded and cannot be modified.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Adding to Database & Blockchain...' : 'Add Record to Database & Blockchain'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalPage;
