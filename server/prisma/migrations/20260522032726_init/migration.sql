-- CreateTable
CREATE TABLE "PlayerCache" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "position" TEXT,
    "team" TEXT,
    "age" INTEGER,
    "birthDate" TEXT,
    "status" TEXT,
    "fetchedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CacheMeta" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "refreshedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "League" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "PickNote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "leagueId" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "round" INTEGER NOT NULL,
    "originalOwnerRosterId" INTEGER NOT NULL,
    "currentOwnerRosterId" INTEGER NOT NULL,
    "note" TEXT,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PickNote_leagueId_season_round_originalOwnerRosterId_key" ON "PickNote"("leagueId", "season", "round", "originalOwnerRosterId");
