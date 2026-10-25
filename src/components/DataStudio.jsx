import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sliders, 
  BarChart3, 
  PieChart, 
  ShieldCheck, 
  Target, 
  Flame, 
  Footprints, 
  Compass, 
  Send, 
  Sparkles, 
  Save, 
  RotateCcw,
  TrendingUp,
  Award
} from 'lucide-react';
import { 
  playUiClick, 
  playSaveSound, 
  playCleanSheetFanfare 
} from '../utils/audio';

export function DataStudio({ activeKeeper, onCommitMatchData }) {
  // Manual Input State
  const [opponent, setOpponent] = useState('West Ham United');
  const [matchDate, setMatchDate] = useState(new Date().toISOString().split('T')[0]);
  const [venue, setVenue] = useState('Home');
  const [cleanSheet, setCleanSheet] = useState(true);

  // Core shot metrics
  const [shotsFaced, setShotsFaced] = useState(8);
  const [shotsOnTarget, setShotsOnTarget] = useState(6);
  const [saves, setSaves] = useState(6);
  const [goalsConceded, setGoalsConceded] = useState(0);
  const [psxgFaced, setPsxgFaced] = useState(1.92);

  // Aerial metrics
  const [crossesFaced, setCrossesFaced] = useState(11);
  const [crossesClaimed, setCrossesClaimed] = useState(10);
  const [punches, setPunches] = useState(2);

  // Sweeper & distribution
  const [sweeperClearances, setSweeperClearances] = useState(4);
  const [avgSweepingDist, setAvgSweepingDist] = useState(17.8);
  const [shortPassAttempted, setShortPassAttempted] = useState(25);
  const [shortPassCompleted, setShortPassCompleted] = useState(24);
  const [longPassAttempted, setLongPassAttempted] = useState(12);
  const [longPassCompleted, setLongPassCompleted] = useState(9);

  // Qualitative
  const [matchRating, setMatchRating] = useState(9.1);
  const [notes, setNotes] = useState('Manual telemetry entry: high-press resistance and commanded aerial deliveries.');

  // Derived calculations for graphical displays
  const savePct = shotsOnTarget > 0 ? +((saves / shotsOnTarget) * 100).toFixed(1) : 100;
  const goalsPrevented = +(psxgFaced - goalsConceded).toFixed(2);
  const crossClaimPct = crossesFaced > 0 ? +((crossesClaimed / crossesFaced) * 100).toFixed(1) : 100;
  const shortPassPct = shortPassAttempted > 0 ? +((shortPassCompleted / shortPassAttempted) * 100).toFixed(1) : 100;
  const longPassPct = longPassAttempted > 0 ? +((longPassCompleted / longPassAttempted) * 100).toFixed(1) : 100;
  const totalPassPct = (shortPassAttempted + longPassAttempted) > 0 
    ? +(((shortPassCompleted + longPassCompleted) / (shortPassAttempted + longPassAttempted)) * 100).toFixed(1)
    : 100;

  // Live KVR dynamic formula calculation
  const computedKvr = Math.min(10.0, Math.max(5.0, (
    (savePct * 0.04) + 
    (goalsPrevented * 0.5) + 
    (crossClaimPct * 0.02) + 
    (totalPassPct * 0.015) + 
    (cleanSheet ? 0.8 : 0) + 
    (sweeperClearances * 0.15)
  ))).toFixed(1);

  // Handle clean sheet toggle dependency
  const handleCleanSheetChange = (e) => {
    playUiClick();
    const isCs = e.target.checked;
    setCleanSheet(isCs);
    if (isCs) {
      setGoalsConceded(0);
      setSaves(shotsOnTarget);
    }
  };

  const handleConcededChange = (val) => {
    const num = Math.max(0, parseInt(val) || 0);
    setGoalsConceded(num);
    if (num > 0) {
      setCleanSheet(false);
      setSaves(Math.max(0, shotsOnTarget - num));
    }
  };

  const handleCommitData = (e) => {
    e.preventDefault();
    playSaveSound();

    const matchPayload = {
      id: `m-custom-${Date.now()}`,
      keeperId: activeKeeper.id,
      date: matchDate,
      opponent: opponent || 'Challenger FC',
      venue,
      result: cleanSheet ? `W ${saves > 0 ? '2-0' : '1-0'}` : (goalsConceded < saves ? `W ${saves}-${goalsConceded}` : `D ${goalsConceded}-${goalsConceded}`),
      cleanSheet,
      shotsFaced,
      shotsOnTarget,
      saves,
      goalsConceded,
      psxgFaced,
      goalsPrevented,
      crossesClaimed,
      crossesTotal: crossesFaced,
      sweeperClearances,
      passAccuracy: totalPassPct,
      rating: parseFloat(computedKvr),
      mvp: cleanSheet && goalsPrevented > 1.0,
      notes: notes || 'Manually logged match telemetry via KeeperVerse Data Studio.'
    };

    if (cleanSheet) {
      playCleanSheetFanfare();
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#00f59b', '#00d2ff', '#ffd166', '#ffffff']
      });
    }

    onCommitMatchData(matchPayload);
    alert(`Success! Match vs ${opponent} recorded into official season database.`);
  };

  return (
    <div className="data-studio-section">
      {/* Header */}
      <div className="section-head-row">
        <div>
          <div className="subhead-pill">
            <Sliders size={13} />
            <span>INTERACTIVE DATA STUDIO & VISUALIZER</span>
          </div>
          <h2 className="section-title">Manual Goalkeeper Telemetry & Live Graphical Engine</h2>
          <p className="section-desc">
            Manually enter your real match statistics below. The graphical telemetry engine computes Post-Shot Expected Goals differentials, radial save gauges, and distribution splits in real time.
          </p>
        </div>

        <div className="dossier-actions-bar">
          <span className="badge badge-green mono">LIVE COMPUTE ACTIVE</span>
        </div>
      </div>

      {/* Main Studio Two-Column Grid */}
      <div className="studio-layout-grid">
        {/* Left Column: Manual Data Inputs */}
        <div className="manual-inputs-card glass-panel">
          <div className="card-head-bar">
            <div className="title-pack">
              <span className="mono text-xs text-neon-cyan font-semibold">MATCH PARAMETERS</span>
              <h3 className="card-title">Manual Match Data Input</h3>
            </div>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={() => {
                playUiClick();
                setSaves(5);
                setShotsOnTarget(6);
                setGoalsConceded(1);
                setCleanSheet(false);
                setPsxgFaced(1.75);
              }}
            >
              <RotateCcw size={12} /> Reset to Defaults
            </button>
          </div>

          <form onSubmit={handleCommitData} className="studio-form">
            {/* Meta Row */}
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Opponent Club</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={opponent} 
                  onChange={e => setOpponent(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Match Date</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={matchDate} 
                  onChange={e => setMatchDate(e.target.value)} 
                />
              </div>
            </div>

            {/* Clean Sheet Checkbox */}
            <div className={`clean-sheet-toggle-card ${cleanSheet ? 'active-clean-sheet' : ''} mb-3`}>
              <label className="clean-sheet-label">
                <input 
                  type="checkbox" 
                  checked={cleanSheet} 
                  onChange={handleCleanSheetChange} 
                />
                <div className="clean-sheet-text">
                  <div className="cs-title">
                    <ShieldCheck size={16} className="text-neon-green" />
                    <strong>Clean Sheet Maintained (0 Goals Conceded)</strong>
                  </div>
                  <span className="cs-desc">Boosts KVR index and goals prevented performance.</span>
                </div>
              </label>
            </div>

            {/* Shot Stopping Group */}
            <div className="input-category-box glass-card mb-3">
              <div className="cat-header">
                <Target size={15} className="text-neon-green" />
                <span className="cat-title">Shot-Stopping & PSxG Telemetry</span>
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label className="form-label">Shots Faced Total</label>
                  <input 
                    type="number" 
                    min="0" 
                    className="form-input" 
                    value={shotsFaced} 
                    onChange={e => setShotsFaced(Math.max(0, parseInt(e.target.value) || 0))} 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Shots On Target</label>
                  <input 
                    type="number" 
                    min="0" 
                    className="form-input" 
                    value={shotsOnTarget} 
                    onChange={e => {
                      const v = Math.max(0, parseInt(e.target.value) || 0);
                      setShotsOnTarget(v);
                      setSaves(Math.max(0, v - goalsConceded));
                    }} 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Goals Conceded</label>
                  <input 
                    type="number" 
                    min="0" 
                    className="form-input" 
                    value={goalsConceded} 
                    onChange={e => handleConcededChange(e.target.value)} 
                  />
                </div>
              </div>

              {/* PSxG Slider Input */}
              <div className="slider-group mt-2">
                <div className="slider-label-row">
                  <span className="form-label">Post-Shot Expected Goals (PSxG) Faced</span>
                  <span className="mono text-neon-gold font-bold">{psxgFaced.toFixed(2)} xG</span>
                </div>
                <input 
                  type="range" 
                  min="0.10" 
                  max="5.00" 
                  step="0.05" 
                  value={psxgFaced} 
                  onChange={e => setPsxgFaced(parseFloat(e.target.value))} 
                  className="w-full"
                />
                <span className="mono text-xs text-muted">
                  Drag slider to simulate higher or lower shot difficulty faced.
                </span>
              </div>
            </div>

            {/* Aerial Box Command Group */}
            <div className="input-category-box glass-card mb-3">
              <div className="cat-header">
                <Compass size={15} className="text-neon-cyan" />
                <span className="cat-title">Aerial & Cross Claims</span>
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label className="form-label">Crosses Delivered</label>
                  <input 
                    type="number" 
                    min="0" 
                    className="form-input" 
                    value={crossesFaced} 
                    onChange={e => setCrossesFaced(Math.max(0, parseInt(e.target.value) || 0))} 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Crosses Claimed</label>
                  <input 
                    type="number" 
                    min="0" 
                    className="form-input" 
                    value={crossesClaimed} 
                    onChange={e => setCrossesClaimed(Math.max(0, parseInt(e.target.value) || 0))} 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Controlled Punches</label>
                  <input 
                    type="number" 
                    min="0" 
                    className="form-input" 
                    value={punches} 
                    onChange={e => setPunches(Math.max(0, parseInt(e.target.value) || 0))} 
                  />
                </div>
              </div>
            </div>

            {/* Sweeper & Distribution */}
            <div className="input-category-box glass-card mb-3">
              <div className="cat-header">
                <Footprints size={15} className="text-neon-gold" />
                <span className="cat-title">Sweeping & Distribution Precision</span>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Sweeps Outside Box</label>
                  <input 
                    type="number" 
                    min="0" 
                    className="form-input" 
                    value={sweeperClearances} 
                    onChange={e => setSweeperClearances(Math.max(0, parseInt(e.target.value) || 0))} 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Avg Sweeper Dist (m)</label>
                  <input 
                    type="number" 
                    step="0.5" 
                    className="form-input" 
                    value={avgSweepingDist} 
                    onChange={e => setAvgSweepingDist(parseFloat(e.target.value) || 15)} 
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Short Passes (Completed / Total)</label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      className="form-input" 
                      value={shortPassCompleted} 
                      onChange={e => setShortPassCompleted(parseInt(e.target.value) || 0)} 
                    />
                    <input 
                      type="number" 
                      className="form-input" 
                      value={shortPassAttempted} 
                      onChange={e => setShortPassAttempted(parseInt(e.target.value) || 0)} 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Long Balls (Completed / Total)</label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      className="form-input" 
                      value={longPassCompleted} 
                      onChange={e => setLongPassCompleted(parseInt(e.target.value) || 0)} 
                    />
                    <input 
                      type="number" 
                      className="form-input" 
                      value={longPassAttempted} 
                      onChange={e => setLongPassAttempted(parseInt(e.target.value) || 0)} 
                    />
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full py-3 mt-3 font-bold">
              <Save size={16} /> Commit Match Telemetry to Season Records
            </button>
          </form>
        </div>

        {/* Right Column: Live Graphical Visualizations */}
        <div className="graphical-results-col glass-panel p-4">
          <div className="card-head-bar mb-3">
            <div className="title-pack">
              <span className="mono text-xs text-neon-green font-semibold">REAL-TIME VISUAL FEEDBACK</span>
              <h3 className="card-title">Live Graphical Visualizations</h3>
            </div>
            <div className="live-pill mono">
              <span className="pulse-dot"></span> UPDATING
            </div>
          </div>

          <div className="graphs-stack">
            {/* Visual 1: Goals Prevented Differential Bar (PSxG vs Actual Conceded) */}
            <div className="graph-card glass-card">
              <div className="graph-card-header">
                <div>
                  <span className="mono text-xs text-muted">PRIMARY EFFICIENCY METRIC</span>
                  <h4 className="graph-heading">Goals Prevented Differential (PSxG vs Conceded)</h4>
                </div>
                <span className={`badge ${goalsPrevented >= 0 ? 'badge-green' : 'badge-red'} mono text-sm`}>
                  {goalsPrevented >= 0 ? `+${goalsPrevented}` : goalsPrevented} NET
                </span>
              </div>

              {/* Comparative Dual Bars */}
              <div className="differential-bars-wrap mt-3">
                <div className="diff-bar-item">
                  <div className="diff-bar-meta">
                    <span className="text-secondary text-xs">Post-Shot xG Faced:</span>
                    <strong className="mono text-neon-gold">{psxgFaced.toFixed(2)}</strong>
                  </div>
                  <div className="diff-track">
                    <div 
                      className="diff-bar-fill gold" 
                      style={{ width: `${Math.min(100, (psxgFaced / 4.0) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="diff-bar-item mt-2">
                  <div className="diff-bar-meta">
                    <span className="text-secondary text-xs">Actual Goals Conceded:</span>
                    <strong className="mono text-neon-red">{goalsConceded}</strong>
                  </div>
                  <div className="diff-track">
                    <div 
                      className="diff-bar-fill red" 
                      style={{ width: `${Math.min(100, (goalsConceded / 4.0) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="graph-verdict-note mt-3">
                <Sparkles size={14} className="text-neon-green" />
                <span className="text-xs">
                  {goalsPrevented > 0 
                    ? `Overperformed shot quality by stopping +${goalsPrevented} more goals than average!` 
                    : `Conceded ${Math.abs(goalsPrevented)} goals above expected value.`}
                </span>
              </div>
            </div>

            {/* Visual 2: Radial Save Percentage Speedometer & Aerial Donut */}
            <div className="graph-duo-row">
              {/* Radial Save % Meter */}
              <div className="graph-card glass-card flex-1">
                <div className="graph-card-header">
                  <span className="mono text-xs text-muted">SAVE RATIO</span>
                  <Target size={14} className="text-neon-cyan" />
                </div>

                <div className="radial-meter-box">
                  <svg viewBox="0 0 120 120" className="radial-svg">
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="46" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.08)" 
                      strokeWidth="10" 
                    />
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="46" 
                      fill="none" 
                      stroke={savePct >= 80 ? '#00f59b' : savePct >= 70 ? '#00d2ff' : '#ff385c'} 
                      strokeWidth="10" 
                      strokeDasharray="289"
                      strokeDashoffset={289 - (289 * (savePct / 100))}
                      strokeLinecap="round"
                      transform="rotate(-90 60 60)"
                      style={{ transition: 'stroke-dashoffset 0.4s ease' }}
                    />
                  </svg>
                  <div className="radial-center-val">
                    <span className="radial-num mono">{savePct}%</span>
                    <span className="radial-sub text-muted text-xs">Save Acc</span>
                  </div>
                </div>

                <div className="text-center text-xs text-muted mono mt-2">
                  {saves} Saves / {shotsOnTarget} On-Target
                </div>
              </div>

              {/* Aerial Cross Claim Meter */}
              <div className="graph-card glass-card flex-1">
                <div className="graph-card-header">
                  <span className="mono text-xs text-muted">CROSS CLAIMING</span>
                  <Compass size={14} className="text-purple" />
                </div>

                <div className="radial-meter-box">
                  <svg viewBox="0 0 120 120" className="radial-svg">
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="46" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.08)" 
                      strokeWidth="10" 
                    />
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="46" 
                      fill="none" 
                      stroke="#9b5de5" 
                      strokeWidth="10" 
                      strokeDasharray="289"
                      strokeDashoffset={289 - (289 * (crossClaimPct / 100))}
                      strokeLinecap="round"
                      transform="rotate(-90 60 60)"
                      style={{ transition: 'stroke-dashoffset 0.4s ease' }}
                    />
                  </svg>
                  <div className="radial-center-val">
                    <span className="radial-num mono text-purple">{crossClaimPct}%</span>
                    <span className="radial-sub text-muted text-xs">Claim Rate</span>
                  </div>
                </div>

                <div className="text-center text-xs text-muted mono mt-2">
                  {crossesClaimed} Claimed / {crossesFaced} Crosses
                </div>
              </div>
            </div>

            {/* Visual 3: Distribution Accuracy Split (Short vs Long) */}
            <div className="graph-card glass-card">
              <div className="graph-card-header">
                <div>
                  <span className="mono text-xs text-muted">PASS PROFILE</span>
                  <h4 className="graph-heading">Distribution Delivery Breakdown</h4>
                </div>
                <Send size={15} className="text-neon-cyan" />
              </div>

              <div className="dist-split-bars mt-2">
                <div className="bar-row">
                  <div className="bar-meta">
                    <span className="text-xs">Short Play-Out Build-Up:</span>
                    <strong className="mono text-neon-green">{shortPassPct}% ({shortPassCompleted}/{shortPassAttempted})</strong>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill green" style={{ width: `${shortPassPct}%` }}></div>
                  </div>
                </div>

                <div className="bar-row mt-2">
                  <div className="bar-meta">
                    <span className="text-xs">Long Launched Balls / Punts:</span>
                    <strong className="mono text-neon-cyan">{longPassPct}% ({longPassCompleted}/{longPassAttempted})</strong>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill cyan" style={{ width: `${longPassPct}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual 4: Live Overall KVR Meter */}
            <div className="graph-card glass-card highlight-card">
              <div className="kvr-live-summary-grid">
                <div>
                  <span className="mono text-xs text-neon-green font-semibold">SYNTHESIZED RATING</span>
                  <h4 className="text-lg font-bold text-white mt-1">KeeperVerse Index (KVR)</h4>
                  <p className="text-xs text-secondary mt-1">
                    Weighted algorithmic evaluation integrating save efficiency, PSxG differential, box commands, and press-resistant distribution.
                  </p>
                </div>
                <div className="kvr-score-stamp">
                  <span className="kvr-big-val mono text-neon-green">{computedKvr}</span>
                  <span className="kvr-denom mono">/ 10.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
