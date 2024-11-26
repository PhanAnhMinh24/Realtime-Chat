import { currentUser } from "@clerk/nextjs/server"; // Server-side import
import { db } from "@/lib/db";
import { MainChatArea } from "@/components/main/main-chat-area";
import { LeftSidebar } from "@/components/sidebar/left/left-side-bar";
import { RightSidebar } from "@/components/sidebar/right/right-side-bar";

const Home = async () => {
  const user = await currentUser();

  if (!user) {
    return <div>Redirecting to sign-in...</div>;
  }

  const email = user.emailAddresses[0]?.emailAddress;

  if (!email) {
    return <div>Error: Email not found. Please sign in again.</div>;
  }

  const existingUser = await db.users.findUnique({
    where: { email: email },
  });

  if (!existingUser) {
    try {
      await db.users.create({
        data: {
          id: user.id,
          email: email, 
          password_hash: "", 
          first_name: user.firstName || "", 
          middle_name: "", 
          last_name: user.lastName || "", 
          avatar_url: user.imageUrl || "",
          is_active: true,
          is_online: false,
          last_seen: null,
          is_reported: false,
          is_blocked: false,
          preferences: "",
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
        },
      });
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <div className="flex h-screen bg-white text-gray-900 overflow-hidden">
      <LeftSidebar />
      <MainChatArea />
      <RightSidebar />
    </div>
  );
};

export default Home;
