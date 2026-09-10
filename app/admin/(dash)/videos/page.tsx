import VideoManager from "@/components/admin/VideoManager";
import { listCurated } from "@/lib/curated";

export default async function VideosPage() {
  // RLS lets an admin see unpublished rows through the same call.
  const videos = await listCurated({ includeDrafts: true });

  return (
    <>
      <header>
        <span className="label">Curated videos</span>
        <h1 className="display-3 mt-3">Paste a link, pick a category</h1>
        <p className="mt-3 max-w-[54ch] text-[14px] leading-[1.6] text-ink-2">
          Published videos appear on the home page grouped by category. The
          title and channel are read from YouTube automatically.
        </p>
      </header>

      <div className="mt-8">
        <VideoManager videos={videos} />
      </div>
    </>
  );
}
