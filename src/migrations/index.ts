import * as migration_20260607_145024_initial from './20260607_145024_initial';
import * as migration_20260607_152934_albums_banner_galerie from './20260607_152934_albums_banner_galerie';

export const migrations = [
  {
    up: migration_20260607_145024_initial.up,
    down: migration_20260607_145024_initial.down,
    name: '20260607_145024_initial',
  },
  {
    up: migration_20260607_152934_albums_banner_galerie.up,
    down: migration_20260607_152934_albums_banner_galerie.down,
    name: '20260607_152934_albums_banner_galerie'
  },
];
