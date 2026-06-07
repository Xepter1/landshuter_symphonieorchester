import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`albums\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text,
  	\`date\` text,
  	\`description\` text,
  	\`cover_image_id\` integer,
  	\`related_event_id\` integer,
  	\`published\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`related_event_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`albums_cover_image_idx\` ON \`albums\` (\`cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`albums_related_event_idx\` ON \`albums\` (\`related_event_id\`);`)
  await db.run(sql`CREATE INDEX \`albums_updated_at_idx\` ON \`albums\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`albums_created_at_idx\` ON \`albums\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`albums_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`albums\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`albums_rels_order_idx\` ON \`albums_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`albums_rels_parent_idx\` ON \`albums_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`albums_rels_path_idx\` ON \`albums_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`albums_rels_media_id_idx\` ON \`albums_rels\` (\`media_id\`);`)
  await db.run(sql`DROP TABLE \`events_gallery\`;`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`albums_id\` integer REFERENCES albums(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_albums_id_idx\` ON \`payload_locked_documents_rels\` (\`albums_id\`);`)
  await db.run(sql`ALTER TABLE \`settings\` ADD \`banner_enabled\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`settings\` ADD \`banner_text\` text;`)
  await db.run(sql`ALTER TABLE \`settings\` ADD \`banner_link_label\` text;`)
  await db.run(sql`ALTER TABLE \`settings\` ADD \`banner_link_url\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`events_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_gallery_order_idx\` ON \`events_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_gallery_parent_id_idx\` ON \`events_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_gallery_image_idx\` ON \`events_gallery\` (\`image_id\`);`)
  await db.run(sql`DROP TABLE \`albums\`;`)
  await db.run(sql`DROP TABLE \`albums_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`events_id\` integer,
  	\`news_id\` integer,
  	\`members_id\` integer,
  	\`media_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`events_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`news_id\`) REFERENCES \`news\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`members_id\`) REFERENCES \`members\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "pages_id", "events_id", "news_id", "members_id", "media_id", "users_id") SELECT "id", "order", "parent_id", "path", "pages_id", "events_id", "news_id", "members_id", "media_id", "users_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_events_id_idx\` ON \`payload_locked_documents_rels\` (\`events_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_news_id_idx\` ON \`payload_locked_documents_rels\` (\`news_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_members_id_idx\` ON \`payload_locked_documents_rels\` (\`members_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`settings\` DROP COLUMN \`banner_enabled\`;`)
  await db.run(sql`ALTER TABLE \`settings\` DROP COLUMN \`banner_text\`;`)
  await db.run(sql`ALTER TABLE \`settings\` DROP COLUMN \`banner_link_label\`;`)
  await db.run(sql`ALTER TABLE \`settings\` DROP COLUMN \`banner_link_url\`;`)
}
