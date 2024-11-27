/*
  Warnings:

  - The primary key for the `Attachments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `Attachments` table. All the data in the column will be lost.
  - You are about to drop the column `file_size` on the `Attachments` table. All the data in the column will be lost.
  - You are about to drop the column `file_type` on the `Attachments` table. All the data in the column will be lost.
  - You are about to drop the column `file_url` on the `Attachments` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Attachments` table. All the data in the column will be lost.
  - You are about to drop the column `message_id` on the `Attachments` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Attachments` table. All the data in the column will be lost.
  - The primary key for the `BlockList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `blocked_user_id` on the `BlockList` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `BlockList` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `BlockList` table. All the data in the column will be lost.
  - You are about to drop the column `users_id` on the `BlockList` table. All the data in the column will be lost.
  - The primary key for the `Conversation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `group_id` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Conversation` table. All the data in the column will be lost.
  - The primary key for the `Friends` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accepted_at` on the `Friends` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Friends` table. All the data in the column will be lost.
  - You are about to drop the column `friend_id` on the `Friends` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Friends` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Friends` table. All the data in the column will be lost.
  - The primary key for the `GroupParticipants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `group_id` on the `GroupParticipants` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `GroupParticipants` table. All the data in the column will be lost.
  - You are about to drop the column `joined_at` on the `GroupParticipants` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `GroupParticipants` table. All the data in the column will be lost.
  - The primary key for the `Groups` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `Groups` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `Groups` table. All the data in the column will be lost.
  - You are about to drop the column `group_avatar_url` on the `Groups` table. All the data in the column will be lost.
  - You are about to drop the column `group_description` on the `Groups` table. All the data in the column will be lost.
  - You are about to drop the column `group_name` on the `Groups` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Groups` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Groups` table. All the data in the column will be lost.
  - You are about to drop the `Messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reports` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[blockerId,blockedId]` on the table `BlockList` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,friendId]` on the table `Friends` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[groupId,userId]` on the table `GroupParticipants` will be added. If there are existing duplicate values, this will fail.
  - The required column `_id` was added to the `Attachments` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `messageId` to the `Attachments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Attachments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Attachments` table without a default value. This is not possible if the table is not empty.
  - The required column `_id` was added to the `BlockList` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `blockedId` to the `BlockList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blockerId` to the `BlockList` table without a default value. This is not possible if the table is not empty.
  - The required column `_id` was added to the `Conversation` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `_id` was added to the `Friends` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `friendId` to the `Friends` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Friends` table without a default value. This is not possible if the table is not empty.
  - The required column `_id` was added to the `GroupParticipants` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `groupId` to the `GroupParticipants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `GroupParticipants` table without a default value. This is not possible if the table is not empty.
  - The required column `_id` was added to the `Groups` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `name` to the `Groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Groups` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Attachments_message_id_idx";

-- DropIndex
DROP INDEX "BlockList_blocked_user_id_idx";

-- DropIndex
DROP INDEX "BlockList_users_id_idx";

-- DropIndex
DROP INDEX "Conversation_group_id_idx";

-- DropIndex
DROP INDEX "Friends_friend_id_idx";

-- DropIndex
DROP INDEX "Friends_user_id_friend_id_key";

-- DropIndex
DROP INDEX "GroupParticipants_group_id_idx";

-- DropIndex
DROP INDEX "GroupParticipants_user_id_idx";

-- DropIndex
DROP INDEX "Groups_created_by_idx";

-- AlterTable
ALTER TABLE "Attachments" DROP CONSTRAINT "Attachments_pkey",
DROP COLUMN "created_at",
DROP COLUMN "file_size",
DROP COLUMN "file_type",
DROP COLUMN "file_url",
DROP COLUMN "id",
DROP COLUMN "message_id",
DROP COLUMN "updated_at",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "messageId" TEXT NOT NULL,
ADD COLUMN     "type" "MessageType" NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ADD CONSTRAINT "Attachments_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "BlockList" DROP CONSTRAINT "BlockList_pkey",
DROP COLUMN "blocked_user_id",
DROP COLUMN "created_at",
DROP COLUMN "id",
DROP COLUMN "users_id",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "blockedId" TEXT NOT NULL,
ADD COLUMN     "blockerId" TEXT NOT NULL,
ADD CONSTRAINT "BlockList_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_pkey",
DROP COLUMN "created_at",
DROP COLUMN "group_id",
DROP COLUMN "id",
DROP COLUMN "is_deleted",
DROP COLUMN "updated_at",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isGroup" BOOLEAN,
ADD COLUMN     "lastMessageAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "messagesIds" TEXT[],
ADD COLUMN     "name" TEXT,
ADD COLUMN     "userIds" TEXT[],
ADD CONSTRAINT "Conversation_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "Friends" DROP CONSTRAINT "Friends_pkey",
DROP COLUMN "accepted_at",
DROP COLUMN "created_at",
DROP COLUMN "friend_id",
DROP COLUMN "id",
DROP COLUMN "user_id",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "friendId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING',
ADD CONSTRAINT "Friends_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "GroupParticipants" DROP CONSTRAINT "GroupParticipants_pkey",
DROP COLUMN "group_id",
DROP COLUMN "id",
DROP COLUMN "joined_at",
DROP COLUMN "user_id",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "groupId" TEXT NOT NULL,
ADD COLUMN     "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'MEMBER',
ADD CONSTRAINT "GroupParticipants_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "Groups" DROP CONSTRAINT "Groups_pkey",
DROP COLUMN "created_at",
DROP COLUMN "created_by",
DROP COLUMN "group_avatar_url",
DROP COLUMN "group_description",
DROP COLUMN "group_name",
DROP COLUMN "id",
DROP COLUMN "updated_at",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Groups_pkey" PRIMARY KEY ("_id");

-- DropTable
DROP TABLE "Messages";

-- DropTable
DROP TABLE "Reports";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "User" (
    "_id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "hashedPassword" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "conversationIds" TEXT[],
    "seenMessageIds" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Account" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Message" (
    "_id" TEXT NOT NULL,
    "body" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seenIds" TEXT[],
    "conversationId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "_UserConversations" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SeenMessages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE INDEX "Message_senderId_idx" ON "Message"("senderId");

-- CreateIndex
CREATE INDEX "Message_conversationId_idx" ON "Message"("conversationId");

-- CreateIndex
CREATE UNIQUE INDEX "_UserConversations_AB_unique" ON "_UserConversations"("A", "B");

-- CreateIndex
CREATE INDEX "_UserConversations_B_index" ON "_UserConversations"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SeenMessages_AB_unique" ON "_SeenMessages"("A", "B");

-- CreateIndex
CREATE INDEX "_SeenMessages_B_index" ON "_SeenMessages"("B");

-- CreateIndex
CREATE INDEX "Attachments_messageId_idx" ON "Attachments"("messageId");

-- CreateIndex
CREATE INDEX "BlockList_blockedId_idx" ON "BlockList"("blockedId");

-- CreateIndex
CREATE UNIQUE INDEX "BlockList_blockerId_blockedId_key" ON "BlockList"("blockerId", "blockedId");

-- CreateIndex
CREATE INDEX "Friends_friendId_idx" ON "Friends"("friendId");

-- CreateIndex
CREATE UNIQUE INDEX "Friends_userId_friendId_key" ON "Friends"("userId", "friendId");

-- CreateIndex
CREATE INDEX "GroupParticipants_userId_idx" ON "GroupParticipants"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "GroupParticipants_groupId_userId_key" ON "GroupParticipants"("groupId", "userId");
