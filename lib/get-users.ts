import { CurrentUser } from "./current-user";
import { db } from "./db";

const getUsers = async () => {
  const currentUser = await CurrentUser();

  if (!currentUser?.email) {
    return [];
  }

  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: currentUser.email,
        },
      },
    });
    return users;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getUsers;
