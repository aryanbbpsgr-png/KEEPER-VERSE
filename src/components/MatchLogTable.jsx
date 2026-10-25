import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Flame, 
  Trophy, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Award
} from 'lucide-react';
import { playUiClick } from '../utils/audio';

export function MatchLogTable({ matches, keeperName }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCleanSheetOnly, setFilterCleanSheetOnly] = useState(false);
  const [expandedMatchId, setExpandedMatchId] = useState(null);

  const filteredMatches = matches.filter(m => {
    const matchesSearch = m.opponent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCs = filterCleanSheetOnly ? m.cleanSheet : true;
    return matchesSearch && matchesCs;
  });

  const toggleExpand = (id) => {
    playUiClick();
    setExpandedMatchId(expandedMatchId === id ? null : id);
  };

  return (
    <div className="match-log-section">
      <div className="section-head-row">
        <div>
          <div className="subhead-pill">
            <Trophy size={13} />
            <span>SEASON LOGS & TELEMETRY ARCHIVE</span>
          </div>
          <h2 className="section-title">Match Performance Telemetry Ledger</h2>
          <p className="section-desc">
            Complete historical record of match-by-match goalkeeper contributions. Beyond simple scorelines: evaluating shot quality faced, goals prevented, aerial command, and distribution under pressure.
          </p>
        </div>

        {/* Filters */}
        <div className="match-filter-bar">
          <div className="search-input-wrap">
            <Search size={15} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search opponent..."
              className="search-input"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <button 
            className={`btn btn-secondary filter-cs-btn ${filterCleanSheetOnly ? 'active' : ''}`}
            onClick={() => {
              playUiClick();
              setFilterCleanSheetOnly(!filterCleanSheetOnly);
            }}
          >
            <ShieldCheck size={15} className="text-neon-green" />
            <span>Clean Sheets Only</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="table-responsive-container glass-panel">
        <table className="telemetry-table">
          <thead>
            <tr>
              <th>Date / Opponent</th>
              <th>Venue</th>
              <th>Scoreline</th>
              <th>Shots (On Target)</th>
              <th>Saves</th>
              <th>PSxG Faced</th>
              <th>Goals Prevented</th>
              <th>Aerial Claims</th>
              <th>Sweeps</th>
              <th>Pass Acc</th>
              <th>Rating</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredMatches.map(m => {
              const isExpanded = expandedMatchId === m.id;
              const isPreventedPositive = m.goalsPrevented >= 0;

              return (
                <React.Fragment key={m.id}>
                  <tr className={`table-row ${isExpanded ? 'row-expanded' : ''}`} onClick={() => toggleExpand(m.id)}>
                    {/* Opponent & Date */}
                    <td>
                      <div className="opponent-cell">
                        <strong>{m.opponent}</strong>
                        <span className="mono text-xs text-muted">{m.date}</span>
                      </div>
                    </td>

                    {/* Venue */}
                    <td>
                      <span className="badge badge-secondary mono">{m.venue}</span>
                    </td>

                    {/* Result */}
                    <td>
                      <div className="result-cell">
                        <span className={`result-pill ${m.result.startsWith('W') ? 'win' : m.result.startsWith('D') ? 'draw' : 'loss'}`}>
                          {m.result}
                        </span>
                        {m.cleanSheet && (
                          <span className="clean-sheet-badge" title="Clean Sheet Maintained">
                            <ShieldCheck size={14} />
                          </span>
                        )}
                        {m.mvp && (
                          <span className="mvp-badge" title="Match MVP Goalkeeper Performance">
                            <Award size={14} />
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Shots */}
                    <td className="mono">{m.shotsFaced} ({m.shotsOnTarget})</td>

                    {/* Saves */}
                    <td>
                      <span className="mono font-semibold text-neon-green">
                        {m.saves} / {m.shotsOnTarget}
                      </span>
                    </td>

                    {/* PSxG */}
                    <td className="mono text-neon-gold">{m.psxgFaced}</td>

                    {/* Goals Prevented */}
                    <td>
                      <span className={`mono font-semibold ${isPreventedPositive ? 'text-neon-green' : 'text-neon-red'}`}>
                        {isPreventedPositive ? `+${m.goalsPrevented}` : m.goalsPrevented}
                      </span>
                    </td>

                    {/* Aerial Claims */}
                    <td className="mono">{m.crossesClaimed}</td>

                    {/* Sweeper Clearances */}
                    <td className="mono text-neon-cyan">{m.sweeperClearances}</td>

                    {/* Pass Acc */}
                    <td className="mono">{m.passAccuracy}%</td>

                    {/* Rating */}
                    <td>
                      <span className="rating-pill mono">{m.rating}</span>
                    </td>

                    {/* Expand icon */}
                    <td className="text-center">
                      <button className="expand-chevron-btn" onClick={(e) => { e.stopPropagation(); toggleExpand(m.id); }}>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Match Drawer */}
                  {isExpanded && (
                    <tr className="drawer-subrow">
                      <td colSpan={12}>
                        <div className="expanded-match-card glass-card">
                          <div className="expanded-grid">
                            <div>
                              <span className="mono text-xs text-neon-green font-semibold">COACHING OBSERVATIONS & TACTICAL REVIEW</span>
                              <p className="mt-1 text-sm text-secondary">{m.notes}</p>
                            </div>
                            <div className="expanded-mini-stats mono">
                              <div><strong>Shot Stopping Quality:</strong> {((m.saves / (m.shotsOnTarget || 1)) * 100).toFixed(0)}%</div>
                              <div><strong>Distribution Profile:</strong> Build-up retention high under pressure</div>
                              <div><strong>Penalty Box Dominance:</strong> Zero contested crosses lost in 6-yard area</div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
