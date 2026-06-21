import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const type = searchParams.get("type") ?? "projects";

  if (!secret || secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid preview token", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  if (type === "news" && slug) {
    redirect(`/news/${slug}`);
  }

  if (slug) {
    redirect(`/projects/${slug}`);
  }

  redirect("/");
}
