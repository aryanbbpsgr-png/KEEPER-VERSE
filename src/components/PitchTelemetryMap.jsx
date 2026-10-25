import React, { useState } from 'react';
import { 
  Footprints, 
  Send, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles,
  Info
} from 'lucide-react';
import { PITCH_TELEMETRY } from '../data/mockData';
import { playUiClick } from '../utils/audio';

export function PitchTelemetryMap({ keeper }) {
  const [activeLayer, setActiveLayer] = useState('all'); // 'all' | 'sweeper' | 'distribution'
  const [selectedItem, setSelectedItem] = useState(null);

  const sweeperList = PITCH_TELEMETRY.sweeperActions;
  const distList = PITCH_TELEMETRY.distributionArcs;

  return (
    <div className="pitch-telemetry-section">
      {/* Header */}
      <div className="section-head-row">
        <div>
          <div className="subhead-pill">
            <Footprints size={13} />
            <span>TERRITORIAL CONTROL & DISTRIBUTION</span>
          </div>
          <h2 className="section-title">Sweeper-Keeper Activity & Passing Telemetry</h2>
          <p className="section-desc">
            Modern goalkeeping demands defending the space behind high defensive lines and initiating attacking phases. Visualise sweeping clearances outside the 18-yard box and distribution accuracy under pressure.
          </p>
        </div>

        {/* Filter Layer Toggles */}
        <div className="matrix-controls-bar">
          <div className="segmented-toggle">
            <button 
              className={`toggle-option ${activeLayer === 'all' ? 'active' : ''}`}
              onClick={() => { playUiClick(); setActiveLayer('all'); }}
            >
              All Telemetry
            </button>
            <button 
              className={`toggle-option ${activeLayer === 'sweeper' ? 'active' : ''}`}
              onClick={() => { playUiClick(); setActiveLayer('sweeper'); }}
            >
              Sweeping Lines
            </button>
            <button 
              className={`toggle-option ${activeLayer === 'distribution' ? 'active' : ''}`}
              onClick={() => { playUiClick(); setActiveLayer('distribution'); }}
            >
              Distribution Vectors
            </button>
          </div>
        </div>
      </div>

      {/* Main Pitch Layout */}
      <div className="pitch-layout-grid">
        {/* Interactive Tactical Football Pitch Canvas */}
        <div className="pitch-canvas-card tactical-pitch-box">
          <div className="pitch-overlay-badges">
            <span className="badge badge-green">PITCH VIEW: DEFENSIVE HALF & TRANSITIONS</span>
            <span className="mono text-xs text-muted">DEFENDING GOAL: BOTTOM</span>
          </div>

          <div className="tactical-pitch-stage">
            <svg 
              className="pitch-svg" 
              viewBox="0 0 1000 650" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="pitchGrass" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0d281a" />
                  <stop offset="50%" stopColor="#091f14" />
                  <stop offset="100%" stopColor="#06160e" />
                </linearGradient>

                {/* Pitch Stripes */}
                <pattern id="grassStripes" width="1000" height="92" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="1000" height="46" fill="rgba(255,255,255,0.015)" />
                  <rect x="0" y="46" width="1000" height="46" fill="rgba(0,0,0,0.03)" />
                </pattern>
              </defs>

              {/* Pitch Base */}
              <rect x="0" y="0" width="1000" height="650" fill="url(#pitchGrass)" />
              <rect x="0" y="0" width="1000" height="650" fill="url(#grassStripes)" />

              {/* Pitch Markings (White lines) */}
              {/* Outer boundary */}
              <rect x="40" y="40" width="920" height="570" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />

              {/* Halfway line */}
              <line x1="40" y1="325" x2="960" y2="325" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
              {/* Center circle */}
              <circle cx="500" cy="325" r="90" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" />
              <circle cx="500" cy="325" r="4" fill="rgba(255,255,255,0.5)" />

              {/* Bottom Goal (Defended by Keeper Alex Rivera) */}
              {/* 18-Yard Penalty Box */}
              <rect x="270" y="450" width="460" height="160" stroke="rgba(255,255,255,0.35)" strokeWidth="3" fill="rgba(0, 245, 155, 0.02)" />
              {/* 6-Yard Goal Area */}
              <rect x="375" y="550" width="250" height="60" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
              {/* Penalty Spot */}
              <circle cx="500" cy="515" r="4" fill="rgba(255,255,255,0.8)" />
              {/* Penalty Arc */}
              <path d="M 430 450 A 70 70 0 0 1 570 450" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
              {/* Goal Line Goal Frame */}
              <rect x="440" y="610" width="120" height="18" fill="rgba(255,255,255,0.7)" stroke="#ffffff" strokeWidth="2" />

              {/* Proactive Sweeper Zone Highlight Band (Between 16m and 28m) */}
              <rect x="230" y="370" width="540" height="80" fill="rgba(0, 210, 255, 0.05)" stroke="rgba(0, 210, 255, 0.2)" strokeDasharray="6 6" rx="8" />
              <text x="500" y="415" fill="rgba(0, 210, 255, 0.5)" fontSize="13" fontFamily="var(--font-mono)" textAnchor="middle">
                PROACTIVE SWEEPER-KEEPER PATROL ZONE (~17.4m)
              </text>

              {/* Distribution Arcs Layer */}
              {(activeLayer === 'all' || activeLayer === 'distribution') && distList.map((dist, idx) => {
                // Map coordinates from [start, end]
                const startX = 500;
                const startY = 580;
                const endX = dist.end[1] * 9.2 + 40;
                const endY = 610 - dist.end[0] * 5.7;

                // Bezier curve control
                const ctrlX = (startX + endX) / 2 + (idx % 2 === 0 ? 30 : -30);
                const ctrlY = (startY + endY) / 2 - 40;

                const isSuccess = dist.success;
                const strokeColor = isSuccess ? '#00f59b' : '#ff385c';

                return (
                  <g 
                    key={dist.id} 
                    className="dist-arc-group"
                    onClick={() => {
                      playUiClick();
                      setSelectedItem({ type: 'distribution', data: dist });
                    }}
                  >
                    <path
                      d={`M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`}
                      stroke={strokeColor}
                      strokeWidth={dist.pressured ? 3 : 2}
                      strokeDasharray={isSuccess ? 'none' : '6 4'}
                      fill="none"
                      opacity="0.8"
                    />
                    {/* Arrow / Landing target circle */}
                    <circle cx={endX} cy={endY} r={6} fill={strokeColor} />
                    <circle cx={endX} cy={endY} r={12} stroke={strokeColor} strokeWidth="1.5" opacity="0.4" />
                  </g>
                );
              })}

              {/* Sweeper Actions Layer (Pins) */}
              {(activeLayer === 'all' || activeLayer === 'sweeper') && sweeperList.map((sw) => {
                // Map coordinates
                const pinX = sw.y * 9.2 + 40;
                const pinY = 610 - sw.x * 5.7;

                return (
                  <g 
                    key={sw.id} 
                    className="sweeper-pin-group"
                    onClick={() => {
                      playUiClick();
                      setSelectedItem({ type: 'sweeper', data: sw });
                    }}
                  >
                    <circle cx={pinX} cy={pinY} r={16} fill="rgba(0, 210, 255, 0.25)" className="pin-pulse" />
                    <circle cx={pinX} cy={pinY} r={8} fill="#00d2ff" stroke="#ffffff" strokeWidth="2" />
                    <text x={pinX} y={pinY - 14} fill="#00d2ff" fontSize="11" fontWeight="700" fontFamily="var(--font-mono)" textAnchor="middle">
                      {sw.minute}'
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right: Telemetry Information & Selected Event Card */}
        <div className="pitch-info-sidebar glass-panel">
          <div className="sidebar-top">
            <span className="badge badge-cyan mono">SPATIAL TELEMETRY</span>
            <h3 className="sidebar-title">Distribution & Space Mastery</h3>
            <p className="text-secondary text-sm">
              Click any passing vector or sweeper pin to examine player position, pressure index, and tactical context.
            </p>
          </div>

          {/* Active Selection Details */}
          {selectedItem ? (
            <div className="selected-telemetry-box glass-card animate-fade-in">
              <div className="selection-badge-row">
                <span className={`badge ${selectedItem.type === 'sweeper' ? 'badge-cyan' : 'badge-green'}`}>
                  {selectedItem.type === 'sweeper' ? 'SWEEPER ACTION' : 'DISTRIBUTION PASS'}
                </span>
                <span className="mono text-xs text-muted">LIVE TELEMETRY</span>
              </div>

              {selectedItem.type === 'sweeper' ? (
                <div className="selection-details">
                  <h4 className="detail-action-name text-neon-cyan">{selectedItem.data.action}</h4>
                  <div className="detail-meta-list mono">
                    <div className="meta-item">
                      <span className="text-muted">Match Minute:</span>
                      <strong>{selectedItem.data.minute}'</strong>
                    </div>
                    <div className="meta-item">
                      <span className="text-muted">Distance from Goal:</span>
                      <strong className="text-neon-cyan">~{selectedItem.data.x} meters</strong>
                    </div>
                    <div className="meta-item">
                      <span className="text-muted">Opposition:</span>
                      <strong>{selectedItem.data.match}</strong>
                    </div>
                    <div className="meta-item">
                      <span className="text-muted">Outcome:</span>
                      <strong className="text-neon-green">Clean Possession Regained</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="selection-details">
                  <h4 className="detail-action-name text-neon-green">{selectedItem.data.type}</h4>
                  <div className="detail-meta-list mono">
                    <div className="meta-item">
                      <span className="text-muted">Target Area:</span>
                      <strong>Attacking Third Flank</strong>
                    </div>
                    <div className="meta-item">
                      <span className="text-muted">Opponent Press:</span>
                      <strong className={selectedItem.data.pressured ? 'text-neon-gold' : 'text-neon-green'}>
                        {selectedItem.data.pressured ? 'High Pressure' : 'Unpressured'}
                      </strong>
                    </div>
                    <div className="meta-item">
                      <span className="text-muted">Execution:</span>
                      <strong className={selectedItem.data.success ? 'text-neon-green' : 'text-neon-red'}>
                        {selectedItem.data.success ? 'Retained Possession' : 'Lost / Contested'}
                      </strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="selection-empty-hint glass-card text-center">
              <Footprints size={24} className="text-neon-cyan mx-auto mb-2 opacity-60" />
              <p className="text-sm text-secondary">
                Select a line or circle on the pitch to view detailed positional data.
              </p>
            </div>
          )}

          {/* Sweeper & Pass Key Indices */}
          <div className="territory-stat-bars">
            <div className="telemetry-bar-row">
              <div className="bar-labels">
                <span>Short Distribution Build-Up (0-30m)</span>
                <span className="mono text-neon-green">{keeper.seasonStats.passAccuracyShort}%</span>
              </div>
              <div className="custom-progress">
                <div className="progress-fill green" style={{ width: `${keeper.seasonStats.passAccuracyShort}%` }}></div>
              </div>
            </div>

            <div className="telemetry-bar-row">
              <div className="bar-labels">
                <span>Long Diagonal & Punts (&gt;45m)</span>
                <span className="mono text-neon-cyan">{keeper.seasonStats.passAccuracyLong}%</span>
              </div>
              <div className="custom-progress">
                <div className="progress-fill cyan" style={{ width: `${keeper.seasonStats.passAccuracyLong}%` }}></div>
              </div>
            </div>

            <div className="telemetry-bar-row">
              <div className="bar-labels">
                <span>High Line Sweeping Engagement</span>
                <span className="mono text-neon-gold">{keeper.seasonStats.avgSweepingDist}</span>
              </div>
              <div className="custom-progress">
                <div className="progress-fill gold" style={{ width: '84%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
