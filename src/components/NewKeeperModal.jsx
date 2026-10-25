import React, { useState, useRef } from 'react';
import { X, UserPlus, Shield, Sparkles, Upload, Camera, Image as ImageIcon } from 'lucide-react';
import { playUiClick, playSaveSound } from '../utils/audio';

// Helper to safely downscale and compress any user image using canvas to prevent localStorage quota errors
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
      // Return safe, light compressed base64 string
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
      callback(compressedDataUrl);
    };
    img.onerror = () => {
      callback('/keeper-avatar.jpg');
    };
  };
}

export function NewKeeperModal({ isOpen, onClose, onAddKeeper }) {
  const fileInputRef = useRef(null);
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [league, setLeague] = useState('Premier League');
  const [level, setLevel] = useState('Amateur / Grassroots');
  const [age, setAge] = useState('21');
  const [height, setHeight] = useState('188 cm');
  const [strongFoot, setStrongFoot] = useState('Right (4★ Weak)');
  const [gloveModel, setGloveModel] = useState('Predator Pro');
  const [archetype, setArchetype] = useState('Sweeper-Keeper Specialist');
  const [avatarPreview, setAvatarPreview] = useState('/keeper-avatar.jpg');
  const [isCompressing, setIsCompressing] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter a goalkeeper name');
      return;
    }

    playSaveSound();
    const newKeeperId = `gk-custom-${Date.now()}`;
    const newKeeper = {
      id: newKeeperId,
      name: name.trim(),
      callsign: 'The Guardian',
      team: team.trim() || 'Custom Athletic',
      league: league || 'Custom / Academy',
      level: level || 'Amateur / Grassroots',
      age: parseInt(age) || 21,
      height: height.trim() || '188 cm',
      weight: '84 kg',
      strongFoot: strongFoot || 'Right',
      gloveModel: gloveModel.trim() || 'Pro Roll-Finger',
      archetype,
      avatar: avatarPreview,
      kvrRating: 8.5,
      bio: `${archetype} competing in ${level}. Registered into KeeperVerse with verified telemetry tracking.`,
      attributes: {
        reflexes: 88,
        shotStopping: 87,
        distribution: 84,
        sweeping: 86,
        boxCommand: 85,
        handling: 86,
        aerialDuel: 87,
        composure: 89
      },
      seasonStats: {
        matches: 1,
        minutesPlayed: 90,
        cleanSheets: 1,
        cleanSheetStreak: 1,
        goalsConceded: 0,
        shotsFaced: 6,
        shotsOnTargetFaced: 5,
        saves: 5,
        savePercentage: 100.0,
        psxgFaced: 1.65,
        goalsPrevented: +1.65,
        crossesFaced: 8,
        crossesClaimed: 8,
        crossClaimSuccessRate: 100.0,
        punches: 1,
        sweeperActions: 3,
        avgSweepingDist: '16.5 m',
        passAccuracyTotal: 88.0,
        passAccuracyShort: 96.0,
        passAccuracyLong: 68.0,
        penaltySaves: '0 / 0'
      }
    };

    onAddKeeper(newKeeper);
    // Reset form
    setName('');
    setTeam('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content new-keeper-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header-bar">
          <div className="header-title-pack">
            <span className="badge badge-green">NEW PLAYER REGISTRATION</span>
            <h2 className="modal-heading">Register Goalkeeper in KeeperVerse</h2>
          </div>
          <button className="icon-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="logger-body-form">
          {/* System Photo Upload Row */}
          <div className="avatar-uploader-banner glass-card mb-3">
            <div className="avatar-preview-wrap">
              <img src={avatarPreview} alt="Preview" className="preview-img" />
              <button 
                type="button" 
                className="btn-upload-badge"
                title="Select photo from device"
                onClick={() => {
                  playUiClick();
                  fileInputRef.current?.click();
                }}
              >
                <Camera size={14} />
              </button>
            </div>
            <div className="uploader-text">
              <div className="upload-title">
                <Upload size={14} className="text-neon-cyan" />
                <strong>Select Profile Picture From Your System</strong>
              </div>
              <p className="upload-subtitle">
                {isCompressing ? 'Compressing image...' : 'Click below to select any photo from your computer.'}
              </p>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm mt-1"
                onClick={() => {
                  playUiClick();
                  fileInputRef.current?.click();
                }}
              >
                <ImageIcon size={14} /> Browse Computer Files
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

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Goalkeeper Full Name *</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Liam Gallagher"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label className="form-label">Team / Club / Academy</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Westfield Rovers U21"
                value={team}
                onChange={e => setTeam(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">League Category</label>
              <select className="form-select" value={league} onChange={e => setLeague(e.target.value)}>
                <option value="Premier League">Premier League</option>
                <option value="La Liga">La Liga</option>
                <option value="Bundesliga">Bundesliga</option>
                <option value="Serie A">Serie A</option>
                <option value="Ligue 1">Ligue 1</option>
                <option value="Custom / Academy">Custom / Academy / Grassroots</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Goalkeeping Archetype</label>
              <select className="form-select" value={archetype} onChange={e => setArchetype(e.target.value)}>
                <option value="Sweeper-Keeper Specialist">Sweeper-Keeper Specialist</option>
                <option value="Commanding Shot-Stopper">Commanding Shot-Stopper</option>
                <option value="Traditional Box Commander">Traditional Box Commander</option>
                <option value="Ball-Playing Distributor">Ball-Playing Distributor</option>
              </select>
            </div>
          </div>

          <div className="form-row-3">
            <div className="form-group">
              <label className="form-label">Age</label>
              <input 
                type="number" 
                className="form-input" 
                value={age}
                onChange={e => setAge(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Height</label>
              <input 
                type="text" 
                className="form-input" 
                value={height}
                onChange={e => setHeight(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Glove Model</label>
              <input 
                type="text" 
                className="form-input" 
                value={gloveModel}
                onChange={e => setGloveModel(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer-bar">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <UserPlus size={16} /> Save & Activate Goalkeeper
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
