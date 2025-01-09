import { POST } from "@/app/api/register-user/route";
import { clerkClient } from "@clerk/nextjs";
import { StreamChat } from "stream-chat";

jest.mock("stream-chat", () => ({
  StreamChat: {
    getInstance: jest.fn(() => ({
      upsertUser: jest.fn(),
    })),
  },
}));

jest.mock("@clerk/nextjs", () => ({
  clerkClient: {
    users: {
      updateUser: jest.fn(),
    },
  },
}));

describe("POST /api/register-user", () => {
  it("should return 200 and user data when request is valid", async () => {
    const mockUpsertUser = jest
      .fn()
      .mockResolvedValue({ id: "user_2oVKEBhniey3MhVViKZ3gnw6zI4" });

    // Override hàm upsertUser trong mock StreamChat
    (StreamChat.getInstance as jest.Mock).mockReturnValue({
      upsertUser: mockUpsertUser,
    });

    const mockUpdateUser = jest
      .fn()
      .mockResolvedValue({ id: "user_2oVKEBhniey3MhVViKZ3gnw6zI4" });
    (clerkClient.users.updateUser as jest.Mock).mockImplementation(
      mockUpdateUser
    );

    const req = {
      method: "POST",
      json: jest.fn().mockResolvedValue({
        userId: "user_2oVKEBhniey3MhVViKZ3gnw6zI4",
        email: "vy381802@gmail.com",
      }),
    } as unknown as Request;

    const response = await POST(req);

    expect(response.status).toBe(200);
    const responseData = await response.json();
    expect(responseData).toEqual({
      userId: "user_2oVKEBhniey3MhVViKZ3gnw6zI4",
      userName: "vy381802@gmail.com",
    });

    expect(mockUpsertUser).toHaveBeenCalledWith({
      id: "user_2oVKEBhniey3MhVViKZ3gnw6zI4",
      role: "user",
      name: "vy381802@gmail.com",
      imageUrl: `https://getstream.io/random_png/?id=user_2oVKEBhniey3MhVViKZ3gnw6zI4&name=vy381802@gmail.com`,
    });

    expect(mockUpdateUser).toHaveBeenCalledWith(
      "user_2oVKEBhniey3MhVViKZ3gnw6zI4",
      {
        publicMetadata: { streamRegistered: true },
      }
    );
  });
});
