import * as migration_20260607_145024_initial from './20260607_145024_initial';

export const migrations = [
  {
    up: migration_20260607_145024_initial.up,
    down: migration_20260607_145024_initial.down,
    name: '20260607_145024_initial'
  },
];
