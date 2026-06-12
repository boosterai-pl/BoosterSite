import * as migration_20260604_191017_initial from './20260604_191017_initial';
import * as migration_20260604_191119_headline_refactor from './20260604_191119_headline_refactor';
import * as migration_20260605_232841_add_portrait_media_size from './20260605_232841_add_portrait_media_size';
import * as migration_20260610_082726_add_job_roles from './20260610_082726_add_job_roles';
import * as migration_20260612_075834_careers_role_slug_body from './20260612_075834_careers_role_slug_body';

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
    name: '20260605_232841_add_portrait_media_size',
  },
  {
    up: migration_20260610_082726_add_job_roles.up,
    down: migration_20260610_082726_add_job_roles.down,
    name: '20260610_082726_add_job_roles',
  },
  {
    up: migration_20260612_075834_careers_role_slug_body.up,
    down: migration_20260612_075834_careers_role_slug_body.down,
    name: '20260612_075834_careers_role_slug_body'
  },
];
