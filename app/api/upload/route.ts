import { NextResponse } from "next/server";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dhrkykrjx/upload";
const CLOUDINARY_UPLOAD_PRESET = "nm3slfqb";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("resource_type", "auto");

    const uploadResponse = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload file to Cloudinary");
    }

    const data = await uploadResponse.json();
    return NextResponse.json({ url: data.secure_url });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
