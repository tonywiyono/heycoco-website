import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const paths: string[] = Array.isArray(body.paths) ? body.paths : ["/"];

  for (const path of paths) {
    revalidatePath(path);
  }

  revalidatePath("/projects/[slug]", "page");
  revalidatePath("/news/[slug]", "page");

  return NextResponse.json({ revalidated: true, paths });
}
