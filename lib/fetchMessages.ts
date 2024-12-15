import { Message } from "@prisma/client";

export async function fetchMessages(conversationId: string): Promise<Message[]> {
  // In a real application, you would fetch this data from your API
  // For now, we'll return mock data
  const mockMessages: Message[] = Array.from({ length: 20 }, (_, i) => ({
    id: `msg-${i}`,
    body: `Message ${i}`,
    image: i % 3 === 0 ? `/placeholder.svg` : null, // Every third message has an image
    createdAt: new Date(),
    seenIds: [],
    conversationId,
    senderId: `user-${i % 2}`, // Alternate between two users
    attachments: [],
  }));

  return mockMessages;
}

