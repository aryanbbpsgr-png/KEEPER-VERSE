import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Mail, 
  User, 
  LogIn, 
  UserCheck, 
  Sparkles, 
  ArrowRight, 
  Briefcase, 
  ArrowLeft,
  CheckCircle2,
  Award,
  Flame,
  Target
} from 'lucide-react';
import { playUiClick, playSaveSound } from '../utils/audio';

export function LoginPage({ currentUser, onLogin, onLogout, onReturnToApp }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Goalkeeper');

  const handleSubmit = (e) => {
    e.preventDefault();
    playSaveSound();

    const userData = {
      name: name.trim() || (authMode === 'login' ? email.split('@')[0] || 'Goalkeeper Pro' : 'New Goalkeeper'),
      email: email.trim() || 'keeper@keeperverse.com',
      role: role,
      avatar: '/keeperverse-logo.png',
      loggedInAt: new Date().toISOString()
    };

    onLogin(userData);
    onReturnToApp();
  };

  const handleQuickDemo = (demoRole, demoName) => {
    playSaveSound();
    const demoUser = {
      name: demoName,
      email: `${demoName.toLowerCase().replace(' ', '.')}@keeperverse.com`,
      role: demoRole,
      avatar: '/keeperverse-logo.png',
      loggedInAt: new Date().toISOString()
    };
    onLogin(demoUser);
    onReturnToApp();
  };

  return (
    <div className="login-page-screen animate-fade-in">
      <div className="login-page-container">
        {/* Top Back Navigation */}
        <div className="login-top-bar">
          <button className="btn btn-secondary btn-sm" onClick={onReturnToApp}>
            <ArrowLeft size={14} /> Return to KeeperVerse Portal
          </button>
        </div>

        {/* Dual Column Layout */}
        <div className="login-dual-grid glass-panel">
          {/* Left Column: Visual Brand & Clean Sunset Goalpost Banner */}
          <div className="login-showcase-col">
            <div className="showcase-bg-img-wrap">
              <img src="/sunset-goalpost.jpg" alt="Sunset Football Goalpost" className="showcase-bg-img" />
              <div className="showcase-gradient-overlay" />
            </div>

            <div className="showcase-content-box">
              <div className="brand-group mb-3">
                <div className="brand-logo-img-box-lg">
                  <img src="/keeperverse-logo.png" alt="KeeperVerse Logo" className="brand-logo-image" />
                </div>
                <div>
                  <div className="brand-title text-white">
                    KEEPER<span className="accent-text text-neon-gold">VERSE</span>
                  </div>
                  <div className="brand-subline text-slate-200">
                    <span className="pulse-dot"></span>
                    THE GOALKEEPER TELEMETRY HUB
                  </div>
                </div>
              </div>

              <h2 className="showcase-heading text-white">
                The Dedicated Performance Intelligence System Built For Goalkeepers.
              </h2>
              <p className="showcase-desc text-slate-200">
                Elevate your goalkeeping evaluation beyond "goals conceded". Analyze shot-stopping geometry with 9-zone goal matrices, track Post-Shot Expected Goals (PSxG), and benchmark against Top 5 European League goalkeepers.
              </p>

              <div className="showcase-feature-list text-white">
                <div className="showcase-feat-item">
                  <CheckCircle2 size={16} className="text-neon-gold" />
                  <span>Opta & FBref European Top 5 League Goalkeeper Benchmarks</span>
                </div>
                <div className="showcase-feat-item">
                  <CheckCircle2 size={16} className="text-neon-gold" />
                  <span>Interactive 9-Zone Goal Face Matrix & Shot Velocities</span>
                </div>
                <div className="showcase-feat-item">
                  <CheckCircle2 size={16} className="text-neon-gold" />
                  <span>Manual Data Studio with Real-Time Graphical Computation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Authentication Form / User Profile */}
          <div className="login-form-col">
            {currentUser ? (
              /* Signed In Profile State */
              <div className="logged-in-panel animate-fade-in">
                <div className="profile-shield-icon mx-auto mb-3">
                  <img src="/keeperverse-logo.png" alt="Avatar" className="w-16 h-16 rounded-full mx-auto shadow-md" />
                </div>
                <h3 className="auth-form-title text-center">User Session Active</h3>
                <p className="auth-form-subtitle text-center mb-4">
                  Welcome back, <strong className="text-slate-900">{currentUser.name}</strong>
                </p>

                <div className="session-data-card glass-card mb-4">
                  <div className="session-row">
                    <span className="mono text-xs text-muted">USER NAME:</span>
                    <strong className="text-slate-900 text-sm">{currentUser.name}</strong>
                  </div>
                  <div className="session-row mt-2">
                    <span className="mono text-xs text-muted">ACCOUNT ROLE:</span>
                    <span className="badge badge-gold">{currentUser.role}</span>
                  </div>
                  <div className="session-row mt-2">
                    <span className="mono text-xs text-muted">EMAIL:</span>
                    <span className="mono text-xs text-secondary">{currentUser.email}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button className="btn btn-primary w-full py-3" onClick={onReturnToApp}>
                    Enter KeeperVerse Dashboard <ArrowRight size={16} />
                  </button>
                  <button 
                    className="btn btn-danger w-full py-2"
                    onClick={() => {
                      playUiClick();
                      onLogout();
                    }}
                  >
                    <LogIn size={15} /> Sign Out of Account
                  </button>
                </div>
              </div>
            ) : (
              /* Sign In / Sign Up Form */
              <div className="auth-form-wrapper">
                <div className="auth-head-box mb-4">
                  <h3 className="auth-form-title">
                    {authMode === 'login' ? 'Sign In to Your Account' : 'Register Free Account'}
                  </h3>
                  <p className="auth-form-subtitle">
                    Access your goalkeeper profile, telemetry logs, and drill trackers
                  </p>
                </div>

                {/* Switcher */}
                <div className="auth-mode-switch mb-4">
                  <button
                    type="button"
                    className={`switch-btn ${authMode === 'login' ? 'active' : ''}`}
                    onClick={() => { playUiClick(); setAuthMode('login'); }}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    className={`switch-btn ${authMode === 'register' ? 'active' : ''}`}
                    onClick={() => { playUiClick(); setAuthMode('register'); }}
                  >
                    Create Account
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="auth-fields-stack">
                  {authMode === 'register' && (
                    <>
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <div className="input-with-icon">
                          <User size={16} className="field-icon" />
                          <input 
                            type="text" 
                            className="form-input with-pad" 
                            placeholder="e.g. Manuel Neuer" 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                            required 
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Role in Football</label>
                        <select 
                          className="form-select" 
                          value={role} 
                          onChange={e => setRole(e.target.value)}
                        >
                          <option value="Goalkeeper">Goalkeeper (Player)</option>
                          <option value="Goalkeeper Coach">Goalkeeper Coach</option>
                          <option value="Academy Scout">Academy Scout / Recruiter</option>
                          <option value="Team Data Analyst">Team Analyst</option>
                        </select>
                      </div>
                    </>
                  )}

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <div className="input-with-icon">
                      <Mail size={16} className="field-icon" />
                      <input 
                        type="email" 
                        className="form-input with-pad" 
                        placeholder="keeper@keeperverse.com" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <div className="input-with-icon">
                      <Lock size={16} className="field-icon" />
                      <input 
                        type="password" 
                        className="form-input with-pad" 
                        placeholder="••••••••••••" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-full py-3 mt-2 font-bold">
                    <LogIn size={16} /> {authMode === 'login' ? 'Sign In to Portal' : 'Create Free Account'}
                  </button>
                </form>

                {/* 1-Click Demo Login Options */}
                <div className="quick-demo-personas mt-4">
                  <span className="mono text-xs text-muted text-center block mb-2">OR ONE-CLICK DEMO ACCESS:</span>
                  <div className="demo-btns-grid">
                    <button 
                      type="button" 
                      className="demo-persona-btn"
                      onClick={() => handleQuickDemo('Goalkeeper Coach', 'Coach Jurgen')}
                    >
                      <Briefcase size={14} className="text-neon-gold" />
                      <span>Coach Jurgen</span>
                    </button>
                    <button 
                      type="button" 
                      className="demo-persona-btn"
                      onClick={() => handleQuickDemo('Academy Scout', 'Scout Matteo')}
                    >
                      <UserCheck size={14} className="text-neon-cyan" />
                      <span>Scout Matteo</span>
                    </button>
                    <button 
                      type="button" 
                      className="demo-persona-btn"
                      onClick={() => handleQuickDemo('Goalkeeper', 'Alisson Becker')}
                    >
                      <Shield size={14} className="text-neon-green" />
                      <span>Alisson (GK)</span>
                    </button>
                  </div>
                </div>

                {/* Quick Guest Access */}
                <div className="guest-access-bar mt-3 text-center">
                  <button 
                    type="button" 
                    className="guest-link-btn text-xs text-secondary hover:text-slate-900"
                    onClick={onReturnToApp}
                  >
                    Continue as Guest Explorer →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
