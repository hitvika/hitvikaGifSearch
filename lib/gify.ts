const API_KEY = "paiJj3iTTUT8AkTGWHICumQSwycjA9ii";

export const fetchTrendingGifs = async (offset = 0) => {
  const res = await fetch(
    `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=12&offset=${offset}`
  );
  return res.json();
};

export const fetchSearchGifs = async (query: string, offset = 0) => {
  const res = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=12&offset=${offset}`
  );
  return res.json();
};
