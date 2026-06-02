import * as migration_20260602_150542 from './20260602_150542';

export const migrations = [
  {
    up: migration_20260602_150542.up,
    down: migration_20260602_150542.down,
    name: '20260602_150542'
  },
];
