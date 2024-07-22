/* Replace with your SQL commands */

CREATE TABLE "addresses" (
    "id" bigserial PRIMARY KEY,
    "user_id" bigint NOT NULL,
    "address_line1" text,
    "address_line2" text,
    "city" varchar,
    "post_code" integer,
    "country" varchar,
    "created_at" timestamptz NOT NULL DEFAULT(now())
);
CREATE INDEX ON "addresses"("post_code");
CREATE INDEX ON "addresses"("city");
CREATE INDEX ON "addresses"("country");

-- Add relation
ALTER TABLE "addresses" ADD FOREIGN KEY ("user_id") REFERENCES "users"
