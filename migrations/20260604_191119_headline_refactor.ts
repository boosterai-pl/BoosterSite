import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // 1. Add new columns (nullable first so existing rows don't fail)
  await db.execute(sql`
    ALTER TABLE "home_page_locales" ADD COLUMN "hero_headline_text" varchar;
    ALTER TABLE "home_page_locales" ADD COLUMN "hero_headline_accent" varchar;
    ALTER TABLE "home_page_locales" ADD COLUMN "speed_headline_line1" varchar;
    ALTER TABLE "home_page_locales" ADD COLUMN "speed_headline_strike_text" varchar;
    ALTER TABLE "home_page_locales" ADD COLUMN "speed_headline_accent_text" varchar;
    ALTER TABLE "home_page_locales" ADD COLUMN "speed_headline_line3" varchar;
    ALTER TABLE "home_page_locales" ADD COLUMN "cta_headline_text" varchar;
    ALTER TABLE "home_page_locales" ADD COLUMN "cta_headline_accent" varchar;
  `)

  // 2. Migrate hero headline: join lines with \n, take accent from last line
  await db.execute(sql`
    UPDATE "home_page_locales" hpl
    SET
      "hero_headline_text" = (
        SELECT string_agg(l."text", E'\n' ORDER BY p."_order")
        FROM "home_page_hero_headline_lines" p
        JOIN "home_page_hero_headline_lines_locales" l ON l."_parent_id" = p."id" AND l."_locale" = hpl."_locale"
        WHERE p."_parent_id" = hpl."_parent_id"
      ),
      "hero_headline_accent" = (
        SELECT l."accent"
        FROM "home_page_hero_headline_lines" p
        JOIN "home_page_hero_headline_lines_locales" l ON l."_parent_id" = p."id" AND l."_locale" = hpl."_locale"
        WHERE p."_parent_id" = hpl."_parent_id" AND l."accent" IS NOT NULL AND l."accent" != ''
        ORDER BY p."_order" DESC
        LIMIT 1
      );
  `)

  // 3. Migrate speed headline: line1=first, line3=last, strike/accent hardcoded per locale
  await db.execute(sql`
    UPDATE "home_page_locales" hpl
    SET
      "speed_headline_line1" = (
        SELECT l."text"
        FROM "home_page_speed_headline_lines" p
        JOIN "home_page_speed_headline_lines_locales" l ON l."_parent_id" = p."id" AND l."_locale" = hpl."_locale"
        WHERE p."_parent_id" = hpl."_parent_id"
        ORDER BY p."_order" ASC LIMIT 1
      ),
      "speed_headline_strike_text" = CASE hpl."_locale" WHEN 'pl' THEN '12 miesięcy,' ELSE '12 months' END,
      "speed_headline_accent_text" = CASE hpl."_locale" WHEN 'pl' THEN 'my wdrażamy' ELSE 'we ship' END,
      "speed_headline_line3" = (
        SELECT l."text"
        FROM "home_page_speed_headline_lines" p
        JOIN "home_page_speed_headline_lines_locales" l ON l."_parent_id" = p."id" AND l."_locale" = hpl."_locale"
        WHERE p."_parent_id" = hpl."_parent_id"
        ORDER BY p."_order" DESC LIMIT 1
      );
  `)

  // 4. Migrate CTA headline: join lines with \n, take accent from last line
  await db.execute(sql`
    UPDATE "home_page_locales" hpl
    SET
      "cta_headline_text" = (
        SELECT string_agg(l."text", E'\n' ORDER BY p."_order")
        FROM "home_page_cta_headline_lines" p
        JOIN "home_page_cta_headline_lines_locales" l ON l."_parent_id" = p."id" AND l."_locale" = hpl."_locale"
        WHERE p."_parent_id" = hpl."_parent_id"
      ),
      "cta_headline_accent" = (
        SELECT l."accent"
        FROM "home_page_cta_headline_lines" p
        JOIN "home_page_cta_headline_lines_locales" l ON l."_parent_id" = p."id" AND l."_locale" = hpl."_locale"
        WHERE p."_parent_id" = hpl."_parent_id" AND l."accent" IS NOT NULL AND l."accent" != ''
        ORDER BY p."_order" DESC
        LIMIT 1
      );
  `)

  // 5. Enforce NOT NULL now that data is populated
  await db.execute(sql`
    ALTER TABLE "home_page_locales" ALTER COLUMN "hero_headline_text" SET NOT NULL;
    ALTER TABLE "home_page_locales" ALTER COLUMN "speed_headline_line1" SET NOT NULL;
    ALTER TABLE "home_page_locales" ALTER COLUMN "speed_headline_strike_text" SET NOT NULL;
    ALTER TABLE "home_page_locales" ALTER COLUMN "speed_headline_accent_text" SET NOT NULL;
    ALTER TABLE "home_page_locales" ALTER COLUMN "speed_headline_line3" SET NOT NULL;
    ALTER TABLE "home_page_locales" ALTER COLUMN "cta_headline_text" SET NOT NULL;
  `)

  // 6. Drop old array tables
  await db.execute(sql`
    DROP TABLE "home_page_hero_headline_lines_locales" CASCADE;
    DROP TABLE "home_page_hero_headline_lines" CASCADE;
    DROP TABLE "home_page_speed_headline_lines_locales" CASCADE;
    DROP TABLE "home_page_speed_headline_lines" CASCADE;
    DROP TABLE "home_page_cta_headline_lines_locales" CASCADE;
    DROP TABLE "home_page_cta_headline_lines" CASCADE;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
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
  
  ALTER TABLE "home_page_hero_headline_lines" ADD CONSTRAINT "home_page_hero_headline_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_headline_lines_locales" ADD CONSTRAINT "home_page_hero_headline_lines_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_hero_headline_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_speed_headline_lines" ADD CONSTRAINT "home_page_speed_headline_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_speed_headline_lines_locales" ADD CONSTRAINT "home_page_speed_headline_lines_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_speed_headline_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_cta_headline_lines" ADD CONSTRAINT "home_page_cta_headline_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_cta_headline_lines_locales" ADD CONSTRAINT "home_page_cta_headline_lines_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_cta_headline_lines"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_hero_headline_lines_order_idx" ON "home_page_hero_headline_lines" USING btree ("_order");
  CREATE INDEX "home_page_hero_headline_lines_parent_id_idx" ON "home_page_hero_headline_lines" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_hero_headline_lines_locales_locale_parent_id_uniqu" ON "home_page_hero_headline_lines_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_speed_headline_lines_order_idx" ON "home_page_speed_headline_lines" USING btree ("_order");
  CREATE INDEX "home_page_speed_headline_lines_parent_id_idx" ON "home_page_speed_headline_lines" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_speed_headline_lines_locales_locale_parent_id_uniq" ON "home_page_speed_headline_lines_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_cta_headline_lines_order_idx" ON "home_page_cta_headline_lines" USING btree ("_order");
  CREATE INDEX "home_page_cta_headline_lines_parent_id_idx" ON "home_page_cta_headline_lines" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_cta_headline_lines_locales_locale_parent_id_unique" ON "home_page_cta_headline_lines_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "home_page_locales" DROP COLUMN "hero_headline_text";
  ALTER TABLE "home_page_locales" DROP COLUMN "hero_headline_accent";
  ALTER TABLE "home_page_locales" DROP COLUMN "speed_headline_line1";
  ALTER TABLE "home_page_locales" DROP COLUMN "speed_headline_strike_text";
  ALTER TABLE "home_page_locales" DROP COLUMN "speed_headline_accent_text";
  ALTER TABLE "home_page_locales" DROP COLUMN "speed_headline_line3";
  ALTER TABLE "home_page_locales" DROP COLUMN "cta_headline_text";
  ALTER TABLE "home_page_locales" DROP COLUMN "cta_headline_accent";`)
}
