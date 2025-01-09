import { POST } from "@/app/api/token/route";
import { StreamChat } from "stream-chat";
import { NextResponse } from "next/server";

jest.mock("stream-chat", () => ({
  StreamChat: {
    getInstance: jest.fn(() => ({
      createToken: jest.fn(),
    })),
  },
}));

describe("POST /api/token", () => {
  let logSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeAll(() => {
    // Chặn console.log và console.error
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    // Phục hồi console.log và console.error
    logSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it("should return 200 and token when userId is valid", async () => {
    const mockCreateToken = jest.fn().mockReturnValue("mocked_token");
    (StreamChat.getInstance as jest.Mock).mockReturnValue({
      createToken: mockCreateToken,
    });

    const req = {
      method: "POST",
      json: jest.fn().mockResolvedValue({
        userId: "user_12345",
      }),
    } as unknown as Request;

    const response = await POST(req);

    expect(response.status).toBe(200);
    const responseData = await response.json();
    expect(responseData).toEqual({
      userId: "user_12345",
      token: "mocked_token",
    });

    expect(mockCreateToken).toHaveBeenCalledWith("user_12345");
  });

  it("should return 400 if userId is missing", async () => {
    const req = {
      method: "POST",
      json: jest.fn().mockResolvedValue({}),
    } as unknown as Request;

    const response = await POST(req);

    expect(response.status).toBe(400);
    const responseData = await response.json();
    expect(responseData).toEqual({ error: "Missing userId" });
  });

  it("should return 500 if StreamChat createToken fails", async () => {
    const mockCreateToken = jest.fn(() => {
      throw new Error("StreamChat error");
    });
    (StreamChat.getInstance as jest.Mock).mockReturnValue({
      createToken: mockCreateToken,
    });

    const req = {
      method: "POST",
      json: jest.fn().mockResolvedValue({
        userId: "user_12345",
      }),
    } as unknown as Request;

    const response = await POST(req);

    expect(response.status).toBe(500);
    const responseData = await response.json();
    expect(responseData).toEqual({ error: "Internal Server Error" });
  });
});
