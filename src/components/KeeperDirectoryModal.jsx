import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Shield, 
  Target, 
  Flame, 
  Globe, 
  UserPlus, 
  Check, 
  Sparkles,
  Award
} from 'lucide-react';
import { ALL_LEAGUES } from '../data/mockData';
import { playUiClick, playSaveSound } from '../utils/audio';

export function KeeperDirectoryModal({ 
  isOpen, 
  onClose, 
  keepers, 
  activeKeeperId, 
  onSelectKeeper,
  onOpenNewKeeperModal 
}) {
  if (!isOpen) return null;

  const [search, setSearch] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('All Leagues');

  const filteredKeepers = keepers.filter(k => {
    const matchesLeague = selectedLeague === 'All Leagues' || k.league === selectedLeague;
    const matchesSearch = k.name.toLowerCase().includes(search.toLowerCase()) || 
                          k.team.toLowerCase().includes(search.toLowerCase()) ||
                          k.archetype.toLowerCase().includes(search.toLowerCase());
    return matchesLeague && matchesSearch;
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content directory-modal-box" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-bar">
          <div className="header-title-pack">
            <span className="badge badge-cyan mono">EUROPEAN LEAGUES & DATABASE</span>
            <h2 className="modal-heading">Goalkeeper Directory • Top 5 Leagues</h2>
          </div>
          <button className="icon-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Search & Actions Bar */}
        <div className="directory-search-bar mb-3">
          <div className="search-input-wrap flex-1">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              className="search-input w-full" 
              placeholder="Search goalkeeper by name, club (e.g. Alisson, Neuer, Courtois)..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
            />
          </div>

          <button 
            className="btn btn-primary btn-sm"
            onClick={() => {
              playUiClick();
              onClose();
              onOpenNewKeeperModal();
            }}
          >
            <UserPlus size={14} /> + Register New Player
          </button>
        </div>

        {/* League Pills */}
        <div className="league-filter-pills mb-3">
          {ALL_LEAGUES.map(league => (
            <button
              key={league}
              className={`league-pill ${selectedLeague === league ? 'active' : ''}`}
              onClick={() => {
                playUiClick();
                setSelectedLeague(league);
              }}
            >
              {league}
            </button>
          ))}
        </div>

        {/* Goalkeepers Grid */}
        <div className="directory-keepers-grid">
          {filteredKeepers.map(keeper => {
            const isSelected = keeper.id === activeKeeperId;
            const stats = keeper.seasonStats;

            return (
              <div 
                key={keeper.id} 
                className={`directory-keeper-card glass-card ${isSelected ? 'active-keeper-card' : ''}`}
                onClick={() => {
                  playSaveSound();
                  onSelectKeeper(keeper.id);
                  onClose();
                }}
              >
                <div className="card-top-row">
                  <div className="dir-portrait-box">
                    <img 
                      src={keeper.avatar || "/keeper-avatar.jpg"} 
                      alt={keeper.name} 
                      className="dir-portrait-img"
                      onError={e => { e.target.onerror = null; e.target.src = "/keeper-avatar.jpg"; }}
                    />
                    <span className="dir-kvr-badge mono">KVR {keeper.kvrRating}</span>
                  </div>

                  <div className="dir-meta-col">
                    <div className="flex items-center justify-between">
                      <span className="badge badge-green text-3xs mono">{keeper.league}</span>
                      {isSelected && (
                        <span className="active-tag mono text-xs text-neon-green flex items-center gap-1">
                          <Check size={13} /> ACTIVE
                        </span>
                      )}
                    </div>
                    <h4 className="dir-keeper-name">{keeper.name}</h4>
                    <span className="dir-club-line">{keeper.team}</span>
                    <span className="dir-archetype-text">{keeper.archetype}</span>
                  </div>
                </div>

                {/* Key Metrics Pill Bar */}
                <div className="dir-stats-trio mono">
                  <div className="trio-cell">
                    <span className="text-muted text-3xs">PSxG PREVENTED</span>
                    <strong className="text-neon-green text-xs font-bold">
                      {stats.goalsPrevented > 0 ? `+${stats.goalsPrevented}` : stats.goalsPrevented}
                    </strong>
                  </div>
                  <div className="trio-cell">
                    <span className="text-muted text-3xs">SAVE RATE</span>
                    <strong className="text-neon-cyan text-xs font-bold">{stats.savePercentage}%</strong>
                  </div>
                  <div className="trio-cell">
                    <span className="text-muted text-3xs">CLEAN SHEETS</span>
                    <strong className="text-neon-gold text-xs font-bold">{stats.cleanSheets} / {stats.matches}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
