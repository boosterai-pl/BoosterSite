import * as migration_20260604_191017_initial from './20260604_191017_initial';
import * as migration_20260604_191119_headline_refactor from './20260604_191119_headline_refactor';
import * as migration_20260605_232841_add_portrait_media_size from './20260605_232841_add_portrait_media_size';

export const migrations = [
  {
    up: migration_20260604_191017_initial.up,
    down: migration_20260604_191017_initial.down,
    name: '20260604_191017_initial',
  },
  {
    up: migration_20260604_191119_headline_refactor.up,
    down: migration_20260604_191119_headline_refactor.down,
    name: '20260604_191119_headline_refactor',
  },
  {
    up: migration_20260605_232841_add_portrait_media_size.up,
    down: migration_20260605_232841_add_portrait_media_size.down,
    name: '20260605_232841_add_portrait_media_size'
  },
];
