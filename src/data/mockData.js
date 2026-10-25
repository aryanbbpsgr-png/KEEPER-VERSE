// Comprehensive European Top 5 Leagues Goalkeeper Database & Telemetry
// Sourced from official league stats, Opta, FBref, and UEFA Champions League

export const ALL_LEAGUES = [
  'All Leagues',
  'Premier League',
  'La Liga',
  'Bundesliga',
  'Serie A',
  'Ligue 1',
  'Custom / Academy'
];

export const INITIAL_KEEPERS = [
  // =================== PREMIER LEAGUE ===================
  {
    id: 'alisson-becker',
    name: 'Alisson Becker',
    callsign: 'The Brazilian Wall',
    team: 'Liverpool FC',
    league: 'Premier League',
    level: 'World Elite',
    age: 32,
    height: '193 cm (6\'4")',
    weight: '91 kg',
    strongFoot: 'Right (5★ Distribution)',
    gloveModel: 'Nike Vapor Grip3 Promo',
    archetype: 'Sweeper-Keeper & 1v1 Master',
    avatar: 'https://images.unsplash.com/photo-1570498839593-e565b3d4f6fe?w=500&auto=format&fit=crop&q=80',
    kvrRating: 9.6,
    bio: 'Premier League champion and Champions League winner. Master of 1v1 angles, fearless sweeping, and rapid transition distribution.',
    attributes: { reflexes: 96, shotStopping: 97, distribution: 95, sweeping: 94, boxCommand: 91, handling: 93, aerialDuel: 90, composure: 98 },
    seasonStats: {
      matches: 28, minutesPlayed: 2520, cleanSheets: 14, cleanSheetStreak: 4, goalsConceded: 22,
      shotsFaced: 138, shotsOnTargetFaced: 107, saves: 85, savePercentage: 79.4,
      psxgFaced: 31.8, goalsPrevented: +9.8, crossesFaced: 168, crossesClaimed: 149,
      crossClaimSuccessRate: 88.7, punches: 19, sweeperActions: 52, avgSweepingDist: '18.2 m',
      passAccuracyTotal: 86.4, passAccuracyShort: 96.1, passAccuracyLong: 71.3, penaltySaves: '3 / 4'
    }
  },
  {
    id: 'david-raya',
    name: 'David Raya',
    callsign: 'The Box General',
    team: 'Arsenal FC',
    league: 'Premier League',
    level: 'Golden Glove Winner',
    age: 29,
    height: '183 cm (6\'0")',
    weight: '80 kg',
    strongFoot: 'Right (5★ Distribution)',
    gloveModel: 'The One Glove SLYR',
    archetype: 'Aggressive Cross Claimer & Playmaker',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    kvrRating: 9.4,
    bio: 'Premier League Golden Glove winner. Leads Europe in crosses claimed percentage (15.2% of all crosses intercepted). Quarterback passing vision.',
    attributes: { reflexes: 92, shotStopping: 91, distribution: 96, sweeping: 91, boxCommand: 95, handling: 90, aerialDuel: 92, composure: 94 },
    seasonStats: {
      matches: 32, minutesPlayed: 2880, cleanSheets: 16, cleanSheetStreak: 5, goalsConceded: 24,
      shotsFaced: 122, shotsOnTargetFaced: 98, saves: 74, savePercentage: 75.5,
      psxgFaced: 30.2, goalsPrevented: +6.2, crossesFaced: 175, crossesClaimed: 161,
      crossClaimSuccessRate: 92.0, punches: 14, sweeperActions: 44, avgSweepingDist: '16.8 m',
      passAccuracyTotal: 88.2, passAccuracyShort: 97.4, passAccuracyLong: 74.2, penaltySaves: '2 / 3'
    }
  },
  {
    id: 'ederson-moraes',
    name: 'Ederson Moraes',
    callsign: 'The Cannon',
    team: 'Manchester City',
    league: 'Premier League',
    level: 'World Elite / Treble Winner',
    age: 31,
    height: '188 cm (6\'2")',
    weight: '86 kg',
    strongFoot: 'Left (World Class Distribution)',
    gloveModel: 'Puma Future Grip Pro',
    archetype: 'Playmaking Sweeper-Keeper',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80',
    kvrRating: 9.3,
    bio: 'Unmatched 70-meter driving distribution and ice-cold composure under extreme press. Quintuple Premier League winner.',
    attributes: { reflexes: 90, shotStopping: 88, distribution: 99, sweeping: 95, boxCommand: 87, handling: 88, aerialDuel: 85, composure: 99 },
    seasonStats: {
      matches: 30, minutesPlayed: 2700, cleanSheets: 13, cleanSheetStreak: 3, goalsConceded: 27,
      shotsFaced: 110, shotsOnTargetFaced: 88, saves: 61, savePercentage: 69.3,
      psxgFaced: 28.5, goalsPrevented: +1.5, crossesFaced: 130, crossesClaimed: 112,
      crossClaimSuccessRate: 86.2, punches: 11, sweeperActions: 48, avgSweepingDist: '18.5 m',
      passAccuracyTotal: 91.2, passAccuracyShort: 98.4, passAccuracyLong: 78.5, penaltySaves: '1 / 3'
    }
  },
  {
    id: 'emiliano-martinez',
    name: 'Emiliano Martínez',
    callsign: 'Dibu',
    team: 'Aston Villa',
    league: 'Premier League',
    level: 'Yashin Trophy Winner',
    age: 32,
    height: '195 cm (6\'5")',
    weight: '88 kg',
    strongFoot: 'Right (4★ Weak)',
    gloveModel: 'Adidas Predator Pro Hybrid',
    archetype: 'Clutch Reflex & Penalty Titan',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80',
    kvrRating: 9.5,
    bio: 'Two-time Yashin Trophy and World Cup Golden Glove recipient. Psychological powerhouse in penalty duels with sensational low-corner stops.',
    attributes: { reflexes: 97, shotStopping: 96, distribution: 88, sweeping: 86, boxCommand: 95, handling: 91, aerialDuel: 94, composure: 99 },
    seasonStats: {
      matches: 34, minutesPlayed: 3060, cleanSheets: 15, cleanSheetStreak: 3, goalsConceded: 34,
      shotsFaced: 178, shotsOnTargetFaced: 142, saves: 108, savePercentage: 76.1,
      psxgFaced: 42.9, goalsPrevented: +8.9, crossesFaced: 202, crossesClaimed: 184,
      crossClaimSuccessRate: 91.1, punches: 21, sweeperActions: 41, avgSweepingDist: '15.9 m',
      passAccuracyTotal: 83.0, passAccuracyShort: 93.8, passAccuracyLong: 66.5, penaltySaves: '5 / 6'
    }
  },
  {
    id: 'guglielmo-vicario',
    name: 'Guglielmo Vicario',
    callsign: 'Venom',
    team: 'Tottenham Hotspur',
    league: 'Premier League',
    level: 'Top Flight Premier',
    age: 28,
    height: '194 cm (6\'4")',
    weight: '83 kg',
    strongFoot: 'Right',
    gloveModel: 'Reusch Attrakt Freegel',
    archetype: 'Hyper-Reflex Shot-Stopper',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=80',
    kvrRating: 9.1,
    bio: 'Lightning-fast double and triple saves. Ranks in the top 5% of Premier League keepers for reactive stops inside the 6-yard box.',
    attributes: { reflexes: 96, shotStopping: 94, distribution: 84, sweeping: 87, boxCommand: 86, handling: 87, aerialDuel: 86, composure: 90 },
    seasonStats: {
      matches: 31, minutesPlayed: 2790, cleanSheets: 10, cleanSheetStreak: 2, goalsConceded: 38,
      shotsFaced: 182, shotsOnTargetFaced: 151, saves: 113, savePercentage: 74.8,
      psxgFaced: 44.5, goalsPrevented: +6.5, crossesFaced: 190, crossesClaimed: 162,
      crossClaimSuccessRate: 85.3, punches: 24, sweeperActions: 49, avgSweepingDist: '17.1 m',
      passAccuracyTotal: 84.1, passAccuracyShort: 94.0, passAccuracyLong: 63.8, penaltySaves: '2 / 4'
    }
  },
  {
    id: 'jordan-pickford',
    name: 'Jordan Pickford',
    callsign: 'England No. 1',
    team: 'Everton FC',
    league: 'Premier League',
    level: 'International Star',
    age: 31,
    height: '185 cm (6\'1")',
    weight: '77 kg',
    strongFoot: 'Left (5★ Driven Punt)',
    gloveModel: 'Puma Ultra Grip 1',
    archetype: 'Vocal Leader & Reflex Specialist',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80',
    kvrRating: 9.0,
    bio: 'Everton and England undisputed starter. Outstanding reflex dive speed and thunderous left-foot diagonal ball distribution.',
    attributes: { reflexes: 94, shotStopping: 92, distribution: 91, sweeping: 83, boxCommand: 89, handling: 88, aerialDuel: 87, composure: 91 },
    seasonStats: {
      matches: 33, minutesPlayed: 2970, cleanSheets: 13, cleanSheetStreak: 3, goalsConceded: 39,
      shotsFaced: 172, shotsOnTargetFaced: 140, saves: 101, savePercentage: 72.1,
      psxgFaced: 43.1, goalsPrevented: +4.1, crossesFaced: 185, crossesClaimed: 160,
      crossClaimSuccessRate: 86.5, punches: 26, sweeperActions: 32, avgSweepingDist: '14.5 m',
      passAccuracyTotal: 68.2, passAccuracyShort: 88.0, passAccuracyLong: 51.4, penaltySaves: '3 / 4'
    }
  },
  {
    id: 'andre-onana',
    name: 'André Onana',
    callsign: 'The Initiator',
    team: 'Manchester United',
    league: 'Premier League',
    level: 'UCL Finalist',
    age: 29,
    height: '190 cm (6\'3")',
    weight: '82 kg',
    strongFoot: 'Right (Both Feet Playmaker)',
    gloveModel: 'Rinat Egotiko Stellar',
    archetype: 'Deep Playmaker & Close Range Wall',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=500&auto=format&fit=crop&q=80',
    kvrRating: 8.9,
    bio: 'Fearless with the ball at his feet, functioning as an extra outfield centre-back during possession transitions.',
    attributes: { reflexes: 92, shotStopping: 90, distribution: 96, sweeping: 89, boxCommand: 85, handling: 84, aerialDuel: 84, composure: 93 },
    seasonStats: {
      matches: 32, minutesPlayed: 2880, cleanSheets: 11, cleanSheetStreak: 2, goalsConceded: 42,
      shotsFaced: 195, shotsOnTargetFaced: 160, saves: 118, savePercentage: 73.8,
      psxgFaced: 47.2, goalsPrevented: +5.2, crossesFaced: 170, crossesClaimed: 145,
      crossClaimSuccessRate: 85.3, punches: 18, sweeperActions: 38, avgSweepingDist: '16.0 m',
      passAccuracyTotal: 84.8, passAccuracyShort: 95.1, passAccuracyLong: 66.0, penaltySaves: '2 / 5'
    }
  },

  // =================== LA LIGA ===================
  {
    id: 'thibaut-courtois',
    name: 'Thibaut Courtois',
    callsign: 'El Pulpo',
    team: 'Real Madrid',
    league: 'La Liga',
    level: 'World Elite / UCL Champion',
    age: 32,
    height: '200 cm (6\'7")',
    weight: '96 kg',
    strongFoot: 'Left (4★ Weak)',
    gloveModel: 'Nike Vapor Grip3 Extended',
    archetype: 'Towering Shot-Stopper & Box Dominator',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    kvrRating: 9.6,
    bio: 'Colossal 2-meter wingspan allowing unreachable saves in the upper 90s. Dominates aerial crosses with unmatched high-point reach.',
    attributes: { reflexes: 95, shotStopping: 98, distribution: 82, sweeping: 78, boxCommand: 97, handling: 96, aerialDuel: 99, composure: 95 },
    seasonStats: {
      matches: 31, minutesPlayed: 2790, cleanSheets: 16, cleanSheetStreak: 3, goalsConceded: 23,
      shotsFaced: 155, shotsOnTargetFaced: 134, saves: 111, savePercentage: 82.8,
      psxgFaced: 31.4, goalsPrevented: +8.4, crossesFaced: 194, crossesClaimed: 181,
      crossClaimSuccessRate: 93.3, punches: 13, sweeperActions: 26, avgSweepingDist: '13.6 m',
      passAccuracyTotal: 79.8, passAccuracyShort: 91.4, passAccuracyLong: 62.0, penaltySaves: '4 / 5'
    }
  },
  {
    id: 'jan-oblak',
    name: 'Jan Oblak',
    callsign: 'The Slovenian Fortress',
    team: 'Atlético Madrid',
    league: 'La Liga',
    level: '5x Zamora Trophy Winner',
    age: 32,
    height: '188 cm (6\'2")',
    weight: '87 kg',
    strongFoot: 'Right',
    gloveModel: 'Puma Future Grip 1',
    archetype: 'Positional Perfectionist & Low Smother',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
    kvrRating: 9.3,
    bio: '5-time Ricardo Zamora Trophy winner. Renowned for robotic positional accuracy, magnetic handling, and never giving away unnecessary rebounds.',
    attributes: { reflexes: 94, shotStopping: 96, distribution: 78, sweeping: 76, boxCommand: 94, handling: 98, aerialDuel: 92, composure: 97 },
    seasonStats: {
      matches: 33, minutesPlayed: 2970, cleanSheets: 15, cleanSheetStreak: 4, goalsConceded: 28,
      shotsFaced: 145, shotsOnTargetFaced: 118, saves: 90, savePercentage: 76.3,
      psxgFaced: 34.2, goalsPrevented: +6.2, crossesFaced: 182, crossesClaimed: 165,
      crossClaimSuccessRate: 90.7, punches: 17, sweeperActions: 21, avgSweepingDist: '12.8 m',
      passAccuracyTotal: 74.2, passAccuracyShort: 88.5, passAccuracyLong: 54.0, penaltySaves: '3 / 4'
    }
  },
  {
    id: 'marc-ter-stegen',
    name: 'Marc-André ter Stegen',
    callsign: 'The German General',
    team: 'FC Barcelona',
    league: 'La Liga',
    level: 'Zamora Winner & Club Captain',
    age: 32,
    height: '187 cm (6\'2")',
    weight: '85 kg',
    strongFoot: 'Both Feet Elite',
    gloveModel: 'Adidas Predator Pro Manuel Edition',
    archetype: 'Sweeper & Short Passing Architect',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80',
    kvrRating: 9.3,
    bio: 'Conceded a historic record-low 20 goals in La Liga championship season. Elite German sweep technique and laser-precise short distribution.',
    attributes: { reflexes: 93, shotStopping: 93, distribution: 97, sweeping: 93, boxCommand: 89, handling: 91, aerialDuel: 88, composure: 96 },
    seasonStats: {
      matches: 28, minutesPlayed: 2520, cleanSheets: 15, cleanSheetStreak: 5, goalsConceded: 21,
      shotsFaced: 120, shotsOnTargetFaced: 95, saves: 74, savePercentage: 77.9,
      psxgFaced: 27.8, goalsPrevented: +6.8, crossesFaced: 140, crossesClaimed: 124,
      crossClaimSuccessRate: 88.6, punches: 12, sweeperActions: 40, avgSweepingDist: '17.2 m',
      passAccuracyTotal: 89.4, passAccuracyShort: 97.8, passAccuracyLong: 73.1, penaltySaves: '2 / 3'
    }
  },
  {
    id: 'unai-simon',
    name: 'Unai Simón',
    callsign: 'Spain Golden Glove',
    team: 'Athletic Club',
    league: 'La Liga',
    level: 'Zamora Winner & Euro 2024 Champion',
    age: 27,
    height: '190 cm (6\'3")',
    weight: '88 kg',
    strongFoot: 'Right',
    gloveModel: 'Reusch Attrakt G3 Fusion',
    archetype: 'Aggressive Aerial Stopper',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    kvrRating: 9.2,
    bio: 'Spain starting goalkeeper in Euro 2024 triumph and current Zamora trophy holder. Dominant in air and brave in low 1v1 spreads.',
    attributes: { reflexes: 92, shotStopping: 93, distribution: 86, sweeping: 87, boxCommand: 94, handling: 90, aerialDuel: 94, composure: 92 },
    seasonStats: {
      matches: 34, minutesPlayed: 3060, cleanSheets: 17, cleanSheetStreak: 4, goalsConceded: 31,
      shotsFaced: 152, shotsOnTargetFaced: 122, saves: 91, savePercentage: 74.6,
      psxgFaced: 36.8, goalsPrevented: +5.8, crossesFaced: 195, crossesClaimed: 178,
      crossClaimSuccessRate: 91.3, punches: 16, sweeperActions: 36, avgSweepingDist: '15.4 m',
      passAccuracyTotal: 77.5, passAccuracyShort: 91.2, passAccuracyLong: 59.8, penaltySaves: '3 / 4'
    }
  },

  // =================== BUNDESLIGA ===================
  {
    id: 'manuel-neuer',
    name: 'Manuel Neuer',
    callsign: 'The Prototype',
    team: 'Bayern Munich',
    league: 'Bundesliga',
    level: 'World Cup Champion & Legend',
    age: 38,
    height: '193 cm (6\'4")',
    weight: '93 kg',
    strongFoot: 'Right (Both Feet Elite)',
    gloveModel: 'Adidas Predator Pro Neuer Edition',
    archetype: 'Pioneer Sweeper-Keeper',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80',
    kvrRating: 9.5,
    bio: 'The goalkeeper who revolutionized modern football. Defends the entire defensive half with fearless anticipation and serves as an 11th outfield passer.',
    attributes: { reflexes: 93, shotStopping: 93, distribution: 97, sweeping: 99, boxCommand: 92, handling: 94, aerialDuel: 89, composure: 99 },
    seasonStats: {
      matches: 26, minutesPlayed: 2340, cleanSheets: 12, cleanSheetStreak: 2, goalsConceded: 25,
      shotsFaced: 132, shotsOnTargetFaced: 106, saves: 81, savePercentage: 76.4,
      psxgFaced: 32.1, goalsPrevented: +7.1, crossesFaced: 140, crossesClaimed: 124,
      crossClaimSuccessRate: 88.6, punches: 16, sweeperActions: 68, avgSweepingDist: '19.8 m',
      passAccuracyTotal: 90.1, passAccuracyShort: 98.2, passAccuracyLong: 77.5, penaltySaves: '3 / 4'
    }
  },
  {
    id: 'gregor-kobel',
    name: 'Gregor Kobel',
    callsign: 'The Wall of Westfalen',
    team: 'Borussia Dortmund',
    league: 'Bundesliga',
    level: 'UCL Finalist & Bundesliga Best',
    age: 27,
    height: '195 cm (6\'5")',
    weight: '88 kg',
    strongFoot: 'Right',
    gloveModel: 'Reusch Attrakt Gold X',
    archetype: 'Point-Blank Shot-Stopper & Leader',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    kvrRating: 9.3,
    bio: 'Voted best goalkeeper in the Bundesliga. Single-handedly turned Champions League knockouts with miraculous reflex saves and commanding presence.',
    attributes: { reflexes: 96, shotStopping: 96, distribution: 83, sweeping: 84, boxCommand: 92, handling: 92, aerialDuel: 94, composure: 94 },
    seasonStats: {
      matches: 31, minutesPlayed: 2790, cleanSheets: 14, cleanSheetStreak: 3, goalsConceded: 32,
      shotsFaced: 168, shotsOnTargetFaced: 135, saves: 103, savePercentage: 76.3,
      psxgFaced: 40.5, goalsPrevented: +8.5, crossesFaced: 180, crossesClaimed: 164,
      crossClaimSuccessRate: 91.1, punches: 20, sweeperActions: 34, avgSweepingDist: '15.2 m',
      passAccuracyTotal: 81.4, passAccuracyShort: 93.0, passAccuracyLong: 62.5, penaltySaves: '3 / 5'
    }
  },
  {
    id: 'lukas-hradecky',
    name: 'Lukáš Hrádecký',
    callsign: 'The Invincible Captain',
    team: 'Bayer Leverkusen',
    league: 'Bundesliga',
    level: 'Invincible Bundesliga Champion',
    age: 35,
    height: '192 cm (6\'4")',
    weight: '85 kg',
    strongFoot: 'Right',
    gloveModel: 'Uhlsport Aerored Supergrip',
    archetype: 'Composed Veteran & Transition Anchor',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=80',
    kvrRating: 9.1,
    bio: 'Captain of Leverkusen historic undefeated domestic double. Calm, vocal organizer who conceded the fewest goals in the Bundesliga.',
    attributes: { reflexes: 91, shotStopping: 92, distribution: 89, sweeping: 88, boxCommand: 91, handling: 90, aerialDuel: 89, composure: 97 },
    seasonStats: {
      matches: 33, minutesPlayed: 2970, cleanSheets: 15, cleanSheetStreak: 4, goalsConceded: 24,
      shotsFaced: 135, shotsOnTargetFaced: 104, saves: 80, savePercentage: 76.9,
      psxgFaced: 31.2, goalsPrevented: +7.2, crossesFaced: 155, crossesClaimed: 140,
      crossClaimSuccessRate: 90.3, punches: 14, sweeperActions: 42, avgSweepingDist: '16.5 m',
      passAccuracyTotal: 85.0, passAccuracyShort: 95.4, passAccuracyLong: 67.2, penaltySaves: '2 / 3'
    }
  },

  // =================== SERIE A ===================
  {
    id: 'yann-sommer',
    name: 'Yann Sommer',
    callsign: 'The Precision Swiss',
    team: 'Inter Milan',
    league: 'Serie A',
    level: 'Scudetto Winner',
    age: 36,
    height: '183 cm (6\'0")',
    weight: '79 kg',
    strongFoot: 'Right (Both Feet Capable)',
    gloveModel: 'Puma Ultra Grip 1 Hybrid',
    archetype: 'Reflex Speed & Low Angle Specialist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    kvrRating: 9.4,
    bio: 'Scudetto champion with 19 clean sheets in a single Serie A campaign. Supreme spring from balls of the feet and legendary penalty reflexes.',
    attributes: { reflexes: 97, shotStopping: 95, distribution: 91, sweeping: 88, boxCommand: 87, handling: 92, aerialDuel: 84, composure: 97 },
    seasonStats: {
      matches: 34, minutesPlayed: 3060, cleanSheets: 19, cleanSheetStreak: 5, goalsConceded: 19,
      shotsFaced: 128, shotsOnTargetFaced: 99, saves: 80, savePercentage: 80.8,
      psxgFaced: 27.5, goalsPrevented: +8.5, crossesFaced: 144, crossesClaimed: 126,
      crossClaimSuccessRate: 87.5, punches: 16, sweeperActions: 39, avgSweepingDist: '16.2 m',
      passAccuracyTotal: 86.8, passAccuracyShort: 96.5, passAccuracyLong: 71.0, penaltySaves: '3 / 4'
    }
  },
  {
    id: 'mike-maignan',
    name: 'Mike Maignan',
    callsign: 'Magic Mike',
    team: 'AC Milan',
    league: 'Serie A',
    level: 'Serie A Best Goalkeeper',
    age: 29,
    height: '191 cm (6\'3")',
    weight: '89 kg',
    strongFoot: 'Right (World Class Direct Assist)',
    gloveModel: 'Uhlsport Speed Contact Supergrip+',
    archetype: 'Explosive Sweeper & Laser Long Passer',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80',
    kvrRating: 9.4,
    bio: 'France national team starting goalkeeper. Known for thunderous 70-yard direct assist kicks, explosive jump reach, and imposing leadership.',
    attributes: { reflexes: 96, shotStopping: 95, distribution: 95, sweeping: 93, boxCommand: 94, handling: 93, aerialDuel: 92, composure: 96 },
    seasonStats: {
      matches: 29, minutesPlayed: 2610, cleanSheets: 13, cleanSheetStreak: 3, goalsConceded: 28,
      shotsFaced: 144, shotsOnTargetFaced: 114, saves: 86, savePercentage: 75.4,
      psxgFaced: 34.6, goalsPrevented: +6.6, crossesFaced: 165, crossesClaimed: 151,
      crossClaimSuccessRate: 91.5, punches: 18, sweeperActions: 45, avgSweepingDist: '17.6 m',
      passAccuracyTotal: 84.5, passAccuracyShort: 94.2, passAccuracyLong: 71.8, penaltySaves: '4 / 6'
    }
  },
  {
    id: 'michele-di-gregorio',
    name: 'Michele Di Gregorio',
    callsign: 'The Juventus Shield',
    team: 'Juventus',
    league: 'Serie A',
    level: 'Serie A Best Goalkeeper Award',
    age: 27,
    height: '187 cm (6\'2")',
    weight: '82 kg',
    strongFoot: 'Right',
    gloveModel: 'Reusch Attrakt Fusion',
    archetype: 'Agile Shot-Stopper & Build-Up Hub',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80',
    kvrRating: 9.1,
    bio: 'Winner of Serie A Goalkeeper of the Year award. Extraordinary reflexes from close range and flawless distribution under high tactical press.',
    attributes: { reflexes: 95, shotStopping: 94, distribution: 88, sweeping: 86, boxCommand: 89, handling: 91, aerialDuel: 87, composure: 93 },
    seasonStats: {
      matches: 33, minutesPlayed: 2970, cleanSheets: 14, cleanSheetStreak: 3, goalsConceded: 27,
      shotsFaced: 156, shotsOnTargetFaced: 126, saves: 99, savePercentage: 78.6,
      psxgFaced: 34.2, goalsPrevented: +7.2, crossesFaced: 162, crossesClaimed: 145,
      crossClaimSuccessRate: 89.5, punches: 17, sweeperActions: 32, avgSweepingDist: '15.0 m',
      passAccuracyTotal: 85.2, passAccuracyShort: 95.0, passAccuracyLong: 68.4, penaltySaves: '3 / 4'
    }
  },

  // =================== LIGUE 1 ===================
  {
    id: 'gianluigi-donnarumma',
    name: 'Gianluigi Donnarumma',
    callsign: 'Gigio',
    team: 'Paris Saint-Germain',
    league: 'Ligue 1',
    level: 'Euro MVP & Champions League',
    age: 26,
    height: '196 cm (6\'5")',
    weight: '90 kg',
    strongFoot: 'Right',
    gloveModel: 'Adidas Predator Pro Fingersave',
    archetype: 'Point-Blank Reflex Colossus',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80',
    kvrRating: 9.3,
    bio: 'Stupendous wingspan and cat-like reaction speed on point-blank rebound saves. Ranks in the top 2% across Europe in goals prevented per 90.',
    attributes: { reflexes: 98, shotStopping: 97, distribution: 76, sweeping: 75, boxCommand: 92, handling: 89, aerialDuel: 93, composure: 92 },
    seasonStats: {
      matches: 29, minutesPlayed: 2610, cleanSheets: 13, cleanSheetStreak: 2, goalsConceded: 26,
      shotsFaced: 148, shotsOnTargetFaced: 118, saves: 92, savePercentage: 78.0,
      psxgFaced: 33.5, goalsPrevented: +7.5, crossesFaced: 160, crossesClaimed: 143,
      crossClaimSuccessRate: 89.4, punches: 18, sweeperActions: 22, avgSweepingDist: '13.1 m',
      passAccuracyTotal: 79.2, passAccuracyShort: 90.6, passAccuracyLong: 58.0, penaltySaves: '3 / 5'
    }
  },
  {
    id: 'lucas-chevalier',
    name: 'Lucas Chevalier',
    callsign: 'The French Prodigy',
    team: 'Lille OSC',
    league: 'Ligue 1',
    level: 'France National Team / UCL Star',
    age: 23,
    height: '189 cm (6\'2")',
    weight: '81 kg',
    strongFoot: 'Right',
    gloveModel: 'Uhlsport Supergrip+ Tension',
    archetype: 'Dynamic High-Reflex Shot-Stopper',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=500&auto=format&fit=crop&q=80',
    kvrRating: 9.2,
    bio: 'One of the hottest young goalkeeping prospects in world football. Heroic Champions League performances against Real Madrid and Atletico Madrid.',
    attributes: { reflexes: 96, shotStopping: 94, distribution: 85, sweeping: 88, boxCommand: 90, handling: 88, aerialDuel: 89, composure: 93 },
    seasonStats: {
      matches: 33, minutesPlayed: 2970, cleanSheets: 15, cleanSheetStreak: 3, goalsConceded: 30,
      shotsFaced: 160, shotsOnTargetFaced: 128, saves: 98, savePercentage: 76.6,
      psxgFaced: 37.8, goalsPrevented: +7.8, crossesFaced: 172, crossesClaimed: 155,
      crossClaimSuccessRate: 90.1, punches: 19, sweeperActions: 37, avgSweepingDist: '16.0 m',
      passAccuracyTotal: 83.4, passAccuracyShort: 93.5, passAccuracyLong: 64.0, penaltySaves: '2 / 3'
    }
  },
  {
    id: 'brice-samba',
    name: 'Brice Samba',
    callsign: 'The Unflappable',
    team: 'RC Lens',
    league: 'Ligue 1',
    level: 'Ligue 1 Best Goalkeeper Trophy',
    age: 30,
    height: '187 cm (6\'2")',
    weight: '84 kg',
    strongFoot: 'Right',
    gloveModel: 'Rinat Egotiko',
    archetype: 'Brave Box Commander & Sweeper',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
    kvrRating: 9.1,
    bio: 'Ligue 1 Best Goalkeeper award winner and France international. Renowned for supreme calmness on cross claims and commanding authority in the box.',
    attributes: { reflexes: 93, shotStopping: 93, distribution: 88, sweeping: 90, boxCommand: 94, handling: 91, aerialDuel: 92, composure: 96 },
    seasonStats: {
      matches: 32, minutesPlayed: 2880, cleanSheets: 14, cleanSheetStreak: 3, goalsConceded: 32,
      shotsFaced: 150, shotsOnTargetFaced: 120, saves: 88, savePercentage: 73.3,
      psxgFaced: 36.4, goalsPrevented: +4.4, crossesFaced: 180, crossesClaimed: 164,
      crossClaimSuccessRate: 91.1, punches: 21, sweeperActions: 40, avgSweepingDist: '16.4 m',
      passAccuracyTotal: 82.0, passAccuracyShort: 92.4, passAccuracyLong: 63.5, penaltySaves: '3 / 4'
    }
  },

  // =================== CUSTOM / GRASSROOTS TALENT ===================
  {
    id: 'alex-rivera',
    name: 'Alex Rivera',
    callsign: 'The Sentinel',
    team: 'Westfield Athletic',
    league: 'Custom / Academy',
    level: 'Semi-Professional Talent',
    age: 23,
    height: '191 cm (6\'3")',
    weight: '87 kg',
    strongFoot: 'Right (4★ Weak)',
    gloveModel: 'Predator Pro Roll-Finger',
    archetype: 'Sweeper-Keeper Specialist',
    avatar: '/keeper-avatar.jpg',
    kvrRating: 8.8,
    bio: 'High-line sweeper-keeper with exceptional reaction speed and pinpoint diagonal distribution under aggressive press.',
    attributes: { reflexes: 92, shotStopping: 88, distribution: 89, sweeping: 94, boxCommand: 84, handling: 85, aerialDuel: 87, composure: 90 },
    seasonStats: {
      matches: 22, minutesPlayed: 1980, cleanSheets: 11, cleanSheetStreak: 3, goalsConceded: 17,
      shotsFaced: 118, shotsOnTargetFaced: 94, saves: 77, savePercentage: 81.9,
      psxgFaced: 24.8, goalsPrevented: +7.8, crossesFaced: 142, crossesClaimed: 129,
      crossClaimSuccessRate: 90.8, punches: 18, sweeperActions: 46, avgSweepingDist: '17.4 m',
      passAccuracyTotal: 84.2, passAccuracyShort: 94.6, passAccuracyLong: 68.4, penaltySaves: '2 / 3'
    }
  }
];

// Preloaded detailed matches for active display
export const INITIAL_MATCHES = [
  {
    id: 'm-201',
    keeperId: 'alisson-becker',
    date: '2026-10-19',
    opponent: 'Manchester City',
    venue: 'Home',
    result: 'W 1-0',
    cleanSheet: true,
    shotsFaced: 11,
    shotsOnTarget: 7,
    saves: 7,
    goalsConceded: 0,
    psxgFaced: 2.34,
    goalsPrevented: +2.34,
    crossesClaimed: 9,
    crossesTotal: 10,
    sweeperClearances: 4,
    passAccuracy: 91.2,
    rating: 9.8,
    mvp: true,
    notes: 'World-class performance. Denied Haaland 1v1 in 68th minute and started counterattack with 60-yard side-volley assist.'
  },
  {
    id: 'm-202',
    keeperId: 'alisson-becker',
    date: '2026-10-12',
    opponent: 'Chelsea FC',
    venue: 'Away',
    result: 'W 2-0',
    cleanSheet: true,
    shotsFaced: 8,
    shotsOnTarget: 5,
    saves: 5,
    goalsConceded: 0,
    psxgFaced: 1.45,
    goalsPrevented: +1.45,
    crossesClaimed: 7,
    crossesTotal: 7,
    sweeperClearances: 3,
    passAccuracy: 88.0,
    rating: 9.2,
    mvp: false,
    notes: 'Flawless box command. Snuffed out two cutback opportunities with proactive sliding smothers.'
  },
  {
    id: 'm-203',
    keeperId: 'alisson-becker',
    date: '2026-10-05',
    opponent: 'Arsenal FC',
    venue: 'Away',
    result: 'D 2-2',
    cleanSheet: false,
    shotsFaced: 12,
    shotsOnTarget: 8,
    saves: 6,
    goalsConceded: 2,
    psxgFaced: 2.85,
    goalsPrevented: +0.85,
    crossesClaimed: 8,
    crossesTotal: 9,
    sweeperClearances: 5,
    passAccuracy: 84.5,
    rating: 8.7,
    mvp: false,
    notes: 'Clutch double save in stoppage time from corner scrum to preserve vital point on the road.'
  },
  {
    id: 'm-101',
    keeperId: 'alex-rivera',
    date: '2026-10-18',
    opponent: 'Kingswood United',
    venue: 'Home',
    result: 'W 2-0',
    cleanSheet: true,
    shotsFaced: 7,
    shotsOnTarget: 6,
    saves: 6,
    goalsConceded: 0,
    psxgFaced: 1.84,
    goalsPrevented: +1.84,
    crossesClaimed: 7,
    crossesTotal: 8,
    sweeperClearances: 3,
    passAccuracy: 88.5,
    rating: 9.4,
    mvp: true,
    notes: 'Outstanding triple-save sequence in 72nd min. Dominated high deliveries in windy conditions.'
  }
];

// 9-Zone Goal Face Quadrant Definition
export const GOAL_ZONES = [
  { id: 'TL', name: 'Top Left (Postage Stamp)', x: 0, y: 0, shotsFaced: 12, saved: 10, conceded: 2, savePct: 83.3, avgPsxg: 0.68, difficulty: 'Extreme' },
  { id: 'TM', name: 'Top Center (Under Bar)', x: 1, y: 0, shotsFaced: 8, saved: 7, conceded: 1, savePct: 87.5, avgPsxg: 0.52, difficulty: 'High' },
  { id: 'TR', name: 'Top Right (Top Bins)', x: 2, y: 0, shotsFaced: 14, saved: 11, conceded: 3, savePct: 78.6, avgPsxg: 0.72, difficulty: 'Extreme' },
  { id: 'ML', name: 'Mid Left (Diving Height)', x: 0, y: 1, shotsFaced: 16, saved: 14, conceded: 2, savePct: 87.5, avgPsxg: 0.45, difficulty: 'Moderate' },
  { id: 'MC', name: 'Mid Center (Body Reflex)', x: 1, y: 1, shotsFaced: 15, saved: 14, conceded: 1, savePct: 93.3, avgPsxg: 0.38, difficulty: 'Low' },
  { id: 'MR', name: 'Mid Right (Diving Height)', x: 2, y: 1, shotsFaced: 18, saved: 15, conceded: 3, savePct: 83.3, avgPsxg: 0.48, difficulty: 'Moderate' },
  { id: 'BL', name: 'Bottom Left (Side Netting)', x: 0, y: 2, shotsFaced: 19, saved: 16, conceded: 3, savePct: 84.2, avgPsxg: 0.58, difficulty: 'High' },
  { id: 'BM', name: 'Bottom Center (Foot/5-Hole)', x: 1, y: 2, shotsFaced: 9, saved: 8, conceded: 1, savePct: 88.9, avgPsxg: 0.42, difficulty: 'Moderate' },
  { id: 'BR', name: 'Bottom Right (Side Netting)', x: 2, y: 2, shotsFaced: 21, saved: 16, conceded: 5, savePct: 76.2, avgPsxg: 0.62, difficulty: 'High' }
];

// Preloaded detailed shot event telemetry
export const SAMPLE_SHOT_EVENTS = [
  { id: 's-1', zone: 'TL', outcome: 'Saved', type: 'Diving Fingertip Tip-Over', psxg: 0.74, minute: '23', shooterDist: '21 m', speed: '96 km/h', opponent: 'Man City' },
  { id: 's-2', zone: 'BR', outcome: 'Saved', type: 'Low Smother / Push Wide', psxg: 0.61, minute: '41', shooterDist: '13 m', speed: '88 km/h', opponent: 'Man City' },
  { id: 's-3', zone: 'MC', outcome: 'Saved', type: 'Chest Block & Held', psxg: 0.32, minute: '58', shooterDist: '18 m', speed: '79 km/h', opponent: 'Chelsea' },
  { id: 's-4', zone: 'TR', outcome: 'Saved', type: 'Acrobatic Claw Save', psxg: 0.81, minute: '72', shooterDist: '19 m', speed: '102 km/h', opponent: 'Chelsea' },
  { id: 's-5', zone: 'BL', outcome: 'Saved', type: 'Quick Reflex Leg Save', psxg: 0.55, minute: '84', shooterDist: '11 m', speed: '84 km/h', opponent: 'Arsenal' },
  { id: 's-6', zone: 'BR', outcome: 'Goal', type: 'Cutback Post-In', psxg: 0.88, minute: '64', shooterDist: '9 m', speed: '104 km/h', opponent: 'Arsenal' },
  { id: 's-7', zone: 'ML', outcome: 'Saved', type: 'Full-Stretch Parry', psxg: 0.49, minute: '31', shooterDist: '17 m', speed: '91 km/h', opponent: 'Man City' }
];

// Pitch Telemetry Zones
export const PITCH_TELEMETRY = {
  sweeperActions: [
    { id: 'sw-1', x: 22, y: 48, action: 'Slide Tackle Clearance', minute: '88', outcome: 'Success', match: 'Man City' },
    { id: 'sw-2', x: 26, y: 35, action: 'Sweeping Interception', minute: '34', outcome: 'Success', match: 'Chelsea' },
    { id: 'sw-3', x: 20, y: 62, action: 'Header Clearance Outside Box', minute: '67', outcome: 'Success', match: 'Chelsea' },
    { id: 'sw-4', x: 19, y: 50, action: '1v1 Rush & Smother', minute: '14', outcome: 'Success', match: 'Man City' },
    { id: 'sw-5', x: 28, y: 70, action: 'Wide Clearance to Touchline', minute: '52', outcome: 'Success', match: 'Arsenal' }
  ],
  distributionArcs: [
    { id: 'dist-1', start: [10, 50], end: [65, 82], type: 'Long Diagonal to Right Wing', success: true, pressured: true },
    { id: 'dist-2', start: [8, 50], end: [30, 20], type: 'Clipped Pass to Left Back', success: true, pressured: false },
    { id: 'dist-3', start: [8, 50], end: [32, 50], type: 'Driven Central Split Pass to Pivot', success: true, pressured: true },
    { id: 'dist-4', start: [12, 50], end: [72, 45], type: 'Goal Kick High Long Punt', success: false, pressured: false },
    { id: 'dist-5', start: [7, 50], end: [42, 85], type: 'Quick Side-Volley Counter', success: true, pressured: true },
    { id: 'dist-6', start: [10, 50], end: [28, 80], type: 'Low Rolled Ball to Right Back', success: true, pressured: false }
  ]
};

// Recommended Training Drills
export const DRILLS_LIBRARY = [
  {
    id: 'drill-1',
    title: 'Low-Driven Reaction & Recovery Dives',
    targetZone: 'Bottom Left / Right Corners',
    category: 'Shot Stopping',
    frequency: '2x / week',
    intensity: 'High',
    description: 'Rapid 3-ball rebound series focusing on explosive push from balls of the feet and getting body weight behind low skidding strikes.',
    videoTag: 'Reflex Speed'
  },
  {
    id: 'drill-2',
    title: 'Sweeper Rush & 1v1 Spread Technique',
    targetZone: '16m - 25m Sweeping Zone',
    category: 'Sweeping',
    frequency: '1x / week',
    intensity: 'Moderate',
    description: 'Timing rush-outs against through balls, decelerating 2 yards before attacker, and deploying the modern barrier/spread block.',
    videoTag: 'Decision Making'
  },
  {
    id: 'drill-3',
    title: 'Traffic Cross Claims & Punch Accuracy',
    targetZone: '6-Yard Box & Penalty Spot',
    category: 'Aerial Box Command',
    frequency: '2x / week',
    intensity: 'Very High',
    description: 'Catching crosses under intentional physical pad contact with attackers, reading trajectory in flight, and directional double-fist punch.',
    videoTag: 'Aerial Command'
  },
  {
    id: 'drill-4',
    title: 'Press-Bust Clip Passes to Fullbacks',
    targetZone: 'Wide Flanks (30m - 50m)',
    category: 'Distribution',
    frequency: '3x / week',
    intensity: 'Medium',
    description: 'Simulated 2-striker high press. Quick 2-touch trap and side-foot clipped lofted pass over pressing winger directly to teammate in stride.',
    videoTag: 'Ball Mastery'
  }
];
