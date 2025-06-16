"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import GifGrid from "@/components/GifGrid";
import { fetchTrendingGifs, fetchSearchGifs } from "@/lib/gify";

export default function Home() {
  const [gifs, setGifs] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [mode, setMode] = useState<"trending" | "search">("trending");
  const [loading, setLoading] = useState(false);

  const loadGifs = async (reset = false) => {
    setLoading(true);
    const newOffset = reset ? 0 : offset;
    const data =
      mode === "trending"
        ? await fetchTrendingGifs(newOffset)
        : await fetchSearchGifs(query, newOffset);
    setGifs((prev) => (reset ? data.data : [...prev, ...data.data]));
    setOffset(newOffset + 12);
    setLoading(false);
  };

  useEffect(() => {
    loadGifs(true);
  }, [mode]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setMode(query ? "search" : "trending");
    loadGifs(true);
  };

  const observer = useRef<IntersectionObserver | null>(null);
  const lastGifRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadGifs(); // Load more
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );


  return (
    <div className="max-w-6xl mx-auto py-[30px]">

      <div className="flex items-center justify-between gap-[15px] mb-4">
        <div className="flex items-center gap-[6px]">
          <img src='logo.svg' width="28px" height="38px" />
          <h2 className="text-lg font-extrabold">GIPHY</h2>
        </div>
        <form onSubmit={handleSearch} className="flex justify-center w-full">
          <input
            type="text"
            placeholder="Search GIFs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-l w-full border p-[20px] bg-[#fff]"
          />
          <button
            type="submit"
            className="bg-[#F3588E] text-white p-2 px-4 rounded-r"
          >
            <img src='/search.png' width="28px" height="38px" />
          </button>
        </form>
      </div>

      <GifGrid gifs={gifs} lastRef={lastGifRef} />

      {loading && <p className="text-center mt-4">Loading...</p>}
    </div>
  );
}
