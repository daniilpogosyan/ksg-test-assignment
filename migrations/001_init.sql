CREATE TABLE "user" (
  "id" SERIAL NOT NULL,
  balance FLOAT NOT NULL DEFAULT 0,

  CONSTRAINT "user_pkey" PRIMARY KEY ("id")
)