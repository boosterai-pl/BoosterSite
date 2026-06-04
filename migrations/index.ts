import * as migration_20260604_191017_initial from './20260604_191017_initial';
import * as migration_20260604_191119_headline_refactor from './20260604_191119_headline_refactor';

export const migrations = [
  {
    up: migration_20260604_191017_initial.up,
    down: migration_20260604_191017_initial.down,
    name: '20260604_191017_initial',
  },
  {
    up: migration_20260604_191119_headline_refactor.up,
    down: migration_20260604_191119_headline_refactor.down,
    name: '20260604_191119_headline_refactor'
  },
];
