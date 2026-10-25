import React, { useEffect, useState } from 'react';
import { 
  ArrowRight,
  Check,
  Clock3,
  Hand,
  Play,
  RotateCcw,
  Sparkles, 
  ShieldCheck, 
  Compass, 
  Flame, 
  Target, 
  Zap, 
  Award,
  Eye,
  Layers
} from 'lucide-react';
import { playUiClick, playSaveSound } from '../utils/audio';

const GOAL_ZONES = [
  { label: 'Top left', shortLabel: 'Top left' },
  { label: 'Top center', shortLabel: 'Top center' },
  { label: 'Top right', shortLabel: 'Top right' },
  { label: 'Middle left', shortLabel: 'Middle left' },
  { label: 'Center', shortLabel: 'Center' },
  { label: 'Middle right', shortLabel: 'Middle right' },
  { label: 'Bottom left', shortLabel: 'Bottom left' },
  { label: 'Bottom center', shortLabel: 'Bottom center' },
  { label: 'Bottom right', shortLabel: 'Bottom right' }
];

const randomGoalZone = () => Math.floor(Math.random() * GOAL_ZONES.length);

export function ThreeDBeautificationBanner() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab3D, setActiveTab3D] = useState('philosophy');
  const [game, setGame] = useState({
    status: 'idle',
    shots: 0,
    saves: 0,
    target: null,
    shotResolved: false,
    result: ''
  });

  useEffect(() => {
    if (game.status !== 'playing') return undefined;

    const timeout = window.setTimeout(() => {
      setGame(current => {
        if (current.status !== 'playing' || current.shotResolved) return current;

        return {
          ...current,
          shots: current.shots + 1,
          shotResolved: true,
          result: 'GOAL — react faster on the next shot.'
        };
      });
    }, 2200);

    return () => window.clearTimeout(timeout);
  }, [game.status, game.shotResolved, game.shots, game.target]);

  useEffect(() => {
    if (game.status !== 'playing' || !game.shotResolved) return undefined;

    const timeout = window.setTimeout(() => {
      setGame(current => {
        if (current.status !== 'playing' || !current.shotResolved) return current;
        if (current.shots >= 5) return { ...current, status: 'complete' };

        return {
          ...current,
          target: randomGoalZone(),
          shotResolved: false,
          result: ''
        };
      });
    }, 900);

    return () => window.clearTimeout(timeout);
  }, [game.status, game.shotResolved, game.shots]);

  const startGame = () => {
    playUiClick();
    setGame({
      status: 'playing',
      shots: 0,
      saves: 0,
      target: randomGoalZone(),
      shotResolved: false,
      result: ''
    });
  };

  const diveForShot = (zoneIndex) => {
    if (game.status !== 'playing' || game.shotResolved) return;
    playUiClick();
    if (zoneIndex === game.target) playSaveSound();

    setGame(current => {
      if (current.status !== 'playing' || current.shotResolved) return current;
      const saved = zoneIndex === current.target;

      return {
        ...current,
        shots: current.shots + 1,
        saves: current.saves + Number(saved),
        shotResolved: true,
        result: saved ? 'SAVE! Perfect dive.' : 'GOAL — read the shot and try again.'
      };
    });
  };

  return (
    <section className="threed-beautification-section glass-panel">
      {/* 3D Ambient Background Lights */}
      <div className="threed-ambient-glow" />

      {/* Main Beautification Grid */}
      <div className="threed-grid-layout">
        {/* Left Side: 3D Interactive Floating Goalpost Stage */}
        <div 
          className={`threed-stage-card ${isHovered ? 'hovered-3d' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* 3D Perspective Canvas Container */}
          <div className="threed-viewport-box">
            {/* 3D Goal Assembly */}
            <div className="goal-3d-assembly">
              {/* Backing Sunset Light */}
              <div className="threed-sunset-radial" />

              {/* 3D Goal Wireframe SVG */}
              <svg viewBox="0 0 460 260" className="goal-3d-svg">
                <defs>
                  <linearGradient id="goalPostGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="40%" stopColor="#e2e8f0" />
                    <stop offset="100%" stopColor="#94a3b8" />
                  </linearGradient>
                  <linearGradient id="laserBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ea580c" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>

                {/* Ground Turf 3D Plane */}
                <polygon points="30,220 430,220 400,250 60,250" fill="rgba(5, 150, 105, 0.15)" stroke="rgba(5, 150, 105, 0.3)" strokeWidth="1.5" />
                <line x1="30" y1="220" x2="430" y2="220" stroke="#cbd5e1" strokeWidth="2.5" />

                {/* 3D Net Geometry */}
                {/* Rear Net Line */}
                <polygon points="90,70 370,70 410,220 50,220" fill="rgba(15, 23, 42, 0.03)" stroke="rgba(203, 213, 225, 0.6)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="90" y1="70" x2="370" y2="70" stroke="#cbd5e1" strokeWidth="1.5" />

                {/* Depth Connectors (Roof Net) */}
                <line x1="50" y1="50" x2="90" y2="70" stroke="#94a3b8" strokeWidth="2" />
                <line x1="410" y1="50" x2="370" y2="70" stroke="#94a3b8" strokeWidth="2" />

                {/* Front White Posts (7.32m x 2.44m Perspective) */}
                {/* Left Post */}
                <line x1="50" y1="50" x2="50" y2="220" stroke="url(#goalPostGrad)" strokeWidth="6" strokeLinecap="round" filter="drop-shadow(2px 4px 6px rgba(0,0,0,0.15))" />
                {/* Right Post */}
                <line x1="410" y1="50" x2="410" y2="220" stroke="url(#goalPostGrad)" strokeWidth="6" strokeLinecap="round" filter="drop-shadow(-2px 4px 6px rgba(0,0,0,0.15))" />
                {/* Crossbar */}
                <line x1="50" y1="50" x2="410" y2="50" stroke="url(#goalPostGrad)" strokeWidth="6" strokeLinecap="round" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.15))" />

                {/* Floating 3D Shot Trajectory & Save Impact */}
                <path d="M 230,240 Q 280,140 375,70" fill="none" stroke="url(#laserBeam)" strokeWidth="3" strokeDasharray="6 4" className="shot-trajectory-beam" />

                {/* Save Glove Impact Ripple */}
                <circle cx="375" cy="70" r="14" fill="rgba(234, 88, 12, 0.25)" className="impact-pulse" />
                <circle cx="375" cy="70" r="8" fill="#ea580c" />
                <circle cx="375" cy="70" r="4" fill="#ffffff" />
              </svg>

              {/* 3D Floating Interactive Spherical Ball */}
              <div className="threed-floating-ball-wrap">
                <div className="threed-sphere-ball">
                  <div className="sphere-texture" />
                  <div className="sphere-specular" />
                </div>
                <div className="sphere-ground-shadow" />
              </div>
            </div>

            <div className="threed-hint-badge mono">
              <Eye size={12} className="text-neon-gold" />
              <span>3D SPATIAL TELEMETRY • HOVER FOR PARALLAX</span>
            </div>
          </div>
        </div>

        {/* Right Side: Inspirational Goalkeeper Taglines & Beautification */}
        <div className="threed-content-col">
          <div className="subhead-pill">
            <Sparkles size={14} className="text-neon-gold" />
            <span>THE GOALKEEPER’S CALLING</span>
          </div>

          <h2 className="threed-main-title">
            "The Last Line of Defense.<br />
            <span className="text-neon-gold">The First Spark of Victory."</span>
          </h2>

          <p className="threed-manifesto-text">
            While ninety thousand spectators fixate on the strikers, the goalkeeper stands alone. Seventy-eight square meters of green grass to defend. Fractions of a second to decide whether to hold, parry, rush, or command.
          </p>

          {/* Inspirational Tagline Highlights */}
          <div className="taglines-quote-cards">
            <div className="quote-micro-card">
              <div className="quote-icon-dot gold"></div>
              <div className="quote-text-wrap">
                <strong className="quote-lead">"Between Defeat and Glory"</strong>
                <p className="quote-sub">Every clean sheet is a testament to split-second geometry, fearless aerial command, and unrelenting composure.</p>
              </div>
            </div>

            <div className="quote-micro-card">
              <div className="quote-icon-dot green"></div>
              <div className="quote-text-wrap">
                <strong className="quote-lead">"Quantifying the Heroism"</strong>
                <p className="quote-sub">No longer reduced to goals conceded. Measuring Post-Shot Expected Goals, sweeping depth, and game-saving parries.</p>
              </div>
            </div>

            <div className="quote-micro-card">
              <div className="quote-icon-dot cyan"></div>
              <div className="quote-text-wrap">
                <strong className="quote-lead">"The Eleventh Outfield Playmaker"</strong>
                <p className="quote-sub">Initiating counterattacks with 60-meter driven volleys and neutralizing through-balls 20 meters outside the box.</p>
              </div>
            </div>
          </div>

          {/* 3 Key Spatial Metrics Bar */}
          <div className="threed-metrics-trio mono">
            <div className="trio-metric-tile">
              <span className="metric-tag">REACTION TIME</span>
              <strong className="metric-num text-neon-gold">0.18s</strong>
              <span className="metric-note">Neural Reflex Threshold</span>
            </div>
            <div className="trio-metric-tile">
              <span className="metric-tag">GOAL FRAME AREA</span>
              <strong className="metric-num">17.86 m²</strong>
              <span className="metric-note">Standard 7.32m × 2.44m</span>
            </div>
            <div className="trio-metric-tile">
              <span className="metric-tag">PSxG ACCURACY</span>
              <strong className="metric-num text-neon-green">99.4%</strong>
              <span className="metric-note">Opta-Grade Telemetry</span>
            </div>
          </div>
        </div>
      </div>

      <div className="keeper-game-panel">
        <div className="keeper-game-heading">
          <div>
            <div className="subhead-pill">
              <Hand size={14} />
              <span>REFLEX CHALLENGE</span>
            </div>
            <h3 className="keeper-game-title">Can you keep it out?</h3>
            <p className="keeper-game-description">
              Dive to the highlighted zone before the 2.2-second shot clock runs out. Make five saves to complete the challenge.
            </p>
          </div>
          <div className="keeper-game-score mono" aria-live="polite">
            <span>SAVES</span>
            <strong>{game.saves}<span> / 5</span></strong>
          </div>
        </div>

        <div className="keeper-game-play-area">
          <div
            className={`keeper-game-goal ${game.status === 'playing' && !game.shotResolved ? 'is-live' : ''}`}
            role="group"
            aria-label="Goalkeeper dive controls"
          >
            {GOAL_ZONES.map((zone, index) => (
              <button
                key={zone.label}
                type="button"
                className={`keeper-game-zone ${game.target === index && game.status === 'playing' ? 'shot-target' : ''}`}
                aria-label={`Dive ${zone.label}${game.target === index && game.status === 'playing' ? ', shot incoming' : ''}`}
                disabled={game.status !== 'playing' || game.shotResolved}
                onClick={() => diveForShot(index)}
              >
                {game.target === index && game.status === 'playing' && !game.shotResolved
                  ? <span className="keeper-game-ball" aria-hidden="true">●</span>
                  : <span className="keeper-game-zone-label">{zone.shortLabel}</span>}
              </button>
            ))}
          </div>

          <div className="keeper-game-controls">
            <p className={`keeper-game-status ${game.result.startsWith('SAVE') ? 'is-save' : ''}`} aria-live="polite">
              {game.status === 'idle' && 'Ready when you are. Start the challenge to face five shots.'}
              {game.status === 'playing' && !game.shotResolved && (
                <><Clock3 size={15} /> Shot incoming — dive to the ball!</>
              )}
              {game.status === 'playing' && game.shotResolved && game.result}
              {game.status === 'complete' && `Full time! You saved ${game.saves} of 5 shots.`}
            </p>

            {game.status === 'idle' ? (
              <button className="btn btn-primary keeper-game-start" type="button" onClick={startGame}>
                <Play size={15} /> Start challenge
              </button>
            ) : game.status === 'complete' ? (
              <button className="btn btn-secondary keeper-game-start" type="button" onClick={startGame}>
                <RotateCcw size={15} /> Play again <ArrowRight size={15} />
              </button>
            ) : (
              <div className="keeper-game-progress" aria-label={`Shot ${Math.min(game.shots + 1, 5)} of 5`}>
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index} className={index < game.shots ? 'is-complete' : ''}>
                    {index < game.saves && index < game.shots ? <Check size={12} /> : index + 1}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
