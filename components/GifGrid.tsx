import Link from "next/link";
import { Gif } from "@/types/gif";

function slugify(title: string, id: string) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  return `${slug}-${id}`;
}

export default function GifGrid({
  gifs,
  lastRef,
}: {
  gifs: Gif[];
  lastRef?: (node: HTMLDivElement | null) => void;
}) {
  return (
    <div className="columns-2 sm:columns-3 md:columns-4 gap-4 p-4 space-y-4">
      {gifs.map((gif, index) => {
        const isLast = index === gifs.length - 1;
        return (
          <Link
            key={gif.id}
            href={`/gif/${slugify(gif.title || "gif", gif.id)}`}
          >
            <div
              ref={isLast ? lastRef : undefined}
              className="mb-4 break-inside-avoid cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <img
                src={gif.images.downsized_medium.url}
                alt={gif.title}
                className="w-full rounded-lg"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
