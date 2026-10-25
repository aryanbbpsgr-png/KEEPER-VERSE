import React, { useState } from 'react';
import { 
  X, 
  Shield, 
  Lock, 
  Mail, 
  User, 
  LogIn, 
  UserCheck, 
  Sparkles,
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { playUiClick, playSaveSound } from '../utils/audio';

export function AuthModal({ isOpen, onClose, currentUser, onLogin, onLogout }) {
  if (!isOpen) return null;

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Goalkeeper');

  const handleSubmit = (e) => {
    e.preventDefault();
    playSaveSound();

    const userData = {
      name: name || (authMode === 'login' ? email.split('@')[0] || 'Keeper User' : 'New Keeper'),
      email: email || 'keeper@keeperverse.com',
      role: role,
      avatar: '/keeper-avatar.jpg',
      loggedInAt: new Date().toISOString()
    };

    onLogin(userData);
    onClose();
  };

  const handleQuickDemoLogin = (demoRole, demoName) => {
    playSaveSound();
    const demoUser = {
      name: demoName,
      email: `${demoName.toLowerCase().replace(' ', '.')}@keeperverse.com`,
      role: demoRole,
      avatar: '/keeper-avatar.jpg',
      loggedInAt: new Date().toISOString()
    };
    onLogin(demoUser);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auth-modal-box" onClick={e => e.stopPropagation()}>
        {/* Close Button */}
        <button className="icon-close-btn auth-close" onClick={onClose}>
          <X size={20} />
        </button>

        {currentUser ? (
          /* Profile & Logout View */
          <div className="auth-profile-card">
            <div className="brand-icon-wrapper mx-auto mb-3">
              <Shield size={28} className="text-neon-green" />
            </div>
            <h2 className="auth-title text-center">User Session Active</h2>
            <p className="text-center text-secondary text-sm mb-4">
              Signed in as <strong className="text-white">{currentUser.name}</strong> ({currentUser.email})
            </p>

            <div className="user-details-summary glass-card mb-4">
              <div className="summary-row">
                <span className="text-muted text-xs mono">ACCOUNT ROLE:</span>
                <span className="badge badge-green">{currentUser.role}</span>
              </div>
              <div className="summary-row mt-2">
                <span className="text-muted text-xs mono">ACCESS LEVEL:</span>
                <strong className="text-neon-cyan mono text-xs">Full Telemetry Pro License</strong>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                type="button" 
                className="btn btn-secondary flex-1"
                onClick={onClose}
              >
                Continue Working
              </button>
              <button 
                type="button" 
                className="btn btn-danger flex-1"
                onClick={() => {
                  playUiClick();
                  onLogout();
                  onClose();
                }}
              >
                <LogIn size={15} /> Sign Out
              </button>
            </div>
          </div>
        ) : (
          /* Sign In / Sign Up Form */
          <div className="auth-flow-wrapper">
            <div className="auth-header-center">
              <div className="brand-icon-wrapper mx-auto mb-2">
                <Shield size={24} className="text-neon-green" />
              </div>
              <h2 className="auth-title">
                {authMode === 'login' ? 'Sign In to KeeperVerse' : 'Create Free GK Account'}
              </h2>
              <p className="auth-subtitle">
                The dedicated telemetry & performance platform for modern goalkeepers
              </p>
            </div>

            {/* Segmented Auth Mode Switcher */}
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

            <form onSubmit={handleSubmit} className="auth-form">
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
                    <label className="form-label">Platform Role</label>
                    <select 
                      className="form-select" 
                      value={role} 
                      onChange={e => setRole(e.target.value)}
                    >
                      <option value="Goalkeeper">Goalkeeper (Player)</option>
                      <option value="Goalkeeper Coach">Goalkeeper Coach</option>
                      <option value="Academy Scout">Academy Scout / Recruiter</option>
                      <option value="Team Analyst">Team Data Analyst</option>
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
                    placeholder="keeper@example.com" 
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

              <button type="submit" className="btn btn-primary w-full py-3 mt-3">
                <LogIn size={16} /> {authMode === 'login' ? 'Sign In to Portal' : 'Register Account'}
              </button>
            </form>

            {/* Quick 1-Click Demo Login Personas */}
            <div className="quick-demo-personas mt-4">
              <span className="mono text-xs text-muted text-center block mb-2">OR ONE-CLICK DEMO ACCESS:</span>
              <div className="demo-btns-grid">
                <button 
                  type="button" 
                  className="demo-persona-btn"
                  onClick={() => handleQuickDemoLogin('Goalkeeper Coach', 'Coach Jurgen')}
                >
                  <Briefcase size={13} className="text-neon-cyan" />
                  <span>Coach Jurgen</span>
                </button>
                <button 
                  type="button" 
                  className="demo-persona-btn"
                  onClick={() => handleQuickDemoLogin('Academy Scout', 'Scout Matteo')}
                >
                  <UserCheck size={13} className="text-neon-gold" />
                  <span>Scout Matteo</span>
                </button>
                <button 
                  type="button" 
                  className="demo-persona-btn"
                  onClick={() => handleQuickDemoLogin('Goalkeeper', 'Alex Rivera')}
                >
                  <Shield size={13} className="text-neon-green" />
                  <span>Keeper Alex</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
