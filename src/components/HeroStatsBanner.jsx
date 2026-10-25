import React, { useRef } from 'react';
import { 
  ShieldCheck, 
  Flame, 
  Target, 
  Compass, 
  Footprints, 
  Info,
  Camera,
  Sparkles,
  Upload
} from 'lucide-react';
import { playUiClick, playSaveSound } from '../utils/audio';

export function HeroStatsBanner({ keeper, onUpdateAvatar }) {
  const fileInputRef = useRef(null);
  if (!keeper) return null;
  const stats = keeper.seasonStats;

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const base64Url = uploadEvent.target?.result;
        if (base64Url && onUpdateAvatar) {
          playSaveSound();
          onUpdateAvatar(keeper.id, base64Url);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="hero-banner-container">
      {/* Background Graphic Overlay with Clean Sunset Goalpost */}
      <div className="hero-bg-media">
        <img 
          src="/sunset-goalpost.jpg" 
          alt="Sunset football goalpost on pitch" 
          className="hero-backdrop-img"
        />
        <div className="hero-gradient-overlay" />
        <div className="hero-scanline-grid" />
      </div>

      <div className="hero-content-inner">
        {/* Top: Goalkeeper Identity Header */}
        <div className="keeper-bio-row">
          {/* Avatar with System File Upload Camera Button */}
          <div className="keeper-portrait-wrapper group-avatar">
            <img 
              src={keeper.avatar || "/keeper-avatar.jpg"} 
              alt={keeper.name} 
              className="keeper-portrait-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/keeper-avatar.jpg";
              }}
            />

            {/* Hidden File Input for System Image Upload */}
            <input 
              type="file" 
              ref={fileInputRef} 
              accept="image/*" 
              onChange={handleImageUpload} 
              style={{ display: 'none' }} 
            />

            {/* Hover Camera Overlay */}
            <button 
              type="button"
              className="avatar-upload-overlay-btn"
              title="Upload profile picture from your system"
              onClick={() => {
                playUiClick();
                fileInputRef.current?.click();
              }}
            >
              <Camera size={18} className="camera-icon" />
              <span className="upload-tip-text">Upload Pic</span>
            </button>

            <div className="portrait-badge">
              <span className="mono">KVR {keeper.kvrRating}</span>
            </div>
          </div>

          <div className="keeper-meta-details">
            <div className="keeper-tags-bar">
              <span className="badge badge-green">
                <ShieldCheck size={12} /> {keeper.archetype}
              </span>
              <span className="badge badge-cyan">{keeper.level}</span>
              <span className="badge badge-gold">
                <Flame size={12} /> {stats.cleanSheetStreak} Clean Sheet Streak
              </span>
            </div>

            <h1 className="keeper-display-name">
              {keeper.name} <span className="keeper-callsign">"{keeper.callsign}"</span>
            </h1>

            <div className="keeper-club-specs">
              <span className="spec-item"><strong>Club:</strong> {keeper.team}</span>
              <span className="spec-sep">•</span>
              <span className="spec-item"><strong>Age:</strong> {keeper.age}</span>
              <span className="spec-sep">•</span>
              <span className="spec-item"><strong>Height:</strong> {keeper.height}</span>
              <span className="spec-sep">•</span>
              <span className="spec-item"><strong>Foot:</strong> {keeper.strongFoot}</span>
              <span className="spec-sep">•</span>
              <span className="spec-item"><strong>Gloves:</strong> {keeper.gloveModel}</span>
            </div>

            <p className="keeper-scout-summary">
              {keeper.bio}
            </p>
          </div>
        </div>

        {/* Bottom: Modern Goalkeeper Performance Telemetry Cards */}
        <div className="hero-kpi-grid">
          {/* Card 1: Goals Prevented (PSxG +/-) */}
          <div className="kpi-card highlight-card">
            <div className="kpi-card-header">
              <div className="kpi-title-group">
                <span className="kpi-label">Goals Prevented (PSxG +/-)</span>
                <div className="tooltip-trigger" title="Post-Shot Expected Goals minus Goals Conceded. Positive numbers indicate saves above what an average goalkeeper would make.">
                  <Info size={13} />
                </div>
              </div>
              <span className="kpi-icon-pill green">
                <Sparkles size={16} />
              </span>
            </div>
            <div className="kpi-value-row">
              <span className="kpi-hero-number text-neon-green mono">
                {stats.goalsPrevented > 0 ? `+${stats.goalsPrevented}` : stats.goalsPrevented}
              </span>
              <div className="kpi-subtext">
                <span>PSxG Faced: {stats.psxgFaced}</span>
                <span className="kpi-tag-good">Elite Shot-Stopper</span>
              </div>
            </div>
            <div className="kpi-progress-bar">
              <div className="kpi-fill green" style={{ width: '85%' }}></div>
            </div>
          </div>

          {/* Card 2: Save Percentage */}
          <div className="kpi-card">
            <div className="kpi-card-header">
              <span className="kpi-label">Save Percentage</span>
              <span className="kpi-icon-pill cyan">
                <Target size={16} />
              </span>
            </div>
            <div className="kpi-value-row">
              <span className="kpi-hero-number mono text-neon-cyan">
                {stats.savePercentage}%
              </span>
              <div className="kpi-subtext">
                <span>{stats.saves} Saves / {stats.shotsOnTargetFaced} On-Target</span>
                <span>{stats.goalsConceded} Goals Conceded</span>
              </div>
            </div>
            <div className="kpi-progress-bar">
              <div className="kpi-fill cyan" style={{ width: `${stats.savePercentage}%` }}></div>
            </div>
          </div>

          {/* Card 3: Clean Sheets & Ratio */}
          <div className="kpi-card">
            <div className="kpi-card-header">
              <span className="kpi-label">Clean Sheets</span>
              <span className="kpi-icon-pill gold">
                <ShieldCheck size={16} />
              </span>
            </div>
            <div className="kpi-value-row">
              <span className="kpi-hero-number mono text-neon-gold">
                {stats.cleanSheets} <span className="kpi-denom">/ {stats.matches}</span>
              </span>
              <div className="kpi-subtext">
                <span>{((stats.cleanSheets / stats.matches) * 100).toFixed(0)}% Match Shutout Rate</span>
                <span className="text-neon-gold">Streak: {stats.cleanSheetStreak} Games</span>
              </div>
            </div>
            <div className="kpi-progress-bar">
              <div className="kpi-fill gold" style={{ width: `${(stats.cleanSheets / stats.matches) * 100}%` }}></div>
            </div>
          </div>

          {/* Card 4: Aerial & Cross Claim Dominance */}
          <div className="kpi-card">
            <div className="kpi-card-header">
              <span className="kpi-label">Aerial Box Dominance</span>
              <span className="kpi-icon-pill purple">
                <Compass size={16} />
              </span>
            </div>
            <div className="kpi-value-row">
              <span className="kpi-hero-number mono text-purple">
                {stats.crossClaimSuccessRate}%
              </span>
              <div className="kpi-subtext">
                <span>{stats.crossesClaimed} Claimed / {stats.crossesFaced} Deliveries</span>
                <span>{stats.punches} Controlled Punches</span>
              </div>
            </div>
            <div className="kpi-progress-bar">
              <div className="kpi-fill purple" style={{ width: `${stats.crossClaimSuccessRate}%` }}></div>
            </div>
          </div>

          {/* Card 5: Sweeper-Keeper Action & Distribution */}
          <div className="kpi-card">
            <div className="kpi-card-header">
              <span className="kpi-label">Sweeping & Distribution</span>
              <span className="kpi-icon-pill green">
                <Footprints size={16} />
              </span>
            </div>
            <div className="kpi-value-row">
              <span className="kpi-hero-number mono">
                {stats.sweeperActions} <span className="kpi-unit">sweeps</span>
              </span>
              <div className="kpi-subtext">
                <span>Avg Line: {stats.avgSweepingDist}</span>
                <span>Pass Acc: {stats.passAccuracyTotal}%</span>
              </div>
            </div>
            <div className="kpi-progress-bar">
              <div className="kpi-fill green" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
