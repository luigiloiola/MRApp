export const kGamesFeatures = new Map<number, string[]>([
  //Marvel Rivals
  [
    24890,
    [
      'match_info',
      'game_info'
    ]
  ]
]);

export const kGameClassIds = Array.from(kGamesFeatures.keys());

export const kWindowNames = {
  inGame: 'in_game',
  desktop: 'desktop'
};

export const kHotkeys = {
  toggle: 'sample_app_ts_showhide'
};
