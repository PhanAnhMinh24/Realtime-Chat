import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, FriendStatus } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return handleSendFriendRequest(req, res);
  } else if (req.method === "GET") {
    return handleGetFriendRequests(req, res);
  } else if (req.method === "PUT") {
    return handleRespondToFriendRequest(req, res);
  } else {
    res.setHeader("Allow", ["POST", "GET", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleSendFriendRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user_id, friend_id } = req.body;

  if (!user_id || !friend_id) {
    return res.status(400).json({ error: "Missing user_id or friend_id" });
  }

  try {
    const existingRequest = await prisma.friends.findFirst({
      where: {
        OR: [
          { user_id, friend_id },
          { user_id: friend_id, friend_id: user_id },
        ],
      },
    });

    if (existingRequest) {
      return res.status(400).json({ error: "Friend request already exists" });
    }

    const newFriendRequest = await prisma.friends.create({
      data: {
        user_id,
        friend_id,
        status: FriendStatus.PENDING,
      },
    });

    res.status(201).json(newFriendRequest);
  } catch (error) {
    console.error("Error sending friend request:", error);
    res.status(500).json({ error: "Failed to send friend request" });
  }
}

async function handleGetFriendRequests(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    const friendRequests = await prisma.friends.findMany({
      where: {
        OR: [{ user_id: userId as string }, { friend_id: userId as string }],
        status: FriendStatus.PENDING,
      },
      include: {
        User: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            avatar_url: true,
          },
        },
        Friend: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            avatar_url: true,
          },
        },
      },
    });

    res.status(200).json(friendRequests);
  } catch (error) {
    console.error("Error fetching friend requests:", error);
    res.status(500).json({ error: "Failed to fetch friend requests" });
  }
}

async function handleRespondToFriendRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { requestId, status } = req.body;

  if (!requestId || !status) {
    return res.status(400).json({ error: "Missing requestId or status" });
  }

  if (!Object.values(FriendStatus).includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const updatedRequest = await prisma.friends.update({
      where: { id: requestId },
      data: {
        status,
        accepted_at: status === FriendStatus.ACCEPTED ? new Date() : null,
      },
    });

    if (status === FriendStatus.ACCEPTED) {
      // Create reciprocal friendship record
      await prisma.friends.create({
        data: {
          user_id: updatedRequest.friend_id,
          friend_id: updatedRequest.user_id,
          status: FriendStatus.ACCEPTED,
          accepted_at: new Date(),
        },
      });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error("Error responding to friend request:", error);
    res.status(500).json({ error: "Failed to respond to friend request" });
  }
}
