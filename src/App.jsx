import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  INITIAL_KEEPERS, 
  INITIAL_MATCHES 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroStatsBanner } from './components/HeroStatsBanner';
import { GoalMouthMatrix } from './components/GoalMouthMatrix';
import { PitchTelemetryMap } from './components/PitchTelemetryMap';
import { MatchLogTable } from './components/MatchLogTable';
import { ScoutReportGenerator } from './components/ScoutReportGenerator';
import { DrillsTracker } from './components/DrillsTracker';
import { MatchEventLogger } from './components/MatchEventLogger';
import { NewKeeperModal } from './components/NewKeeperModal';
import { DataStudio } from './components/DataStudio';
import { KeeperDirectoryModal } from './components/KeeperDirectoryModal';
import { LoginPage } from './components/LoginPage';
import { AddKeeperSection } from './components/AddKeeperSection';
import { ThreeDBeautificationBanner } from './components/ThreeDBeautificationBanner';
import { 
  toggleAudioMute, 
  getIsAudioMuted, 
  playUiClick, 
  playSaveSound 
} from './utils/audio';
import { 
  Shield, 
  Target, 
  Award, 
  Flame, 
  Plus, 
  Sparkles, 
  ArrowUpRight, 
  Sliders, 
  Globe, 
  UserPlus, 
  LogIn 
} from 'lucide-react';

export function App() {
  // Theme Color Scheme State ('light' default, with 'dark' option)
  const [activeTheme, setActiveTheme] = useState(() => {
    try {
      return localStorage.getItem('keeperverse_theme_v4') || 'light';
    } catch {
      return 'light';
    }
  });

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
    try {
      localStorage.setItem('keeperverse_theme_v4', activeTheme);
    } catch (e) {
      console.error(e);
    }
  }, [activeTheme]);

  const handleToggleTheme = () => {
    const nextTheme = activeTheme === 'light' ? 'dark' : 'light';
    setActiveTheme(nextTheme);
  };

  // Local storage initialized state for goalkeepers
  const [keepers, setKeepers] = useState(() => {
    try {
      const saved = localStorage.getItem('keeperverse_keepers_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 10) return parsed;
      }
      return INITIAL_KEEPERS;
    } catch {
      return INITIAL_KEEPERS;
    }
  });

  const [activeKeeperId, setActiveKeeperId] = useState(() => {
    return keepers[0]?.id || 'alisson-becker';
  });

  const [matches, setMatches] = useState(() => {
    try {
      const saved = localStorage.getItem('keeperverse_matches_v4');
      return saved ? JSON.parse(saved) : INITIAL_MATCHES;
    } catch {
      return INITIAL_MATCHES;
    }
  });

  // User Authentication state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('keeperverse_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Navigation & View Routing: 'app' | 'login-page'
  const [currentView, setCurrentView] = useState('app');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Modals state
  const [isMatchLoggerOpen, setIsMatchLoggerOpen] = useState(false);
  const [isNewKeeperModalOpen, setIsNewKeeperModalOpen] = useState(false);
  const [isDirectoryModalOpen, setIsDirectoryModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(getIsAudioMuted());

  // Save to localStorage safely
  useEffect(() => {
    try {
      localStorage.setItem('keeperverse_keepers_v4', JSON.stringify(keepers));
    } catch (e) {
      console.warn('Storage quota safeguard:', e);
    }
  }, [keepers]);

  useEffect(() => {
    try {
      localStorage.setItem('keeperverse_matches_v4', JSON.stringify(matches));
    } catch (e) {
      console.warn('Storage quota safeguard:', e);
    }
  }, [matches]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('keeperverse_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('keeperverse_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const activeKeeper = keepers.find(k => k.id === activeKeeperId) || keepers[0];
  const keeperMatches = matches.filter(m => m.keeperId === activeKeeper.id);

  // Sound toggle
  const handleToggleMute = () => {
    const muted = toggleAudioMute();
    setIsMuted(muted);
  };

  // Profile avatar photo update from user's system
  const handleUpdateAvatar = (keeperId, newAvatarBase64) => {
    setKeepers(prevKeepers => {
      return prevKeepers.map(k => {
        if (k.id === keeperId) {
          return { ...k, avatar: newAvatarBase64 };
        }
        return k;
      });
    });
  };

  // Add match handler
  const handleSaveMatch = (newMatch) => {
    setMatches([newMatch, ...matches]);

    // Update active keeper's aggregate season statistics
    setKeepers(prevKeepers => {
      return prevKeepers.map(k => {
        if (k.id !== activeKeeper.id) return k;

        const currentStats = k.seasonStats;
        const newMatchesCount = currentStats.matches + 1;
        const newCleanSheets = currentStats.cleanSheets + (newMatch.cleanSheet ? 1 : 0);
        const newCleanStreak = newMatch.cleanSheet ? currentStats.cleanSheetStreak + 1 : 0;
        const newConceded = currentStats.goalsConceded + newMatch.goalsConceded;
        const newSaves = currentStats.saves + newMatch.saves;
        const newShotsFaced = currentStats.shotsFaced + newMatch.shotsFaced;
        const newShotsOnTarget = currentStats.shotsOnTargetFaced + newMatch.shotsOnTarget;
        const newPsxg = +(currentStats.psxgFaced + newMatch.psxgFaced).toFixed(2);
        const newGoalsPrevented = +(newPsxg - newConceded).toFixed(2);
        const newSavePct = newShotsOnTarget > 0 ? +((newSaves / newShotsOnTarget) * 100).toFixed(1) : 100;

        return {
          ...k,
          seasonStats: {
            ...currentStats,
            matches: newMatchesCount,
            cleanSheets: newCleanSheets,
            cleanSheetStreak: newCleanStreak,
            goalsConceded: newConceded,
            saves: newSaves,
            shotsFaced: newShotsFaced,
            shotsOnTargetFaced: newShotsOnTarget,
            psxgFaced: newPsxg,
            goalsPrevented: newGoalsPrevented,
            savePercentage: newSavePct,
            sweeperActions: currentStats.sweeperActions + (newMatch.sweeperClearances || 0),
            crossesClaimed: currentStats.crossesClaimed + (newMatch.crossesClaimed || 0)
          }
        };
      });
    });
  };

  // Register New Goalkeeper Handler (Works from Modal or Dedicated Section)
  const handleAddKeeper = (newKeeper) => {
    const initialPlayerMatch = {
      id: `m-init-${newKeeper.id}`,
      keeperId: newKeeper.id,
      date: new Date().toISOString().split('T')[0],
      opponent: 'Academy Challengers',
      venue: 'Home',
      result: 'W 2-0',
      cleanSheet: true,
      shotsFaced: newKeeper.seasonStats?.shotsFaced || 6,
      shotsOnTarget: newKeeper.seasonStats?.shotsOnTargetFaced || 5,
      saves: newKeeper.seasonStats?.saves || 5,
      goalsConceded: newKeeper.seasonStats?.goalsConceded || 0,
      psxgFaced: newKeeper.seasonStats?.psxgFaced || 1.65,
      goalsPrevented: newKeeper.seasonStats?.goalsPrevented || +1.65,
      crossesClaimed: newKeeper.seasonStats?.crossesClaimed || 8,
      crossesTotal: newKeeper.seasonStats?.crossesFaced || 8,
      sweeperClearances: newKeeper.seasonStats?.sweeperActions || 3,
      passAccuracy: newKeeper.seasonStats?.passAccuracyTotal || 88.0,
      rating: newKeeper.kvrRating || 8.9,
      mvp: true,
      notes: 'Debut match registered in KeeperVerse. Clean sheet preserved with high cross claim authority.'
    };

    setKeepers(prev => [newKeeper, ...prev]);
    setMatches(prev => [initialPlayerMatch, ...prev]);
    setActiveKeeperId(newKeeper.id);
    setActiveTab('dashboard');
    setCurrentView('app');
    playSaveSound();
  };

  // Auth handlers
  const handleLogin = (user) => {
    setCurrentUser(user);
    playSaveSound();
  };

  const handleLogout = () => {
    setCurrentUser(null);
    playUiClick();
  };

  const handleRemoveKeeper = () => {
    const keeperToRemove = keepers.find(keeper => keeper.id === activeKeeperId);
    if (!keeperToRemove || keepers.length <= 1) return;

    const confirmed = window.confirm(
      `Remove ${keeperToRemove.name} and all of their saved match logs? This cannot be undone.`
    );
    if (!confirmed) return;

    const remainingKeepers = keepers.filter(keeper => keeper.id !== keeperToRemove.id);
    setKeepers(remainingKeepers);
    setMatches(previousMatches => previousMatches.filter(match => match.keeperId !== keeperToRemove.id));
    setActiveKeeperId(remainingKeepers[0].id);
    setActiveTab('dashboard');
    playSaveSound();
  };

  // If user navigated to full dedicated Login Page
  if (currentView === 'login-page') {
    return (
      <LoginPage
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onReturnToApp={() => setCurrentView('app')}
      />
    );
  }

  return (
    <div className="app-container">
      {/* Top Telemetry Header Navbar with Official Goalpost Emblem */}
      <Navbar
        keepers={keepers}
        activeKeeperId={activeKeeperId}
        onSelectKeeper={(id) => setActiveKeeperId(id)}
        onRemoveKeeper={handleRemoveKeeper}
        onOpenDirectoryModal={() => setIsDirectoryModalOpen(true)}
        onOpenMatchLogger={() => setIsMatchLoggerOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setCurrentView('app');
          setActiveTab(tab);
        }}
        currentUser={currentUser}
        onOpenLoginPage={() => setCurrentView('login-page')}
        activeTheme={activeTheme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main View Area */}
      <main className="main-content">
        {/* Universal Hero Banner with Camera Upload Trigger */}
        <HeroStatsBanner 
          keeper={activeKeeper} 
          onUpdateAvatar={handleUpdateAvatar} 
        />

        {/* Tab 1: Command Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-view-flow animate-fade-in">
            {/* 3D Interactive Spatial Telemetry & Beautification Banner */}
            <ThreeDBeautificationBanner />

            {/* The Philosophical Mission Banner */}
            <div className="glass-card mission-spotlight-card mb-4">
              <div className="mission-content">
                <div className="mission-badge">
                  <Sparkles size={14} className="text-neon-gold" />
                  <span>THE GOALKEEPER ANALYTICS REVOLUTION</span>
                </div>
                <h3 className="mission-heading">
                  Beyond "Goals Conceded": True Goalkeeper Value Quantified
                </h3>
                <p className="mission-text">
                  For decades, outfield players enjoyed deep metrics—goals, xG, key passes, recovery sprints—while goalkeepers were judged unfairly on a single team metric: goals conceded. <strong>KEEPER VERSE</strong> levels the playing field with Post-Shot Expected Goals (PSxG), 9-zone goal mouth reflex matrices, sweeper depth telemetry, and box command analytics.
                </p>
                <div className="mission-stat-trio mono">
                  <div className="trio-item">
                    <span className="text-muted">Post-Shot Goals Prevented:</span>
                    <strong className="text-neon-cyan font-bold">+{activeKeeper?.seasonStats?.goalsPrevented || 0}</strong>
                  </div>
                  <div className="trio-sep">•</div>
                  <div className="trio-item">
                    <span className="text-muted">Clean Sheet Ratio:</span>
                    <strong className="text-neon-gold font-bold">{((activeKeeper?.seasonStats?.cleanSheets / (activeKeeper?.seasonStats?.matches || 1)) * 100).toFixed(0)}% Shutout Rate</strong>
                  </div>
                  <div className="trio-sep">•</div>
                  <div className="trio-item">
                    <span className="text-muted">Crosses Commanded:</span>
                    <strong className="text-neon-green font-bold">{activeKeeper?.seasonStats?.crossClaimSuccessRate || 90}% Success</strong>
                  </div>
                </div>
              </div>

              <div className="mission-action-col">
                <button 
                  className="btn btn-primary"
                  onClick={() => { playUiClick(); setActiveTab('add-keeper'); }}
                >
                  <UserPlus size={16} /> + Add Goalkeeper Data
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => { playUiClick(); setIsDirectoryModalOpen(true); }}
                >
                  <Globe size={16} /> Top 5 Leagues Directory
                </button>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => { playUiClick(); setActiveTab('data-studio'); }}
                >
                  <Sliders size={14} /> Open Data Studio
                </button>
              </div>
            </div>

            {/* Quick Interactive Split: Goal Mouth Preview */}
            <div className="dashboard-grid-duo mb-4">
              <div className="dash-card glass-panel p-4">
                <div className="dash-card-header">
                  <div>
                    <span className="badge badge-gold mono">SHOT-STOPPING GEOMETRY</span>
                    <h4 className="dash-title mt-1">9-Zone Goal Face Heatmap</h4>
                  </div>
                  <button 
                    className="btn btn-outline-green btn-sm"
                    onClick={() => { playUiClick(); setActiveTab('goal-matrix'); }}
                  >
                    <span>Full Screen Matrix</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
                <p className="text-xs text-secondary mb-3">
                  Click any zone below to jump into detailed reflex save breakdowns.
                </p>
                <GoalMouthMatrix />
              </div>
            </div>

            {/* Match History Table */}
            <div className="dashboard-ledger-section">
              <MatchLogTable matches={keeperMatches} keeperName={activeKeeper.name} />
            </div>
          </div>
        )}

        {/* Tab 2: Fresh Section to Add New Goalkeeper Data */}
        {activeTab === 'add-keeper' && (
          <AddKeeperSection 
            onAddKeeper={handleAddKeeper} 
            onCancel={() => setActiveTab('dashboard')} 
          />
        )}

        {/* Tab 3: 9-Zone Goal Face Matrix */}
        {activeTab === 'goal-matrix' && (
          <div className="animate-fade-in">
            <GoalMouthMatrix />
          </div>
        )}

        {/* Tab 4: Interactive Data Studio (Manual input with live graphical outputs) */}
        {activeTab === 'data-studio' && (
          <div className="animate-fade-in">
            <DataStudio 
              activeKeeper={activeKeeper} 
              onCommitMatchData={handleSaveMatch} 
            />
          </div>
        )}

        {/* Tab 5: Pitch & Sweeping Telemetry */}
        {activeTab === 'pitch-telemetry' && (
          <div className="animate-fade-in">
            <PitchTelemetryMap keeper={activeKeeper} />
          </div>
        )}

        {/* Tab 6: Match Logs */}
        {activeTab === 'matches' && (
          <div className="animate-fade-in">
            <MatchLogTable matches={keeperMatches} keeperName={activeKeeper.name} />
          </div>
        )}

        {/* Tab 7: Scout Dossier & Academy Report */}
        {activeTab === 'scout-report' && (
          <div className="animate-fade-in">
            <ScoutReportGenerator keeper={activeKeeper} />
          </div>
        )}

        {/* Tab 8: Training Drills & Reaction Speed Benchmark */}
        {activeTab === 'drills' && (
          <div className="animate-fade-in">
            <DrillsTracker keeper={activeKeeper} />
          </div>
        )}
      </main>

      {/* Bottom Beautification & 3D Doctrine Showcase Ribbon */}
      <section className="bottom-doctrine-ribbon">
        <div className="bottom-doctrine-inner">
          <div className="doctrine-quote-badge">
            <span className="quote-label-chip">GOALKEEPER PHILOSOPHY &amp; TAGLINES</span>
            <h3 className="doctrine-tagline-hero">
              "Defending the Impossible. Quantifying the Unseen."
            </h3>
            <p className="doctrine-tagline-sub">
              In the solitary theater of the 18-yard box, legends aren't born from luck — they are sculpted from millimeter reflexes, aerial bravery, and unyielding spatial geometry.
            </p>
          </div>

          <div className="doctrine-taglines-grid">
            <div className="doctrine-card card-3d-tilt">
              <div className="card-3d-glow" />
              <div className="doctrine-icon-circle gold">🛡️</div>
              <h4 className="doctrine-card-title">The Solitary Sentinel</h4>
              <p className="doctrine-card-desc">Outfielders run kilometers; the goalkeeper stands vigilant for the one critical second that decides silverware and glory.</p>
            </div>

            <div className="doctrine-card card-3d-tilt">
              <div className="card-3d-glow" />
              <div className="doctrine-icon-circle green">📐</div>
              <h4 className="doctrine-card-title">Geometry of the Shutout</h4>
              <p className="doctrine-card-desc">Cutting angles, narrowing targets, and mastering the 7.32m × 2.44m theater through calculated spatial positioning.</p>
            </div>

            <div className="doctrine-card card-3d-tilt">
              <div className="card-3d-glow" />
              <div className="doctrine-icon-circle cyan">⚡</div>
              <h4 className="doctrine-card-title">Sub-200ms Neural Reflexes</h4>
              <p className="doctrine-card-desc">Translating visual cues into explosive parries before the human conscious mind can even register the incoming strike.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Aesthetic Footer — Logo Removed, Pure Typography & Links */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-top-row">
            <div className="footer-brand-lockup">
              <span className="footer-brand-title">KEEPER<span className="accent-text">VERSE</span></span>
              <span className="footer-badge-mono mono">PRO TELEMETRY v4.2</span>
            </div>
            <p className="footer-tagline-text">
              The dedicated analytics, 9-zone shot-stopping telemetry, and coaching platform built exclusively for football goalkeepers worldwide.
            </p>
          </div>

          <div className="footer-divider-line" />

          <div className="footer-bottom-row">
            <div className="footer-leagues-tag mono text-xs">
              <span className="league-pill">Premier League</span>
              <span className="league-pill">La Liga</span>
              <span className="league-pill">Bundesliga</span>
              <span className="league-pill">Serie A</span>
              <span className="league-pill">Ligue 1</span>
            </div>
            <div className="footer-legal-copy mono text-xs">
              <span>© {new Date().getFullYear()} KEEPER VERSE • Dedicated Goalkeeper Intelligence Hub</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <MatchEventLogger
        isOpen={isMatchLoggerOpen}
        onClose={() => setIsMatchLoggerOpen(false)}
        activeKeeper={activeKeeper}
        onSaveMatch={handleSaveMatch}
      />

      <NewKeeperModal
        isOpen={isNewKeeperModalOpen}
        onClose={() => setIsNewKeeperModalOpen(false)}
        onAddKeeper={handleAddKeeper}
      />

      <KeeperDirectoryModal
        isOpen={isDirectoryModalOpen}
        onClose={() => setIsDirectoryModalOpen(false)}
        keepers={keepers}
        activeKeeperId={activeKeeperId}
        onSelectKeeper={(id) => setActiveKeeperId(id)}
        onOpenNewKeeperModal={() => {
          setIsDirectoryModalOpen(false);
          setActiveTab('add-keeper');
        }}
      />
    </div>
  );
}

export default App;
