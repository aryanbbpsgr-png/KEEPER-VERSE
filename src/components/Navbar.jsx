import React from 'react';
import { 
  UserCheck, 
  Volume2, 
  VolumeX, 
  Plus, 
  Activity, 
  Flame, 
  Award, 
  Sliders, 
  LogIn, 
  UserPlus, 
  Globe, 
  Sun,
  Moon,
  Shield,
  Trash2
} from 'lucide-react';
import { playUiClick } from '../utils/audio';

export function Navbar({ 
  keepers, 
  activeKeeperId, 
  onSelectKeeper, 
  onRemoveKeeper,
  onOpenDirectoryModal,
  onOpenMatchLogger, 
  isMuted, 
  onToggleMute, 
  activeTab, 
  onSelectTab, 
  currentUser, 
  onOpenLoginPage,
  activeTheme,
  onToggleTheme 
}) {
  const activeKeeper = keepers.find(k => k.id === activeKeeperId) || keepers[0];

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        {/* Left: Brand Identity with Official Goalpost Emblem Logo */}
        <div className="brand-group" onClick={() => onSelectTab('dashboard')}>
          <div className="brand-logo-img-box">
            <img 
              src="/keeperverse-logo.png" 
              alt="KeeperVerse Goalpost Emblem" 
              className="brand-logo-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div>
            <div className="brand-title">
              KEEPER<span className="accent-text">VERSE</span>
            </div>
            <div className="brand-subline">
              <span className="pulse-dot"></span>
              GOALKEEPER PERFORMANCE HUB
            </div>
          </div>
        </div>

        {/* Center: Navigation Tabs */}
        <nav className="nav-tabs-wrapper">
          <button 
            className={`nav-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => { playUiClick(); onSelectTab('dashboard'); }}
          >
            <Activity size={15} />
            <span>Dashboard</span>
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'add-keeper' ? 'active' : ''}`}
            onClick={() => { playUiClick(); onSelectTab('add-keeper'); }}
          >
            <UserPlus size={15} className="text-neon-gold" />
            <span>Add Goalkeeper</span>
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'goal-matrix' ? 'active' : ''}`}
            onClick={() => { playUiClick(); onSelectTab('goal-matrix'); }}
          >
            <Shield size={15} />
            <span>9-Zone Goal Face</span>
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'data-studio' ? 'active' : ''}`}
            onClick={() => { playUiClick(); onSelectTab('data-studio'); }}
          >
            <Sliders size={15} />
            <span>Data Studio</span>
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'pitch-telemetry' ? 'active' : ''}`}
            onClick={() => { playUiClick(); onSelectTab('pitch-telemetry'); }}
          >
            <Flame size={15} />
            <span>Pitch & Sweeping</span>
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'matches' ? 'active' : ''}`}
            onClick={() => { playUiClick(); onSelectTab('matches'); }}
          >
            <span>Match Log</span>
            <span className="tab-pill">{activeKeeper?.seasonStats?.matches || 0}</span>
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'scout-report' ? 'active' : ''}`}
            onClick={() => { playUiClick(); onSelectTab('scout-report'); }}
          >
            <Award size={15} />
            <span>Scout Dossier</span>
          </button>
        </nav>

        {/* Right: Quick Tools & Authentication */}
        <div className="nav-actions-group">
          {/* Top 5 European Leagues Directory Trigger */}
          <button 
            className="btn btn-secondary nav-league-btn"
            title="Browse all goalkeepers from Premier League, La Liga, Bundesliga, Serie A, Ligue 1"
            onClick={() => {
              playUiClick();
              onOpenDirectoryModal();
            }}
          >
            <Globe size={14} className="text-neon-cyan" />
            <span>Top 5 Leagues</span>
          </button>

          {/* Quick Active Keeper Selector Dropdown */}
          <div className="keeper-selector-box">
            <UserCheck size={15} className="keeper-icon" />
            <select 
              className="keeper-select"
              value={activeKeeperId}
              onChange={(e) => {
                playUiClick();
                onSelectKeeper(e.target.value);
              }}
            >
              {keepers.map(k => (
                <option key={k.id} value={k.id}>
                  {k.name} ({k.team})
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn btn-danger nav-remove-keeper-btn"
            type="button"
            title={keepers.length <= 1 ? 'Keep at least one goalkeeper in the roster' : `Remove ${activeKeeper?.name} from the roster`}
            aria-label={`Remove ${activeKeeper?.name || 'selected goalkeeper'} from the roster`}
            disabled={keepers.length <= 1}
            onClick={() => {
              playUiClick();
              onRemoveKeeper();
            }}
          >
            <Trash2 size={14} />
            <span>Remove Keeper</span>
          </button>

          {/* Light / Dark Mode Toggle */}
          <button 
            className="icon-tool-btn" 
            title={`Toggle Theme Mode (Current: ${activeTheme})`}
            onClick={() => {
              playUiClick();
              onToggleTheme();
            }}
          >
            {activeTheme === 'dark' ? <Sun size={16} className="text-neon-gold" /> : <Moon size={16} />}
          </button>

          {/* Audio Synthesizer Toggle */}
          <button 
            className="icon-tool-btn" 
            title={isMuted ? "Unmute Tactical Audio" : "Mute Audio"}
            onClick={() => {
              playUiClick();
              onToggleMute();
            }}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Dedicated Login Page CTA Button */}
          <button 
            className={`btn ${currentUser ? 'btn-secondary' : 'btn-primary'} auth-profile-btn`}
            onClick={() => {
              playUiClick();
              onOpenLoginPage();
            }}
          >
            {currentUser ? (
              <>
                <span className="user-avatar-mini mono">{currentUser.name[0]}</span>
                <span className="user-name-text">{currentUser.name.split(' ')[0]}</span>
                <span className="badge badge-cyan text-2xs">{currentUser.role.split(' ')[0]}</span>
              </>
            ) : (
              <>
                <LogIn size={14} />
                <span>Sign In / Login</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
