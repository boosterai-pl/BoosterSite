import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'pl');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" "enum_users_role" DEFAULT 'editor',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "posts_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "posts_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"featured_image_id" integer,
  	"author_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"reading_time" numeric,
  	"seo_og_image_id" integer,
  	"seo_canonical_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_version_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_featured_image_id" integer,
  	"version_author_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_reading_time" numeric,
  	"version_seo_og_image_id" integer,
  	"version_seo_canonical_url" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__posts_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_posts_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_tags_locales" (
  	"tag" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"sort_order" varchar NOT NULL,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "case_studies_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "case_studies_tags_locales" (
  	"tag" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "case_studies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"sort_order" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "case_studies_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"sort_order" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"photo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_members_locales" (
  	"role" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "practices_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "practices_sections_locales" (
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "practices" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"sort_order" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"hero_cta_href" varchar,
  	"cta_href" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "practices_locales" (
  	"eyebrow" varchar NOT NULL,
  	"headline_text" varchar NOT NULL,
  	"headline_accent" varchar,
  	"lead" varchar NOT NULL,
  	"hero_cta_micro_copy" varchar,
  	"hero_cta_label" varchar,
  	"cta_micro_copy" varchar,
  	"cta_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload_mcp_api_keys" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"label" varchar,
  	"description" varchar,
  	"posts_find" boolean DEFAULT false,
  	"posts_create" boolean DEFAULT false,
  	"posts_update" boolean DEFAULT false,
  	"posts_delete" boolean DEFAULT false,
  	"services_find" boolean DEFAULT false,
  	"case_studies_find" boolean DEFAULT false,
  	"team_members_find" boolean DEFAULT false,
  	"practices_find" boolean DEFAULT false,
  	"home_page_find" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"posts_id" integer,
  	"services_id" integer,
  	"case_studies_id" integer,
  	"team_members_id" integer,
  	"practices_id" integer,
  	"payload_mcp_api_keys_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"payload_mcp_api_keys_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_page_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_nav_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_hero_headline_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_hero_headline_lines_locales" (
  	"text" varchar NOT NULL,
  	"accent" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_hero_meta_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"component" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_hero_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_hero_meta_locales" (
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_marquee_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_manifesto_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"entry_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_manifesto_entries_locales" (
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_speed_headline_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_speed_headline_lines_locales" (
  	"text" varchar NOT NULL,
  	"accent" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_speed_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_speed_stats_locales" (
  	"suffix" varchar,
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_process_steps_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_partners_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_partners_items_locales" (
  	"role" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_insights_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"insight_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_insights_posts_locales" (
  	"category" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_cta_headline_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_cta_headline_lines_locales" (
  	"text" varchar NOT NULL,
  	"accent" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_footer_columns_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_footer_columns_locales" (
  	"heading" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_footer_bottom" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_footer_bottom_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand" varchar NOT NULL,
  	"contact_email" varchar NOT NULL,
  	"version" varchar NOT NULL,
  	"nav_cta_href" varchar NOT NULL,
  	"hero_primary_cta_href" varchar NOT NULL,
  	"hero_secondary_cta_href" varchar NOT NULL,
  	"cta_button_href" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_locales" (
  	"tagline" varchar NOT NULL,
  	"established_line" varchar NOT NULL,
  	"nav_cta_label" varchar NOT NULL,
  	"hero_eyebrow" varchar NOT NULL,
  	"hero_established_label" varchar,
  	"hero_lead" varchar NOT NULL,
  	"hero_primary_cta_label" varchar NOT NULL,
  	"hero_secondary_cta_label" varchar NOT NULL,
  	"manifesto_eyebrow" varchar NOT NULL,
  	"manifesto_headline_text" varchar NOT NULL,
  	"manifesto_headline_accent" varchar,
  	"services_eyebrow" varchar NOT NULL,
  	"services_headline_text" varchar NOT NULL,
  	"services_headline_accent" varchar,
  	"cases_eyebrow" varchar NOT NULL,
  	"cases_headline_text" varchar NOT NULL,
  	"cases_headline_accent" varchar,
  	"speed_eyebrow" varchar NOT NULL,
  	"process_eyebrow" varchar NOT NULL,
  	"process_headline_text" varchar NOT NULL,
  	"process_headline_accent" varchar,
  	"partners_eyebrow" varchar NOT NULL,
  	"team_eyebrow" varchar NOT NULL,
  	"team_headline_text" varchar NOT NULL,
  	"team_headline_accent" varchar,
  	"insights_eyebrow" varchar NOT NULL,
  	"insights_headline_text" varchar NOT NULL,
  	"insights_headline_accent" varchar,
  	"cta_eyebrow" varchar NOT NULL,
  	"cta_body" varchar NOT NULL,
  	"cta_button_label" varchar NOT NULL,
  	"footer_intro" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"case_studies_id" integer,
  	"team_members_id" integer
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_tags" ADD CONSTRAINT "posts_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_tags_locales" ADD CONSTRAINT "posts_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_team_members_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_tags" ADD CONSTRAINT "_posts_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_tags_locales" ADD CONSTRAINT "_posts_v_version_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_version_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_author_id_team_members_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_tags" ADD CONSTRAINT "services_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_tags_locales" ADD CONSTRAINT "services_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_tags" ADD CONSTRAINT "case_studies_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_tags_locales" ADD CONSTRAINT "case_studies_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_locales" ADD CONSTRAINT "case_studies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members_locales" ADD CONSTRAINT "team_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_sections" ADD CONSTRAINT "practices_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_sections_locales" ADD CONSTRAINT "practices_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_locales" ADD CONSTRAINT "practices_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_mcp_api_keys" ADD CONSTRAINT "payload_mcp_api_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_practices_fk" FOREIGN KEY ("practices_id") REFERENCES "public"."practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_nav" ADD CONSTRAINT "home_page_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_nav_locales" ADD CONSTRAINT "home_page_nav_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_headline_lines" ADD CONSTRAINT "home_page_hero_headline_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_headline_lines_locales" ADD CONSTRAINT "home_page_hero_headline_lines_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_hero_headline_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_meta_logos" ADD CONSTRAINT "home_page_hero_meta_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_hero_meta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_meta" ADD CONSTRAINT "home_page_hero_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_meta_locales" ADD CONSTRAINT "home_page_hero_meta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_hero_meta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_marquee" ADD CONSTRAINT "home_page_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_marquee_locales" ADD CONSTRAINT "home_page_marquee_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_manifesto_entries" ADD CONSTRAINT "home_page_manifesto_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_manifesto_entries_locales" ADD CONSTRAINT "home_page_manifesto_entries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_manifesto_entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_speed_headline_lines" ADD CONSTRAINT "home_page_speed_headline_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_speed_headline_lines_locales" ADD CONSTRAINT "home_page_speed_headline_lines_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_speed_headline_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_speed_stats" ADD CONSTRAINT "home_page_speed_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_speed_stats_locales" ADD CONSTRAINT "home_page_speed_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_speed_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_process_steps" ADD CONSTRAINT "home_page_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_process_steps_locales" ADD CONSTRAINT "home_page_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_partners_items" ADD CONSTRAINT "home_page_partners_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_partners_items_locales" ADD CONSTRAINT "home_page_partners_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_partners_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_insights_posts" ADD CONSTRAINT "home_page_insights_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_insights_posts_locales" ADD CONSTRAINT "home_page_insights_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_insights_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_cta_headline_lines" ADD CONSTRAINT "home_page_cta_headline_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_cta_headline_lines_locales" ADD CONSTRAINT "home_page_cta_headline_lines_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_cta_headline_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_footer_columns_links" ADD CONSTRAINT "home_page_footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_footer_columns_links_locales" ADD CONSTRAINT "home_page_footer_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_footer_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_footer_columns" ADD CONSTRAINT "home_page_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_footer_columns_locales" ADD CONSTRAINT "home_page_footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_footer_bottom" ADD CONSTRAINT "home_page_footer_bottom_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_footer_bottom_locales" ADD CONSTRAINT "home_page_footer_bottom_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_footer_bottom"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "posts_tags_order_idx" ON "posts_tags" USING btree ("_order");
  CREATE INDEX "posts_tags_parent_id_idx" ON "posts_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_tags_locales_locale_parent_id_unique" ON "posts_tags_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_featured_image_idx" ON "posts" USING btree ("featured_image_id");
  CREATE INDEX "posts_author_idx" ON "posts" USING btree ("author_id");
  CREATE INDEX "posts_seo_og_image_idx" ON "posts" USING btree ("seo_og_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_version_tags_order_idx" ON "_posts_v_version_tags" USING btree ("_order");
  CREATE INDEX "_posts_v_version_tags_parent_id_idx" ON "_posts_v_version_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_posts_v_version_tags_locales_locale_parent_id_unique" ON "_posts_v_version_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_featured_image_idx" ON "_posts_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_posts_v_version_version_author_idx" ON "_posts_v" USING btree ("version_author_id");
  CREATE INDEX "_posts_v_version_version_seo_og_image_idx" ON "_posts_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_tags_order_idx" ON "services_tags" USING btree ("_order");
  CREATE INDEX "services_tags_parent_id_idx" ON "services_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_tags_locales_locale_parent_id_unique" ON "services_tags_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "case_studies_tags_order_idx" ON "case_studies_tags" USING btree ("_order");
  CREATE INDEX "case_studies_tags_parent_id_idx" ON "case_studies_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "case_studies_tags_locales_locale_parent_id_unique" ON "case_studies_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "case_studies_updated_at_idx" ON "case_studies" USING btree ("updated_at");
  CREATE INDEX "case_studies_created_at_idx" ON "case_studies" USING btree ("created_at");
  CREATE UNIQUE INDEX "case_studies_locales_locale_parent_id_unique" ON "case_studies_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE UNIQUE INDEX "team_members_locales_locale_parent_id_unique" ON "team_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "practices_sections_order_idx" ON "practices_sections" USING btree ("_order");
  CREATE INDEX "practices_sections_parent_id_idx" ON "practices_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "practices_sections_locales_locale_parent_id_unique" ON "practices_sections_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "practices_slug_idx" ON "practices" USING btree ("slug");
  CREATE INDEX "practices_updated_at_idx" ON "practices" USING btree ("updated_at");
  CREATE INDEX "practices_created_at_idx" ON "practices" USING btree ("created_at");
  CREATE UNIQUE INDEX "practices_locales_locale_parent_id_unique" ON "practices_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "payload_mcp_api_keys_user_idx" ON "payload_mcp_api_keys" USING btree ("user_id");
  CREATE INDEX "payload_mcp_api_keys_updated_at_idx" ON "payload_mcp_api_keys" USING btree ("updated_at");
  CREATE INDEX "payload_mcp_api_keys_created_at_idx" ON "payload_mcp_api_keys" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_case_studies_id_idx" ON "payload_locked_documents_rels" USING btree ("case_studies_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_practices_id_idx" ON "payload_locked_documents_rels" USING btree ("practices_id");
  CREATE INDEX "payload_locked_documents_rels_payload_mcp_api_keys_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_mcp_api_keys_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_rels_payload_mcp_api_keys_id_idx" ON "payload_preferences_rels" USING btree ("payload_mcp_api_keys_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_page_nav_order_idx" ON "home_page_nav" USING btree ("_order");
  CREATE INDEX "home_page_nav_parent_id_idx" ON "home_page_nav" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_nav_locales_locale_parent_id_unique" ON "home_page_nav_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_hero_headline_lines_order_idx" ON "home_page_hero_headline_lines" USING btree ("_order");
  CREATE INDEX "home_page_hero_headline_lines_parent_id_idx" ON "home_page_hero_headline_lines" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_hero_headline_lines_locales_locale_parent_id_uniqu" ON "home_page_hero_headline_lines_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_hero_meta_logos_order_idx" ON "home_page_hero_meta_logos" USING btree ("_order");
  CREATE INDEX "home_page_hero_meta_logos_parent_id_idx" ON "home_page_hero_meta_logos" USING btree ("_parent_id");
  CREATE INDEX "home_page_hero_meta_order_idx" ON "home_page_hero_meta" USING btree ("_order");
  CREATE INDEX "home_page_hero_meta_parent_id_idx" ON "home_page_hero_meta" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_hero_meta_locales_locale_parent_id_unique" ON "home_page_hero_meta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_marquee_order_idx" ON "home_page_marquee" USING btree ("_order");
  CREATE INDEX "home_page_marquee_parent_id_idx" ON "home_page_marquee" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_marquee_locales_locale_parent_id_unique" ON "home_page_marquee_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_manifesto_entries_order_idx" ON "home_page_manifesto_entries" USING btree ("_order");
  CREATE INDEX "home_page_manifesto_entries_parent_id_idx" ON "home_page_manifesto_entries" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_manifesto_entries_locales_locale_parent_id_unique" ON "home_page_manifesto_entries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_speed_headline_lines_order_idx" ON "home_page_speed_headline_lines" USING btree ("_order");
  CREATE INDEX "home_page_speed_headline_lines_parent_id_idx" ON "home_page_speed_headline_lines" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_speed_headline_lines_locales_locale_parent_id_uniq" ON "home_page_speed_headline_lines_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_speed_stats_order_idx" ON "home_page_speed_stats" USING btree ("_order");
  CREATE INDEX "home_page_speed_stats_parent_id_idx" ON "home_page_speed_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_speed_stats_locales_locale_parent_id_unique" ON "home_page_speed_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_process_steps_order_idx" ON "home_page_process_steps" USING btree ("_order");
  CREATE INDEX "home_page_process_steps_parent_id_idx" ON "home_page_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_process_steps_locales_locale_parent_id_unique" ON "home_page_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_partners_items_order_idx" ON "home_page_partners_items" USING btree ("_order");
  CREATE INDEX "home_page_partners_items_parent_id_idx" ON "home_page_partners_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_partners_items_locales_locale_parent_id_unique" ON "home_page_partners_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_insights_posts_order_idx" ON "home_page_insights_posts" USING btree ("_order");
  CREATE INDEX "home_page_insights_posts_parent_id_idx" ON "home_page_insights_posts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_insights_posts_locales_locale_parent_id_unique" ON "home_page_insights_posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_cta_headline_lines_order_idx" ON "home_page_cta_headline_lines" USING btree ("_order");
  CREATE INDEX "home_page_cta_headline_lines_parent_id_idx" ON "home_page_cta_headline_lines" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_cta_headline_lines_locales_locale_parent_id_unique" ON "home_page_cta_headline_lines_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_footer_columns_links_order_idx" ON "home_page_footer_columns_links" USING btree ("_order");
  CREATE INDEX "home_page_footer_columns_links_parent_id_idx" ON "home_page_footer_columns_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_footer_columns_links_locales_locale_parent_id_uniq" ON "home_page_footer_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_footer_columns_order_idx" ON "home_page_footer_columns" USING btree ("_order");
  CREATE INDEX "home_page_footer_columns_parent_id_idx" ON "home_page_footer_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_footer_columns_locales_locale_parent_id_unique" ON "home_page_footer_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_footer_bottom_order_idx" ON "home_page_footer_bottom" USING btree ("_order");
  CREATE INDEX "home_page_footer_bottom_parent_id_idx" ON "home_page_footer_bottom" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_footer_bottom_locales_locale_parent_id_unique" ON "home_page_footer_bottom_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "home_page_locales_locale_parent_id_unique" ON "home_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_rels_order_idx" ON "home_page_rels" USING btree ("order");
  CREATE INDEX "home_page_rels_parent_idx" ON "home_page_rels" USING btree ("parent_id");
  CREATE INDEX "home_page_rels_path_idx" ON "home_page_rels" USING btree ("path");
  CREATE INDEX "home_page_rels_services_id_idx" ON "home_page_rels" USING btree ("services_id");
  CREATE INDEX "home_page_rels_case_studies_id_idx" ON "home_page_rels" USING btree ("case_studies_id");
  CREATE INDEX "home_page_rels_team_members_id_idx" ON "home_page_rels" USING btree ("team_members_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "posts_tags" CASCADE;
  DROP TABLE "posts_tags_locales" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "_posts_v_version_tags" CASCADE;
  DROP TABLE "_posts_v_version_tags_locales" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "services_tags" CASCADE;
  DROP TABLE "services_tags_locales" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "case_studies_tags" CASCADE;
  DROP TABLE "case_studies_tags_locales" CASCADE;
  DROP TABLE "case_studies" CASCADE;
  DROP TABLE "case_studies_locales" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "team_members_locales" CASCADE;
  DROP TABLE "practices_sections" CASCADE;
  DROP TABLE "practices_sections_locales" CASCADE;
  DROP TABLE "practices" CASCADE;
  DROP TABLE "practices_locales" CASCADE;
  DROP TABLE "payload_mcp_api_keys" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_page_nav" CASCADE;
  DROP TABLE "home_page_nav_locales" CASCADE;
  DROP TABLE "home_page_hero_headline_lines" CASCADE;
  DROP TABLE "home_page_hero_headline_lines_locales" CASCADE;
  DROP TABLE "home_page_hero_meta_logos" CASCADE;
  DROP TABLE "home_page_hero_meta" CASCADE;
  DROP TABLE "home_page_hero_meta_locales" CASCADE;
  DROP TABLE "home_page_marquee" CASCADE;
  DROP TABLE "home_page_marquee_locales" CASCADE;
  DROP TABLE "home_page_manifesto_entries" CASCADE;
  DROP TABLE "home_page_manifesto_entries_locales" CASCADE;
  DROP TABLE "home_page_speed_headline_lines" CASCADE;
  DROP TABLE "home_page_speed_headline_lines_locales" CASCADE;
  DROP TABLE "home_page_speed_stats" CASCADE;
  DROP TABLE "home_page_speed_stats_locales" CASCADE;
  DROP TABLE "home_page_process_steps" CASCADE;
  DROP TABLE "home_page_process_steps_locales" CASCADE;
  DROP TABLE "home_page_partners_items" CASCADE;
  DROP TABLE "home_page_partners_items_locales" CASCADE;
  DROP TABLE "home_page_insights_posts" CASCADE;
  DROP TABLE "home_page_insights_posts_locales" CASCADE;
  DROP TABLE "home_page_cta_headline_lines" CASCADE;
  DROP TABLE "home_page_cta_headline_lines_locales" CASCADE;
  DROP TABLE "home_page_footer_columns_links" CASCADE;
  DROP TABLE "home_page_footer_columns_links_locales" CASCADE;
  DROP TABLE "home_page_footer_columns" CASCADE;
  DROP TABLE "home_page_footer_columns_locales" CASCADE;
  DROP TABLE "home_page_footer_bottom" CASCADE;
  DROP TABLE "home_page_footer_bottom_locales" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_locales" CASCADE;
  DROP TABLE "home_page_rels" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum__posts_v_published_locale";`)
}
