import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  Timer, 
  Zap, 
  CheckCircle2, 
  Play, 
  RotateCcw, 
  Flame,
  Award,
  Sparkles
} from 'lucide-react';
import { DRILLS_LIBRARY } from '../data/mockData';
import { playUiClick, playSaveSound } from '../utils/audio';

export function DrillsTracker({ keeper }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [completedDrills, setCompletedDrills] = useState(['drill-1']);

  // Reaction Speed Test Interactive Minigame
  const [reactionState, setReactionState] = useState('idle'); // 'idle' | 'waiting' | 'ready' | 'result'
  const [startTime, setStartTime] = useState(0);
  const [reactionScore, setReactionScore] = useState(null);
  const [reactionHistory, setReactionHistory] = useState([218, 224, 212]);

  const filteredDrills = selectedCategory === 'All' 
    ? DRILLS_LIBRARY 
    : DRILLS_LIBRARY.filter(d => d.category === selectedCategory);

  const startReactionTest = () => {
    playUiClick();
    setReactionState('waiting');
    setReactionScore(null);

    // Random delay between 1.5s and 4.0s
    const delay = Math.floor(Math.random() * 2500) + 1500;
    setTimeout(() => {
      setStartTime(Date.now());
      setReactionState('ready');
    }, delay);
  };

  const handleReactionClick = () => {
    if (reactionState === 'waiting') {
      // Clicked too early!
      setReactionState('idle');
      alert('Too early! Wait for the visual trigger to flash green.');
      return;
    }
    if (reactionState === 'ready') {
      const diff = Date.now() - startTime;
      playSaveSound();
      setReactionScore(diff);
      setReactionHistory([diff, ...reactionHistory.slice(0, 4)]);
      setReactionState('result');
    }
  };

  const toggleDrillComplete = (drillId) => {
    playSaveSound();
    if (completedDrills.includes(drillId)) {
      setCompletedDrills(completedDrills.filter(id => id !== drillId));
    } else {
      setCompletedDrills([...completedDrills, drillId]);
    }
  };

  const getReactionGrade = (ms) => {
    if (ms < 210) return { title: 'Elite / Pro Instincts', color: 'text-neon-green' };
    if (ms < 260) return { title: 'Semi-Pro Reflexes', color: 'text-neon-cyan' };
    if (ms < 320) return { title: 'Competitive Grassroots', color: 'text-neon-gold' };
    return { title: 'Developing Reaction Pace', color: 'text-muted' };
  };

  return (
    <div className="drills-tracker-section">
      <div className="section-head-row">
        <div>
          <div className="subhead-pill">
            <Dumbbell size={13} />
            <span>TRAINING SYSTEM & REFLEX SPEED</span>
          </div>
          <h2 className="section-title">Goalkeeper Specific Drills & Reaction Benchmark</h2>
          <p className="section-desc">
            Goalkeepers train differently from outfield players. Track targeted technical sessions and test neuromuscular reaction speed in milliseconds.
          </p>
        </div>

        {/* Categories */}
        <div className="matrix-controls-bar">
          <div className="segmented-toggle">
            {['All', 'Shot Stopping', 'Sweeping', 'Aerial Box Command', 'Distribution'].map(cat => (
              <button
                key={cat}
                className={`toggle-option ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => { playUiClick(); setSelectedCategory(cat); }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Drills Tracker Grid */}
      <div className="drills-main-layout">
        {/* Left: Reaction Speed Benchmark Interactive Widget */}
        <div className="reaction-tester-card glass-panel">
          <div className="tester-header">
            <div className="tester-title-group">
              <Timer size={16} className="text-neon-cyan" />
              <h3 className="tester-title">Neuromuscular Reaction Speed Benchmark</h3>
            </div>
            <span className="mono text-xs text-muted">TARGET: &lt;230ms</span>
          </div>

          <div 
            className={`reaction-stage-zone ${reactionState}`}
            onClick={reactionState === 'ready' || reactionState === 'waiting' ? handleReactionClick : undefined}
          >
            {reactionState === 'idle' && (
              <div className="stage-prompt">
                <Zap size={36} className="text-neon-cyan mb-2" />
                <h4 className="stage-instruction">Ready for Reflex Assessment?</h4>
                <p className="text-xs text-muted mb-4">
                  When the box turns NEON GREEN, tap or click as fast as humanly possible to simulate a fingertip dive reflex.
                </p>
                <button className="btn btn-primary" onClick={startReactionTest}>
                  <Play size={15} /> Start Reaction Test
                </button>
              </div>
            )}

            {reactionState === 'waiting' && (
              <div className="stage-prompt">
                <div className="waiting-spinner"></div>
                <h4 className="stage-instruction text-neon-gold">WAIT FOR GREEN...</h4>
                <span className="text-xs text-muted">Keep eyes locked on screen</span>
              </div>
            )}

            {reactionState === 'ready' && (
              <div className="stage-prompt flash-active">
                <h2 className="reflex-now-text">DIVE NOW! (CLICK!)</h2>
              </div>
            )}

            {reactionState === 'result' && (
              <div className="stage-prompt">
                <Sparkles size={32} className="text-neon-green mb-1" />
                <div className="result-ms mono text-neon-green">{reactionScore} ms</div>
                <div className={`result-tier font-bold mb-3 ${getReactionGrade(reactionScore).color}`}>
                  {getReactionGrade(reactionScore).title}
                </div>
                <button className="btn btn-secondary" onClick={startReactionTest}>
                  <RotateCcw size={14} /> Try Another Reflex Rep
                </button>
              </div>
            )}
          </div>

          {/* Reaction History Row */}
          <div className="reaction-history-bar">
            <span className="mono text-xs text-muted">RECENT REACTION REPS:</span>
            <div className="reps-wrap mono text-xs">
              {reactionHistory.map((rep, idx) => (
                <span key={idx} className="rep-pill">
                  {rep}ms
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Drills Library Cards */}
        <div className="drills-catalog-col">
          <div className="drills-list-wrapper">
            {filteredDrills.map((drill) => {
              const isCompleted = completedDrills.includes(drill.id);

              return (
                <div key={drill.id} className={`drill-interactive-card glass-card ${isCompleted ? 'completed-border' : ''}`}>
                  <div className="drill-card-top">
                    <div className="tag-cluster">
                      <span className="badge badge-green">{drill.category}</span>
                      <span className="badge badge-cyan">{drill.intensity} Intensity</span>
                    </div>

                    <button 
                      className={`complete-check-btn ${isCompleted ? 'is-complete' : ''}`}
                      onClick={() => toggleDrillComplete(drill.id)}
                      title={isCompleted ? "Mark Incomplete" : "Mark Completed Session"}
                    >
                      <CheckCircle2 size={20} />
                      <span className="mono text-xs">{isCompleted ? 'Completed' : 'Log Drill'}</span>
                    </button>
                  </div>

                  <h4 className="drill-heading">{drill.title}</h4>
                  <p className="drill-description">{drill.description}</p>

                  <div className="drill-meta-footer mono text-xs text-muted">
                    <span><strong>Focus:</strong> {drill.targetZone}</span>
                    <span>•</span>
                    <span><strong>Frequency:</strong> {drill.frequency}</span>
                    <span>•</span>
                    <span className="text-neon-cyan"><strong>Tag:</strong> {drill.videoTag}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
