import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  ShieldCheck, 
  Target, 
  Flame, 
  Plus, 
  Compass, 
  Footprints, 
  Sparkles,
  Trophy,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';
import { GOAL_ZONES } from '../data/mockData';
import { 
  playUiClick, 
  playSaveSound, 
  playGoalConcededSound, 
  playCleanSheetFanfare 
} from '../utils/audio';

export function MatchEventLogger({ isOpen, onClose, activeKeeper, onSaveMatch }) {
  if (!isOpen) return null;

  // Match meta
  const [opponent, setOpponent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [venue, setVenue] = useState('Home');
  const [matchResult, setMatchResult] = useState('W 1-0');
  const [cleanSheet, setCleanSheet] = useState(true);
  const [matchRating, setMatchRating] = useState('8.5');
  const [matchNotes, setMatchNotes] = useState('');

  // Active Logging Tab: 'shots' | 'crosses' | 'sweeping' | 'distribution'
  const [eventType, setEventType] = useState('shots');

  // Shot event state
  const [selectedZone, setSelectedZone] = useState('TR');
  const [shotDistance, setShotDistance] = useState('16m (Edge of Box)');
  const [shotTechnique, setShotTechnique] = useState('Diving Fingertip Save');
  const [shotOutcome, setShotOutcome] = useState('Saved'); // 'Saved' | 'Conceded'
  const [shotMinute, setShotMinute] = useState('34');

  // Match cumulative session counters
  const [loggedShots, setLoggedShots] = useState([
    { id: 'ev-1', zone: 'TL', outcome: 'Saved', psxg: 0.72, technique: 'Top Hand Tip-Over', minute: '18' },
    { id: 'ev-2', zone: 'MC', outcome: 'Saved', psxg: 0.35, technique: 'Chest Smother & Held', minute: '52' }
  ]);
  const [crossClaimsCount, setCrossClaimsCount] = useState(5);
  const [sweeperClearancesCount, setSweeperClearancesCount] = useState(3);
  const [passAccuracyPct, setPassAccuracyPct] = useState(86);

  // PSxG estimation calculator based on zone and distance
  const calculateCurrentPsxg = () => {
    let base = 0.35;
    if (selectedZone.includes('T') || selectedZone.includes('B')) base += 0.25; // corners
    if (shotDistance.includes('6-Yard')) base += 0.30;
    if (shotDistance.includes('Penalty')) base += 0.20;
    if (shotDistance.includes('Long Distance')) base -= 0.20;
    return Math.min(0.96, Math.max(0.08, base)).toFixed(2);
  };

  const handleAddShotEvent = () => {
    const psxg = parseFloat(calculateCurrentPsxg());
    const newShot = {
      id: `ev-${Date.now()}`,
      zone: selectedZone,
      outcome: shotOutcome,
      psxg: psxg,
      technique: shotTechnique,
      minute: shotMinute || '45'
    };

    if (shotOutcome === 'Saved') {
      playSaveSound();
    } else {
      playGoalConcededSound();
      setCleanSheet(false);
    }

    setLoggedShots([...loggedShots, newShot]);
  };

  const handleSaveWholeMatch = (e) => {
    e.preventDefault();
    if (!opponent.trim()) {
      alert('Please enter the opponent club name.');
      return;
    }

    // Cumulative calculations
    const savesCount = loggedShots.filter(s => s.outcome === 'Saved').length;
    const concededCount = loggedShots.filter(s => s.outcome === 'Conceded').length;
    const totalPsxg = loggedShots.reduce((acc, s) => acc + s.psxg, 0);
    const goalsPrevented = +(totalPsxg - concededCount).toFixed(2);

    const matchPayload = {
      id: `m-${Date.now()}`,
      keeperId: activeKeeper.id,
      date,
      opponent,
      venue,
      result: matchResult,
      cleanSheet,
      shotsFaced: loggedShots.length || 4,
      shotsOnTarget: loggedShots.length || 4,
      saves: savesCount,
      goalsConceded: concededCount,
      psxgFaced: +totalPsxg.toFixed(2),
      goalsPrevented: goalsPrevented,
      crossesClaimed: crossClaimsCount,
      crossesTotal: crossClaimsCount + 1,
      sweeperClearances: sweeperClearancesCount,
      passAccuracy: passAccuracyPct,
      rating: parseFloat(matchRating) || 8.0,
      mvp: cleanSheet && savesCount >= 4,
      notes: matchNotes || 'Match performance logged via KeeperVerse interactive pitch-side telemetry.'
    };

    if (cleanSheet) {
      playCleanSheetFanfare();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00f59b', '#00d2ff', '#ffd166', '#ffffff']
      });
    } else {
      playUiClick();
    }

    onSaveMatch(matchPayload);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content match-logger-modal" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header-bar">
          <div className="header-title-pack">
            <span className="badge badge-green">PITCH-SIDE TELEMETRY LOGGER</span>
            <h2 className="modal-heading">Log Match Performance • {activeKeeper.name}</h2>
          </div>
          <button className="icon-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSaveWholeMatch} className="logger-body-form">
          {/* Match Setup Details */}
          <div className="match-meta-grid">
            <div className="form-group">
              <label className="form-label">Opponent Team</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Oakfield Rovers"
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
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Venue</label>
              <select className="form-select" value={venue} onChange={e => setVenue(e.target.value)}>
                <option value="Home">Home Stadium</option>
                <option value="Away">Away Pitch</option>
                <option value="Neutral">Neutral / Tournament</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Final Result</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. W 2-0 or D 1-1"
                value={matchResult}
                onChange={e => setMatchResult(e.target.value)}
              />
            </div>
          </div>

          {/* Clean Sheet Checkbox Banner */}
          <div className={`clean-sheet-toggle-card ${cleanSheet ? 'active-clean-sheet' : ''}`}>
            <label className="clean-sheet-label">
              <input 
                type="checkbox" 
                checked={cleanSheet}
                onChange={e => {
                  playUiClick();
                  setCleanSheet(e.target.checked);
                }}
              />
              <div className="clean-sheet-text">
                <div className="cs-title">
                  <ShieldCheck size={18} className="text-neon-green" />
                  <strong>Clean Sheet Maintained (Shutout)</strong>
                </div>
                <span className="cs-desc">Triggers clean-sheet streak progression and celebratory telemetry telemetry bonus!</span>
              </div>
            </label>
            {cleanSheet && <span className="badge badge-gold"><Flame size={12}/> +1 Clean Sheet</span>}
          </div>

          {/* Event Logging Segmented Tabs */}
          <div className="logger-event-tabs">
            <button 
              type="button"
              className={`event-subtab ${eventType === 'shots' ? 'active' : ''}`}
              onClick={() => { playUiClick(); setEventType('shots'); }}
            >
              <Target size={15} />
              <span>Log Shots Faced ({loggedShots.length})</span>
            </button>
            <button 
              type="button"
              className={`event-subtab ${eventType === 'crosses' ? 'active' : ''}`}
              onClick={() => { playUiClick(); setEventType('crosses'); }}
            >
              <Compass size={15} />
              <span>Aerial & Crosses ({crossClaimsCount})</span>
            </button>
            <button 
              type="button"
              className={`event-subtab ${eventType === 'sweeping' ? 'active' : ''}`}
              onClick={() => { playUiClick(); setEventType('sweeping'); }}
            >
              <Footprints size={15} />
              <span>Sweeper Actions ({sweeperClearancesCount})</span>
            </button>
          </div>

          {/* Tab 1: Interactive Shot Face Picker */}
          {eventType === 'shots' && (
            <div className="logger-shot-panel glass-card">
              <div className="shot-panel-layout">
                {/* 9-Zone Mini Picker */}
                <div className="mini-goal-picker">
                  <div className="form-label text-center mb-2">Click Target Quadrant in Goal</div>
                  <div className="mini-nine-grid">
                    {GOAL_ZONES.map(z => (
                      <button
                        key={z.id}
                        type="button"
                        className={`mini-quad-btn ${selectedZone === z.id ? 'active' : ''}`}
                        onClick={() => {
                          playUiClick();
                          setSelectedZone(z.id);
                        }}
                      >
                        <span className="mini-id">{z.id}</span>
                      </button>
                    ))}
                  </div>
                  <div className="selected-zone-name mono text-center mt-2 text-xs text-neon-green">
                    Zone: {GOAL_ZONES.find(z => z.id === selectedZone)?.name}
                  </div>
                </div>

                {/* Shot Parameters Form */}
                <div className="shot-params-side">
                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Shot Distance / Angle</label>
                      <select 
                        className="form-select"
                        value={shotDistance}
                        onChange={e => setShotDistance(e.target.value)}
                      >
                        <option value="6-Yard Box (Point Blank)">6-Yard Box (Point Blank)</option>
                        <option value="Penalty Spot (11m)">Penalty Spot (11m)</option>
                        <option value="16m (Edge of Box)">16m (Edge of Box)</option>
                        <option value="25m+ (Long Range Drive)">25m+ (Long Range Drive)</option>
                        <option value="Tight Angle Cutback">Tight Angle Cutback</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Match Minute</label>
                      <input 
                        type="number" 
                        className="form-input"
                        placeholder="e.g. 42"
                        value={shotMinute}
                        onChange={e => setShotMinute(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Goalkeeper Outcome</label>
                      <div className="outcome-pill-group">
                        <button
                          type="button"
                          className={`outcome-btn ${shotOutcome === 'Saved' ? 'saved-active' : ''}`}
                          onClick={() => { playUiClick(); setShotOutcome('Saved'); }}
                        >
                          🧤 Shot Saved
                        </button>
                        <button
                          type="button"
                          className={`outcome-btn ${shotOutcome === 'Conceded' ? 'conceded-active' : ''}`}
                          onClick={() => { playUiClick(); setShotOutcome('Conceded'); }}
                        >
                          ⚽ Goal Conceded
                        </button>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Save / Handling Technique</label>
                      <select 
                        className="form-select"
                        value={shotTechnique}
                        onChange={e => setShotTechnique(e.target.value)}
                      >
                        <option value="Clean Catch & Held">Clean Catch & Held</option>
                        <option value="Diving Fingertip Save">Diving Fingertip Save</option>
                        <option value="Parried to Safety (Corner/Wide)">Parried to Safety (Wide)</option>
                        <option value="Low Smother & Trapped">Low Smother & Trapped</option>
                        <option value="Foot / Kick Save">Foot / Reflex Kick Save</option>
                        <option value="Conceded - Unstoppable Angle">Conceded - Unstoppable Angle</option>
                        <option value="Conceded - Deflection">Conceded - Deflection</option>
                      </select>
                    </div>
                  </div>

                  {/* Calculated PSxG Preview */}
                  <div className="psxg-live-calc-bar">
                    <div className="calc-info">
                      <span className="mono text-xs text-muted">Estimated Post-Shot xG:</span>
                      <strong className="mono text-neon-gold text-base"> {calculateCurrentPsxg()} PSxG</strong>
                    </div>
                    <button 
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={handleAddShotEvent}
                    >
                      <Plus size={14} /> Add Event to Match
                    </button>
                  </div>
                </div>
              </div>

              {/* Logged Shots List for this Match */}
              {loggedShots.length > 0 && (
                <div className="current-match-shots-tape">
                  <span className="mono text-xs text-muted">LOGGED SHOTS THIS MATCH:</span>
                  <div className="shots-chips-wrap">
                    {loggedShots.map((st, i) => (
                      <span key={st.id || i} className={`shot-chip ${st.outcome === 'Saved' ? 'saved' : 'conceded'}`}>
                        {st.minute}' [{st.zone}] {st.outcome} ({st.psxg} PSxG)
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Aerial & Crosses */}
          {eventType === 'crosses' && (
            <div className="logger-sub-panel glass-card">
              <h4 className="sub-panel-title">Aerial Box Command & Cross Deliveries</h4>
              <div className="counter-row">
                <span className="counter-desc">Total Crosses Successfully Claimed / Punched:</span>
                <div className="counter-controls">
                  <button type="button" className="btn-circle" onClick={() => setCrossClaimsCount(Math.max(0, crossClaimsCount - 1))}>-</button>
                  <span className="counter-val mono">{crossClaimsCount}</span>
                  <button type="button" className="btn-circle" onClick={() => setCrossClaimsCount(crossClaimsCount + 1)}>+</button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Sweeper-Keeper Clearances */}
          {eventType === 'sweeping' && (
            <div className="logger-sub-panel glass-card">
              <h4 className="sub-panel-title">Proactive Sweeper-Keeper Actions</h4>
              <div className="counter-row">
                <span className="counter-desc">Clearances / 1v1 Slide Tackles Outside 18-Yard Box:</span>
                <div className="counter-controls">
                  <button type="button" className="btn-circle" onClick={() => setSweeperClearancesCount(Math.max(0, sweeperClearancesCount - 1))}>-</button>
                  <span className="counter-val mono">{sweeperClearancesCount}</span>
                  <button type="button" className="btn-circle" onClick={() => setSweeperClearancesCount(sweeperClearancesCount + 1)}>+</button>
                </div>
              </div>
            </div>
          )}

          {/* Coach Notes & Overall Rating */}
          <div className="form-row-2 mt-3">
            <div className="form-group">
              <label className="form-label">Keeper Performance Rating (1.0 - 10.0)</label>
              <input 
                type="number" 
                step="0.1" 
                min="1" 
                max="10" 
                className="form-input" 
                value={matchRating}
                onChange={e => setMatchRating(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Coaching Notes & Game Summary</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Key moments, communication notes, distribution praise..."
                value={matchNotes}
                onChange={e => setMatchNotes(e.target.value)}
              />
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="modal-footer-bar">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Trophy size={16} /> Save Official Match Telemetry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
