import React from 'react';
import { 
  Award, 
  Sparkles, 
  Target, 
  Flame, 
  ShieldCheck, 
  Zap, 
  Printer, 
  Download,
  AlertCircle,
  Dumbbell
} from 'lucide-react';
import { DRILLS_LIBRARY } from '../data/mockData';
import { playUiClick } from '../utils/audio';

export function ScoutReportGenerator({ keeper }) {
  if (!keeper) return null;
  const attr = keeper.attributes;
  const stats = keeper.seasonStats;

  // Radar chart mathematical coordinates (SVG polygon)
  // Axes: Shot Stopping, Sweeping, Distribution, Box Command, Handling, Composure
  const radarAxes = [
    { label: 'Shot-Stopping', value: attr.shotStopping },
    { label: 'Sweeping', value: attr.sweeping },
    { label: 'Distribution', value: attr.distribution },
    { label: 'Box Command', value: attr.boxCommand },
    { label: 'Handling', value: attr.handling },
    { label: 'Composure', value: attr.composure }
  ];

  const totalAxes = radarAxes.length;
  const center = 160;
  const radius = 110;

  // Generate SVG polygon points for keeper
  const points = radarAxes.map((axis, i) => {
    const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
    const r = (axis.value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  // Background web rings
  const ringLevels = [0.25, 0.5, 0.75, 1.0];

  const handlePrintDossier = () => {
    playUiClick();
    window.print();
  };

  return (
    <div className="scout-dossier-section">
      <div className="section-head-row">
        <div>
          <div className="subhead-pill">
            <Award size={13} />
            <span>SCOUT & ACADEMY DEVELOPMENT INTELLIGENCE</span>
          </div>
          <h2 className="section-title">Official Goalkeeper Scouting Dossier</h2>
          <p className="section-desc">
            Standardised technical and psychological evaluation dossier used by scouts, college recruiters, and goalkeeper coaches.
          </p>
        </div>

        <div className="dossier-actions-bar">
          <button className="btn btn-secondary" onClick={handlePrintDossier}>
            <Printer size={15} />
            <span>Print / Export Dossier</span>
          </button>
        </div>
      </div>

      {/* Dossier Sheet Layout */}
      <div className="dossier-card glass-panel">
        {/* Dossier Header */}
        <div className="dossier-official-header">
          <div className="dossier-badge-col">
            <span className="official-stamp mono">VERIFIED TELEMETRY • KEEPERVERSE 2026</span>
            <h3 className="dossier-player-title">{keeper.name}</h3>
            <span className="dossier-player-club">{keeper.team} • {keeper.level}</span>
          </div>
          <div className="dossier-rating-seal">
            <div className="seal-circle">
              <span className="seal-title mono">KVR SCORE</span>
              <span className="seal-number mono">{keeper.kvrRating}</span>
              <span className="seal-sub">CLASS TIER 1</span>
            </div>
          </div>
        </div>

        {/* Radar & Core Attributes Grid */}
        <div className="dossier-main-grid">
          {/* Left: SVG Hexagonal Radar Chart */}
          <div className="radar-stage-box glass-card">
            <div className="radar-title-row">
              <span className="mono text-xs text-neon-green font-semibold">ATTRIBUTES OCTANT RADAR</span>
              <span className="mono text-xs text-muted">SAMPLE: 100-PT SCALE</span>
            </div>

            <div className="radar-svg-wrapper">
              <svg viewBox="0 0 320 320" className="radar-svg">
                {/* Background Concentric Rings */}
                {ringLevels.map((lvl, idx) => {
                  const ringPoints = radarAxes.map((_, i) => {
                    const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
                    const r = lvl * radius;
                    const x = center + r * Math.cos(angle);
                    const y = center + r * Math.sin(angle);
                    return `${x},${y}`;
                  }).join(' ');
                  return (
                    <polygon
                      key={idx}
                      points={ringPoints}
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Spoke Lines */}
                {radarAxes.map((_, i) => {
                  const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
                  const x = center + radius * Math.cos(angle);
                  const y = center + radius * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1={center}
                      y1={center}
                      x2={x}
                      y2={y}
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Goalkeeper Value Polygon */}
                <polygon
                  points={points}
                  fill="rgba(0, 245, 155, 0.28)"
                  stroke="#00f59b"
                  strokeWidth="2.5"
                  filter="drop-shadow(0 0 10px rgba(0,245,155,0.4))"
                />

                {/* Axis Labels */}
                {radarAxes.map((axis, i) => {
                  const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
                  const labelR = radius + 22;
                  const x = center + labelR * Math.cos(angle);
                  const y = center + labelR * Math.sin(angle) + 4;
                  return (
                    <text
                      key={i}
                      x={x}
                      y={y}
                      fill="#94a3b8"
                      fontSize="10"
                      fontFamily="var(--font-mono)"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      {axis.label} ({axis.value})
                    </text>
                  );
                })}
              </svg>
            </div>

            <div className="archetype-badge-box">
              <span className="mono text-xs text-muted">TACTICAL CLASSIFICATION:</span>
              <strong className="text-neon-cyan">{keeper.archetype}</strong>
            </div>
          </div>

          {/* Right: Scout Diagnostic Matrix */}
          <div className="dossier-insights-col">
            {/* Strengths */}
            <div className="insight-card strengths-card glass-card">
              <div className="card-head">
                <Sparkles size={16} className="text-neon-green" />
                <h4 className="card-title">Verified Key Strengths</h4>
              </div>
              <ul className="bullet-list">
                <li>
                  <strong>Post-Shot Shot Stopping (+{stats.goalsPrevented} PSxG):</strong> In the 94th percentile for goalkeepers at this level. Consistently tips high-trajectory shots around the post.
                </li>
                <li>
                  <strong>Sweeping Line Depth ({stats.avgSweepingDist}):</strong> Reads game development 1-2 seconds early, snuffing out through-balls before attacking strikers can reach them.
                </li>
                <li>
                  <strong>Cross-Claim Certainty ({stats.crossClaimSuccessRate}%):</strong> High-point catch mechanics are clean; rarely relies on unsafe deflection punches.
                </li>
              </ul>
            </div>

            {/* Development Work-Ons */}
            <div className="insight-card workon-card glass-card">
              <div className="card-head">
                <AlertCircle size={16} className="text-neon-gold" />
                <h4 className="card-title">Development Work-Ons & Blindspots</h4>
              </div>
              <ul className="bullet-list">
                <li>
                  <strong>Low-Corner Rapid Collapse:</strong> Slight tendency to open 5-hole on fast skidding strikes from cutback angles.
                </li>
                <li>
                  <strong>Long Goal-Kick Launch Precision:</strong> Punts beyond 55m currently yield a 68% retention rate; recommend transitioning to low-trajectory side-spin half-volleys.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recommended Targeted Training Modules */}
        <div className="dossier-drills-wrap">
          <div className="drills-header-line">
            <Dumbbell size={16} className="text-neon-green" />
            <h4 className="drills-title">Prescribed Academy Drills for Targeted Growth</h4>
          </div>

          <div className="drills-grid">
            {DRILLS_LIBRARY.slice(0, 3).map((drill) => (
              <div key={drill.id} className="dossier-drill-card glass-card">
                <div className="drill-tag-row">
                  <span className="badge badge-green">{drill.category}</span>
                  <span className="mono text-xs text-neon-gold">{drill.intensity} Intensity</span>
                </div>
                <h5 className="drill-card-name">{drill.title}</h5>
                <p className="drill-card-desc">{drill.description}</p>
                <div className="drill-footer mono text-xs text-muted">
                  <span>Target Zone: {drill.targetZone}</span>
                  <span>•</span>
                  <span>{drill.frequency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
