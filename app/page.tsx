import { currentUser } from "@clerk/nextjs/server"; // Server-side import
import { db } from "@/lib/db";
import { LeftSidebar } from "@/components/sidebar/left/left-side-bar";
import { RightSidebar } from "@/components/sidebar/right/right-side-bar";
import EmptyState from "@/components/empty-state";

const Home = async () => {
  const user = await currentUser();

  if (!user) {
    return <div>Redirecting to sign-in...</div>;
  }

  const email = user.emailAddresses[0]?.emailAddress;

  if (!email) {
    return <div>Error: Email not found. Please sign in again.</div>;
  }

  const existingUser = await db.user.findUnique({
    where: { email: email },
  });

  if (!existingUser) {
    try {
      await db.user.create({
        data: {
          id: user.id,
          email: email,
          hashedPassword: "",
          name: user.firstName || "",
          image: user.imageUrl || "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex h-screen bg-white text-gray-900">
      <LeftSidebar />
      <EmptyState/>
      <RightSidebar conversationId={""} />
    </div>
  );
};

export default Home;
