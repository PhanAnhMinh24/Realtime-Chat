import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";

// Accept currentUser as a parameter
const useOtherUser = (
  conversation: FullConversationType | { users: User[] },
  currentUser: User | null
) => {
  const otherUser = useMemo(() => {
    if (!currentUser) return null; // If there's no currentUser, return null

    const currentUserEmail = currentUser.email; // Use currentUser's email
    const otherUser = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );

    return otherUser[0]; // Return the first user that is not the current user
  }, [conversation.users, currentUser]);

  return otherUser;
};

export default useOtherUser;
