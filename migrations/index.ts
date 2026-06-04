import * as migration_20260604_191017_initial from './20260604_191017_initial';

export const migrations = [
  {
    up: migration_20260604_191017_initial.up,
    down: migration_20260604_191017_initial.down,
    name: '20260604_191017_initial'
  },
];
