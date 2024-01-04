--
-- Table structure for table "users"
--

CREATE TABLE IF NOT EXISTS "users" (
  "id" serial NOT NULL,
  "name" varchar(255) NOT NULL,
  "username" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL,
  "created_at" timestamp without time zone,
  "updated_at" timestamp without time zone,
  PRIMARY KEY ("id"),
  CONSTRAINT "users_username_unique" UNIQUE ("username"),
  CONSTRAINT "users_email_unique" UNIQUE ("email")
);
