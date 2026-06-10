import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_job_roles_employment_type" AS ENUM('full-time', 'part-time', 'contract', 'internship');
  CREATE TABLE "job_roles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"sort_order" varchar NOT NULL,
  	"is_open" boolean DEFAULT true,
  	"location" varchar NOT NULL,
  	"employment_type" "enum_job_roles_employment_type" DEFAULT 'full-time' NOT NULL,
  	"apply_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "job_roles_locales" (
  	"title" varchar NOT NULL,
  	"department" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "job_roles_find" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "job_roles_create" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "job_roles_update" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "job_roles_delete" boolean DEFAULT false;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "job_roles_id" integer;
  ALTER TABLE "job_roles_locales" ADD CONSTRAINT "job_roles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_roles"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "job_roles_updated_at_idx" ON "job_roles" USING btree ("updated_at");
  CREATE INDEX "job_roles_created_at_idx" ON "job_roles" USING btree ("created_at");
  CREATE UNIQUE INDEX "job_roles_locales_locale_parent_id_unique" ON "job_roles_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_job_roles_fk" FOREIGN KEY ("job_roles_id") REFERENCES "public"."job_roles"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_job_roles_id_idx" ON "payload_locked_documents_rels" USING btree ("job_roles_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "job_roles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "job_roles_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "job_roles" CASCADE;
  DROP TABLE "job_roles_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_job_roles_fk";
  
  DROP INDEX "payload_locked_documents_rels_job_roles_id_idx";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "job_roles_find";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "job_roles_create";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "job_roles_update";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "job_roles_delete";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "job_roles_id";
  DROP TYPE "public"."enum_job_roles_employment_type";`)
}
