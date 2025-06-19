export type Gif = {
  id: string;
  title: string;
  images: {
    original: {
      url: string;
      width: string;
      height: string;
    };
    downsized_medium: {
      url: string;
      width: string;
      height: string;
    };
  };
};
