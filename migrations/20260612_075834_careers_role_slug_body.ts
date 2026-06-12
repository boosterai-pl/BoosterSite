import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "job_roles" ADD COLUMN "slug" varchar NOT NULL;
  ALTER TABLE "job_roles_locales" ADD COLUMN "body" jsonb;
  CREATE UNIQUE INDEX "job_roles_slug_idx" ON "job_roles" USING btree ("slug");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "job_roles_slug_idx";
  ALTER TABLE "job_roles" DROP COLUMN "slug";
  ALTER TABLE "job_roles_locales" DROP COLUMN "body";`)
}
