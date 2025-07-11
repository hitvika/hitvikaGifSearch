import { notFound } from "next/navigation";

function extractIdFromSlug(slug: string) {
  const parts = slug.split("-");
  return parts[parts.length - 1];
}

async function getGifById(slug: string) {
  const id = extractIdFromSlug(slug);
  const res = await fetch(
    `https://api.giphy.com/v1/gifs/${id}?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}`
  );
  const data = await res.json();
  return data.data;
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function GifDetailPage({ params }: Props) {
  const { id } = await params; // ✅ await params since it's a Promise
  const gif = await getGifById(id);

  if (!gif) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">{gif.title || "Untitled"}</h1>
      <img
        src={gif.images.original.url}
        alt={gif.title || "GIF Image"}
        className="w-full rounded shadow"
      />
      <div className="mt-4 space-y-2">
        <p><strong>Username:</strong> {gif.username || "Anonymous"}</p>
        <p><strong>Rating:</strong> {gif.rating?.toUpperCase() || "N/A"}</p>
        <p>
          <strong>Source:</strong>{" "}
          <a
            href={gif.source || gif.url}
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {gif.source || gif.url}
          </a>
        </p>
        <p><strong>GIF ID:</strong> {gif.id}</p>
      </div>
    </div>
  );
}
