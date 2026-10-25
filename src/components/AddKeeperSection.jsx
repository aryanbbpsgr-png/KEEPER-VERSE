import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  UserPlus, 
  Camera, 
  Upload, 
  ShieldCheck, 
  Target, 
  Compass, 
  Footprints, 
  Sliders, 
  Sparkles, 
  Save, 
  RotateCcw,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import { ALL_LEAGUES } from '../data/mockData';
import { playUiClick, playSaveSound, playCleanSheetFanfare } from '../utils/audio';

function compressImageFile(file, maxWidth, maxHeight, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
      callback(compressedDataUrl);
    };
    img.onerror = () => {
      callback('/keeper-avatar.jpg');
    };
  };
}

export function AddKeeperSection({ onAddKeeper, onCancel }) {
  const fileInputRef = useRef(null);

  // Identity state
  const [name, setName] = useState('');
  const [callsign, setCallsign] = useState('');
  const [team, setTeam] = useState('');
  const [league, setLeague] = useState('Premier League');
  const [level, setLevel] = useState('Amateur / Grassroots');
  const [age, setAge] = useState('22');
  const [height, setHeight] = useState('189 cm (6\'2")');
  const [weight, setWeight] = useState('85 kg');
  const [strongFoot, setStrongFoot] = useState('Right (4★ Weak)');
  const [gloveModel, setGloveModel] = useState('Predator Pro Roll-Finger');
  const [archetype, setArchetype] = useState('Sweeper-Keeper Specialist');
  const [avatarPreview, setAvatarPreview] = useState('/keeper-avatar.jpg');
  const [isCompressing, setIsCompressing] = useState(false);

  // Season Baseline state
  const [matches, setMatches] = useState(1);
  const [cleanSheets, setCleanSheets] = useState(1);
  const [goalsConceded, setGoalsConceded] = useState(0);
  const [shotsFaced, setShotsFaced] = useState(6);
  const [shotsOnTarget, setShotsOnTarget] = useState(5);
  const [saves, setSaves] = useState(5);
  const [psxgFaced, setPsxgFaced] = useState(1.65);
  const [crossesFaced, setCrossesFaced] = useState(8);
  const [crossesClaimed, setCrossesClaimed] = useState(8);
  const [sweeperActions, setSweeperActions] = useState(3);
  const [avgSweepingDist, setAvgSweepingDist] = useState('16.5 m');
  const [passAccShort, setPassAccShort] = useState(94.0);
  const [passAccLong, setPassAccLong] = useState(68.0);

  // Skill attributes
  const [reflexes, setReflexes] = useState(88);
  const [shotStopping, setShotStopping] = useState(87);
  const [distribution, setDistribution] = useState(85);
  const [sweeping, setSweeping] = useState(86);
  const [boxCommand, setBoxCommand] = useState(88);
  const [handling, setHandling] = useState(86);
  const [aerialDuel, setAerialDuel] = useState(88);
  const [composure, setComposure] = useState(90);

  // Derived KVR
  const calculatedKvr = ((reflexes * 0.25 + shotStopping * 0.25 + boxCommand * 0.2 + sweeping * 0.15 + distribution * 0.15) / 10).toFixed(1);

  const handleSystemImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsCompressing(true);
      compressImageFile(file, 256, 256, (compressedUrl) => {
        playSaveSound();
        setAvatarPreview(compressedUrl);
        setIsCompressing(false);
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter a goalkeeper name');
      return;
    }

    playSaveSound();
    playCleanSheetFanfare();

    const savePct = shotsOnTarget > 0 ? +((saves / shotsOnTarget) * 100).toFixed(1) : 100;
    const goalsPrev = +(psxgFaced - goalsConceded).toFixed(2);
    const claimRate = crossesFaced > 0 ? +((crossesClaimed / crossesFaced) * 100).toFixed(1) : 100;

    const newKeeper = {
      id: `gk-custom-${Date.now()}`,
      name: name.trim(),
      callsign: callsign.trim() || 'The Guardian',
      team: team.trim() || 'Custom Athletic',
      league: league || 'Custom / Academy',
      level: level || 'Amateur / Grassroots',
      age: parseInt(age) || 22,
      height: height.trim() || '188 cm',
      weight: weight.trim() || '84 kg',
      strongFoot,
      gloveModel: gloveModel.trim() || 'Pro Negative Cut',
      archetype,
      avatar: avatarPreview,
      kvrRating: parseFloat(calculatedKvr),
      bio: `${archetype} competing in ${level}. Registered into KeeperVerse with complete telemetry profile.`,
      attributes: {
        reflexes,
        shotStopping,
        distribution,
        sweeping,
        boxCommand,
        handling,
        aerialDuel,
        composure
      },
      seasonStats: {
        matches: parseInt(matches) || 1,
        minutesPlayed: (parseInt(matches) || 1) * 90,
        cleanSheets: parseInt(cleanSheets) || 1,
        cleanSheetStreak: parseInt(cleanSheets) > 0 ? 1 : 0,
        goalsConceded: parseInt(goalsConceded) || 0,
        shotsFaced: parseInt(shotsFaced) || 6,
        shotsOnTargetFaced: parseInt(shotsOnTarget) || 5,
        saves: parseInt(saves) || 5,
        savePercentage: savePct,
        psxgFaced: parseFloat(psxgFaced) || 1.65,
        goalsPrevented: goalsPrev,
        crossesFaced: parseInt(crossesFaced) || 8,
        crossesClaimed: parseInt(crossesClaimed) || 8,
        crossClaimSuccessRate: claimRate,
        punches: 1,
        sweeperActions: parseInt(sweeperActions) || 3,
        avgSweepingDist: avgSweepingDist || '16.5 m',
        passAccuracyTotal: Math.round((parseFloat(passAccShort) + parseFloat(passAccLong)) / 2),
        passAccuracyShort: parseFloat(passAccShort) || 92.0,
        passAccuracyLong: parseFloat(passAccLong) || 65.0,
        penaltySaves: '0 / 0'
      }
    };

    confetti({
      particleCount: 130,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ea580c', '#f97316', '#059669', '#0284c7']
    });

    onAddKeeper(newKeeper);
  };

  return (
    <div className="add-keeper-section animate-fade-in">
      {/* Header Banner */}
      <div className="section-head-row">
        <div>
          <div className="subhead-pill">
            <UserPlus size={14} className="text-neon-gold" />
            <span>PLAYER TELEMETRY INTAKE</span>
          </div>
          <h2 className="section-title">Register New Goalkeeper & Season Telemetry</h2>
          <p className="section-desc">
            Complete the onboarding dossier below to register a new goalkeeper into the KeeperVerse analytics ecosystem. Upload a profile photo directly from your system and set baseline season metrics.
          </p>
        </div>

        <div className="dossier-actions-bar">
          <span className="badge badge-gold mono">KVR SCORE: {calculatedKvr}</span>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="add-keeper-form-grid">
        {/* Column 1: Identity & Profile Image */}
        <div className="form-column glass-panel p-4">
          <div className="card-head-bar mb-3">
            <h3 className="card-title text-base">1. Player Identity & Photo</h3>
            <span className="mono text-xs text-muted">PROFILE DATA</span>
          </div>

          {/* Photo Uploader */}
          <div className="avatar-intake-card glass-card mb-3">
            <div className="avatar-intake-preview">
              <img src={avatarPreview} alt="Preview" className="preview-img-large" />
              <button 
                type="button" 
                className="btn-upload-camera-badge"
                title="Select photo from computer"
                onClick={() => {
                  playUiClick();
                  fileInputRef.current?.click();
                }}
              >
                <Camera size={16} />
              </button>
            </div>
            <div className="avatar-intake-details">
              <strong className="text-sm">Profile Picture</strong>
              <p className="text-xs text-secondary mt-1">
                {isCompressing ? 'Compressing photo...' : 'Select any JPG or PNG from your computer. It will be cropped and saved to your profile.'}
              </p>
              <button 
                type="button"
                className="btn btn-secondary btn-sm mt-2"
                onClick={() => {
                  playUiClick();
                  fileInputRef.current?.click();
                }}
              >
                <Upload size={13} /> Select Photo from System
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                accept="image/*" 
                style={{ display: 'none' }} 
                onChange={handleSystemImageChange} 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Matteo Donati" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Callsign / Nickname</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. The Iron Wall" 
                value={callsign} 
                onChange={e => setCallsign(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Club / Team</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. St. Jude FC" 
                value={team} 
                onChange={e => setTeam(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">League Category</label>
              <select className="form-select" value={league} onChange={e => setLeague(e.target.value)}>
                {ALL_LEAGUES.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Goalkeeping Archetype</label>
              <select className="form-select" value={archetype} onChange={e => setArchetype(e.target.value)}>
                <option value="Sweeper-Keeper Specialist">Sweeper-Keeper Specialist</option>
                <option value="Commanding Shot-Stopper">Commanding Shot-Stopper</option>
                <option value="Traditional Box Commander">Traditional Box Commander</option>
                <option value="Playmaking Distributor">Playmaking Distributor</option>
              </select>
            </div>
          </div>

          <div className="form-row-3">
            <div className="form-group">
              <label className="form-label">Age</label>
              <input type="number" className="form-input" value={age} onChange={e => setAge(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Height</label>
              <input type="text" className="form-input" value={height} onChange={e => setHeight(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Weight</label>
              <input type="text" className="form-input" value={weight} onChange={e => setWeight(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Glove Model & Cut</label>
            <input type="text" className="form-input" value={gloveModel} onChange={e => setGloveModel(e.target.value)} />
          </div>
        </div>

        {/* Column 2: Baseline Season Telemetry & Skill Ratings */}
        <div className="form-column glass-panel p-4">
          <div className="card-head-bar mb-3">
            <h3 className="card-title text-base">2. Baseline Season Statistics</h3>
            <span className="mono text-xs text-neon-green">VERIFIED STATS</span>
          </div>

          <div className="form-row-3">
            <div className="form-group">
              <label className="form-label">Matches</label>
              <input type="number" min="1" className="form-input" value={matches} onChange={e => setMatches(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Clean Sheets</label>
              <input type="number" min="0" className="form-input" value={cleanSheets} onChange={e => setCleanSheets(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Goals Conceded</label>
              <input type="number" min="0" className="form-input" value={goalsConceded} onChange={e => setGoalsConceded(e.target.value)} />
            </div>
          </div>

          <div className="form-row-3">
            <div className="form-group">
              <label className="form-label">Shots Faced</label>
              <input type="number" min="0" className="form-input" value={shotsFaced} onChange={e => setShotsFaced(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">On-Target Faced</label>
              <input type="number" min="0" className="form-input" value={shotsOnTarget} onChange={e => setShotsOnTarget(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Saves Made</label>
              <input type="number" min="0" className="form-input" value={saves} onChange={e => setSaves(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <div className="flex justify-between items-center mb-1">
              <label className="form-label">PSxG Faced (Post-Shot Expected Goals)</label>
              <strong className="mono text-xs text-neon-gold">{psxgFaced} xG</strong>
            </div>
            <input 
              type="range" 
              min="0.2" 
              max="5.0" 
              step="0.05" 
              value={psxgFaced} 
              onChange={e => setPsxgFaced(parseFloat(e.target.value))} 
              className="w-full"
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Crosses Claimed / Faced</label>
              <div className="flex gap-2">
                <input type="number" className="form-input" value={crossesClaimed} onChange={e => setCrossesClaimed(e.target.value)} />
                <input type="number" className="form-input" value={crossesFaced} onChange={e => setCrossesFaced(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Sweeping Actions</label>
              <input type="number" className="form-input" value={sweeperActions} onChange={e => setSweeperActions(e.target.value)} />
            </div>
          </div>

          {/* Core Attribute Sliders */}
          <div className="attributes-sliders-block mt-3 pt-3 border-t border-slate-200">
            <div className="card-head-bar mb-2">
              <span className="mono text-xs text-neon-cyan font-bold">3. ATTRIBUTES (100-PT SCALE)</span>
              <span className="badge badge-green text-3xs">OCTANT RADAR</span>
            </div>

            <div className="attributes-sliders-grid">
              <div className="slider-item">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Reflexes</span>
                  <span className="mono text-neon-gold">{reflexes}</span>
                </div>
                <input type="range" min="50" max="99" value={reflexes} onChange={e => setReflexes(parseInt(e.target.value))} />
              </div>

              <div className="slider-item">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Shot Stopping</span>
                  <span className="mono text-neon-gold">{shotStopping}</span>
                </div>
                <input type="range" min="50" max="99" value={shotStopping} onChange={e => setShotStopping(parseInt(e.target.value))} />
              </div>

              <div className="slider-item">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Box Command</span>
                  <span className="mono text-neon-gold">{boxCommand}</span>
                </div>
                <input type="range" min="50" max="99" value={boxCommand} onChange={e => setBoxCommand(parseInt(e.target.value))} />
              </div>

              <div className="slider-item">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Sweeping Line</span>
                  <span className="mono text-neon-gold">{sweeping}</span>
                </div>
                <input type="range" min="50" max="99" value={sweeping} onChange={e => setSweeping(parseInt(e.target.value))} />
              </div>

              <div className="slider-item">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Distribution</span>
                  <span className="mono text-neon-gold">{distribution}</span>
                </div>
                <input type="range" min="50" max="99" value={distribution} onChange={e => setDistribution(parseInt(e.target.value))} />
              </div>

              <div className="slider-item">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Composure</span>
                  <span className="mono text-neon-gold">{composure}</span>
                </div>
                <input type="range" min="50" max="99" value={composure} onChange={e => setComposure(parseInt(e.target.value))} />
              </div>
            </div>
          </div>

          <div className="form-submit-row mt-4">
            <button type="submit" className="btn btn-primary w-full py-3 text-sm font-bold">
              <Save size={16} /> Register & Activate Goalkeeper in KeeperVerse
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
