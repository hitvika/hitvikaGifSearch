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

// ✅ NO destructuring in function parameter
export default async function GifDetailPage(props: { params: { id: string } }) {
  const { params } = props;
  const gif = await getGifById(params.id);
  if (!gif) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">{gif.title || "Untitled"}</h1>
      <img
        src={gif.images.original.url}
        alt={gif.title}
        className="w-full rounded shadow"
      />
      <div className="mt-4 space-y-2">
        <p><strong>Username:</strong> {gif.username || "Anonymous"}</p>
        <p><strong>Rating:</strong> {gif.rating.toUpperCase()}</p>
        <p>
          <strong>Source:</strong>{" "}
          <a
            href={gif.source || gif.url}
            className="text-blue-500 underline"
            target="_blank"
          >
            {gif.source || gif.url}
          </a>
        </p>
        <p><strong>GIF ID:</strong> {gif.id}</p>
      </div>
    </div>
  );
}
