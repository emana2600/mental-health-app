const CAT_IMAGES = [
  "bottom-left",
  "bottom-left-2",
  "bottom-left-3",
  "bottom-right-2",
  "bottom-right-3",
  "bottom-right",
  "kiss",
  "top-left",
  "top-right-2",
  "top-right-3",
  "top-right"
]
export const pickRandomCatImage = (): string => {
  const randomIndex = Math.floor(Math.random() * CAT_IMAGES.length);
  return CAT_IMAGES[randomIndex];
};
