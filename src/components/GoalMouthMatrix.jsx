import React, { useState } from 'react';
import { 
  Shield, 
  Target, 
  Crosshair, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Filter, 
  Sparkles,
  Zap,
  Flame
} from 'lucide-react';
import { GOAL_ZONES, SAMPLE_SHOT_EVENTS } from '../data/mockData';
import { playUiClick, playSaveSound } from '../utils/audio';

export function GoalMouthMatrix() {
  const [selectedZoneId, setSelectedZoneId] = useState('TR');
  const [viewMode, setViewMode] = useState('saveRate'); // 'saveRate' | 'volume' | 'difficulty'
  const [is3DMode, setIs3DMode] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  const selectedZone = GOAL_ZONES.find(z => z.id === selectedZoneId) || GOAL_ZONES[2];
  const filteredEvents = SAMPLE_SHOT_EVENTS.filter(e => e.zone === selectedZoneId);

  // Helper for color coding quadrants
  const getZoneColor = (zone) => {
    if (viewMode === 'saveRate') {
      if (zone.savePct >= 88) return { bg: 'rgba(5, 150, 105, 0.14)', border: '#059669', text: '#059669', label: 'Superior Wall' };
      if (zone.savePct >= 80) return { bg: 'rgba(2, 132, 199, 0.12)', border: '#0284c7', text: '#0284c7', label: 'Reliable' };
      return { bg: 'rgba(225, 29, 72, 0.12)', border: '#e11d48', text: '#e11d48', label: 'Vulnerable' };
    }
    if (viewMode === 'volume') {
      if (zone.shotsFaced >= 18) return { bg: 'rgba(234, 88, 12, 0.16)', border: '#ea580c', text: '#ea580c', label: 'High Traffic' };
      if (zone.shotsFaced >= 12) return { bg: 'rgba(2, 132, 199, 0.12)', border: '#0284c7', text: '#0284c7', label: 'Moderate' };
      return { bg: 'rgba(100, 116, 139, 0.08)', border: '#94a3b8', text: '#64748b', label: 'Low Volume' };
    }
    // Difficulty
    if (zone.avgPsxg >= 0.65) return { bg: 'rgba(225, 29, 72, 0.16)', border: '#e11d48', text: '#e11d48', label: 'Extreme PSxG' };
    if (zone.avgPsxg >= 0.48) return { bg: 'rgba(234, 88, 12, 0.14)', border: '#ea580c', text: '#ea580c', label: 'High PSxG' };
    return { bg: 'rgba(5, 150, 105, 0.12)', border: '#059669', text: '#059669', label: 'Standard' };
  };

  return (
    <div className="goal-matrix-section">
      {/* Section Header */}
      <div className="section-head-row">
        <div>
          <div className="subhead-pill">
            <Target size={13} />
            <span>SHOT-STOPPING GEOMETRY</span>
          </div>
          <h2 className="section-title">9-Zone Goal Face Matrix & Reflex Heatmap</h2>
          <p className="section-desc">
            Goalkeeping excellence is defined by quadrant coverage. Analyze save percentages, handling techniques, and post-shot expected goals across each section of the goal frame.
          </p>
        </div>

        {/* Heatmap View Toggles & 3D Mode */}
        <div className="matrix-controls-bar">
          <div className="segmented-toggle">
            <button 
              className={`toggle-option ${viewMode === 'saveRate' ? 'active' : ''}`}
              onClick={() => { playUiClick(); setViewMode('saveRate'); }}
            >
              Save Rate %
            </button>
            <button 
              className={`toggle-option ${viewMode === 'volume' ? 'active' : ''}`}
              onClick={() => { playUiClick(); setViewMode('volume'); }}
            >
              Shot Volume
            </button>
            <button 
              className={`toggle-option ${viewMode === 'difficulty' ? 'active' : ''}`}
              onClick={() => { playUiClick(); setViewMode('difficulty'); }}
            >
              PSxG Difficulty
            </button>
          </div>

          <button 
            type="button" 
            className={`btn btn-secondary btn-sm ${is3DMode ? 'active-3d-btn' : ''}`}
            onClick={() => {
              playUiClick();
              setIs3DMode(!is3DMode);
            }}
          >
            <Sparkles size={13} className="text-neon-gold" />
            <span>{is3DMode ? '3D Goal Depth: ON' : '3D Goal Depth'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Grid Layout */}
      <div className="goal-matrix-layout">
        {/* Left: The Visual 3D-styled Goal Frame */}
        <div className="goal-stage-card glass-panel">
          <div className="goal-stage-topbar">
            <span className="mono text-muted text-xs">GOAL TELEMETRY FRAME • STANDARD 7.32M × 2.44M</span>
            <div className="legend-pills">
              <span className="legend-item"><span className="dot green"></span> &gt;85% Save</span>
              <span className="legend-item"><span className="dot cyan"></span> 80-84%</span>
              <span className="legend-item"><span className="dot red"></span> &lt;80% Work-On</span>
            </div>
          </div>

          <div className={`goal-viewport ${is3DMode ? 'threed-perspective' : ''}`}>
            {/* Realistic SVG Football Goal Frame with Netting */}
            <svg 
              className="goal-svg-canvas" 
              viewBox="0 0 760 380" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Net pattern */}
                <pattern id="goalNet" width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M 0 0 L 16 16 M 16 0 L 0 16" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
                </pattern>
                {/* Linear gradient for posts */}
                <linearGradient id="postGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#d1d5db" />
                  <stop offset="100%" stopColor="#9ca3af" />
                </linearGradient>
                <linearGradient id="turfGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0b2416" />
                  <stop offset="100%" stopColor="#05100a" />
                </linearGradient>
              </defs>

              {/* Pitch Grass Base */}
              <rect x="20" y="320" width="720" height="50" fill="url(#turfGrad)" rx="4" />
              <line x1="20" y1="320" x2="740" y2="320" stroke="rgba(255,255,255,0.35)" strokeWidth="3" />

              {/* Goal Netting Backing */}
              <rect x="60" y="45" width="640" height="275" fill="rgba(8, 14, 22, 0.85)" />
              <rect x="60" y="45" width="640" height="275" fill="url(#goalNet)" />

              {/* Goalposts and Crossbar */}
              {/* Back depth posts */}
              <line x1="60" y1="45" x2="100" y2="25" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
              <line x1="700" y1="45" x2="660" y2="25" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
              <line x1="100" y1="25" x2="660" y2="25" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />

              {/* Main White Posts */}
              {/* Left Post */}
              <rect x="52" y="40" width="12" height="280" fill="url(#postGrad)" rx="3" filter="drop-shadow(0 0 8px rgba(255,255,255,0.4))" />
              {/* Right Post */}
              <rect x="696" y="40" width="12" height="280" fill="url(#postGrad)" rx="3" filter="drop-shadow(0 0 8px rgba(255,255,255,0.4))" />
              {/* Top Crossbar */}
              <rect x="52" y="36" width="656" height="12" fill="url(#postGrad)" rx="3" filter="drop-shadow(0 0 8px rgba(255,255,255,0.4))" />

              {/* Center Line Guides */}
              <line x1="273" y1="48" x2="273" y2="320" stroke="rgba(255,255,255,0.12)" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="487" y1="48" x2="487" y2="320" stroke="rgba(255,255,255,0.12)" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="64" y1="139" x2="696" y2="139" stroke="rgba(255,255,255,0.12)" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="64" y1="230" x2="696" y2="230" stroke="rgba(255,255,255,0.12)" strokeDasharray="4 4" strokeWidth="1" />
            </svg>

            {/* 9 Interactive Quadrant Overlays */}
            <div className="nine-zone-interactive-grid">
              {GOAL_ZONES.map((zone) => {
                const colorConfig = getZoneColor(zone);
                const isSelected = zone.id === selectedZoneId;

                return (
                  <button
                    key={zone.id}
                    className={`quadrant-cell ${isSelected ? 'active-quadrant' : ''}`}
                    style={{
                      backgroundColor: isSelected ? 'rgba(0, 245, 155, 0.28)' : colorConfig.bg,
                      borderColor: isSelected ? '#00f59b' : colorConfig.border
                    }}
                    onClick={() => {
                      playSaveSound();
                      setSelectedZoneId(zone.id);
                    }}
                  >
                    <div className="quadrant-badge mono">{zone.id}</div>
                    
                    <div className="quadrant-stat-core">
                      {viewMode === 'saveRate' && (
                        <>
                          <span className="quadrant-metric mono">{zone.savePct}%</span>
                          <span className="quadrant-label">
                            {zone.saved} Saved / {zone.shotsFaced}
                          </span>
                        </>
                      )}

                      {viewMode === 'volume' && (
                        <>
                          <span className="quadrant-metric mono">{zone.shotsFaced}</span>
                          <span className="quadrant-label">Shots Faced</span>
                        </>
                      )}

                      {viewMode === 'difficulty' && (
                        <>
                          <span className="quadrant-metric mono">{zone.avgPsxg}</span>
                          <span className="quadrant-label">Avg PSxG</span>
                        </>
                      )}
                    </div>

                    <div className="quadrant-footer">
                      <span className="quadrant-tag" style={{ color: colorConfig.text }}>
                        {colorConfig.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="goal-stage-hint">
            <Sparkles size={14} className="text-neon-green" />
            <span>Click any quadrant to inspect exact shot telemetry, shooter velocity, and glove mechanics.</span>
          </div>
        </div>

        {/* Right: Detailed Quadrant Inspection Drawer */}
        <div className="quadrant-details-card glass-panel">
          <div className="drawer-header">
            <div className="drawer-title-row">
              <span className="badge badge-green mono">{selectedZone.id} ZONE</span>
              <span className="mono text-muted text-xs">DIFFICULTY: {selectedZone.difficulty}</span>
            </div>
            <h3 className="drawer-zone-title">{selectedZone.name}</h3>
            <p className="drawer-desc">
              Detailed match telemetry recorded by coaches and sensors for this specific quadrant.
            </p>
          </div>

          {/* Quadrant Quick Metric Stats */}
          <div className="drawer-stats-row">
            <div className="mini-stat-tile">
              <span className="mini-label">Save Rate</span>
              <span className="mini-value text-neon-green mono">{selectedZone.savePct}%</span>
            </div>
            <div className="mini-stat-tile">
              <span className="mini-label">Saves Made</span>
              <span className="mini-value mono">{selectedZone.saved}</span>
            </div>
            <div className="mini-stat-tile">
              <span className="mini-label">Conceded</span>
              <span className="mini-value text-neon-red mono">{selectedZone.conceded}</span>
            </div>
            <div className="mini-stat-tile">
              <span className="mini-label">Avg PSxG</span>
              <span className="mini-value text-neon-gold mono">{selectedZone.avgPsxg}</span>
            </div>
          </div>

          {/* Shot Logged Incidents */}
          <div className="drawer-incidents-section">
            <div className="incidents-heading">
              <Crosshair size={14} className="text-neon-cyan" />
              <span>Logged Match Shots in this Sector ({filteredEvents.length || 2} samples)</span>
            </div>

            <div className="incidents-list">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((shot) => (
                  <div key={shot.id} className="incident-row">
                    <div className="incident-outcome">
                      {shot.outcome === 'Saved' ? (
                        <CheckCircle2 size={18} className="text-neon-green" />
                      ) : (
                        <XCircle size={18} className="text-neon-red" />
                      )}
                    </div>
                    <div className="incident-info">
                      <div className="incident-title-line">
                        <strong className="incident-type">{shot.type}</strong>
                        <span className="incident-minute mono">{shot.minute}' vs {shot.opponent}</span>
                      </div>
                      <div className="incident-specs mono">
                        <span>Dist: {shot.shooterDist}</span>
                        <span>•</span>
                        <span>Speed: {shot.speed}</span>
                        <span>•</span>
                        <span className="text-neon-gold">PSxG: {shot.psxg}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="incident-row">
                  <CheckCircle2 size={18} className="text-neon-green" />
                  <div className="incident-info">
                    <div className="incident-title-line">
                      <strong className="incident-type">Clean Catch under Crossbar</strong>
                      <span className="incident-minute mono">54' vs Kingswood</span>
                    </div>
                    <div className="incident-specs mono">
                      <span>Dist: 16 m</span>
                      <span>•</span>
                      <span>Speed: 82 km/h</span>
                      <span>•</span>
                      <span className="text-neon-gold">PSxG: 0.44</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Coaching Technique Tip */}
          <div className="coaching-insight-box">
            <div className="insight-title">
              <Zap size={14} className="text-neon-gold" />
              <span>Tactical Goalkeeping Directive</span>
            </div>
            <p className="insight-text">
              {selectedZone.id.includes('T') && "Focus on explosive single-foot propulsion to get the top hand over the ball for clean parries over the bar."}
              {selectedZone.id.includes('M') && "Maintain balanced neutral set-stance; use chest collapse technique on high-velocity central drives."}
              {selectedZone.id.includes('B') && "Get hip down low rapidly; use modern barrier technique or trail-leg spread for low-driven cutbacks."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
