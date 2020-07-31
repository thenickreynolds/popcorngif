import useWindowDimensions from "./useWindowDimensions";

const SCROLLBAR_SIZE = 20;
const SPACING = 10;
const ONE_COLUMN_WIDTH_MAX = 275;
const TWO_COLUMN_WIDTH_MAX = 450;
const THREE_COLUMN_WIDTH_MAX = 800;
const FOUR_COLUMN_WIDTH_MAX = 1200;
const MAX_GIF_WIDTH = 300;

function calculateSize(windowWidth: number, numColumns: number) {
  const sizeForContainers = windowWidth - SPACING - SCROLLBAR_SIZE;
  const sizePerContainer = sizeForContainers / numColumns;
  const gifSize = Math.min(
    Math.floor(sizePerContainer - SPACING),
    MAX_GIF_WIDTH
  );

  return {
    numColumns,
    width: gifSize,
    spacing: SPACING,
  };
}

function getNumColumns(width: number) {
  if (width < ONE_COLUMN_WIDTH_MAX) return 1;
  if (width < TWO_COLUMN_WIDTH_MAX) return 2;
  if (width < THREE_COLUMN_WIDTH_MAX) return 3;
  if (width < FOUR_COLUMN_WIDTH_MAX) return 4;
  return 5;
}

export default function useGifSizer() {
  const { width } = useWindowDimensions();
  const numColumns = getNumColumns(width);
  return calculateSize(width, numColumns);
}
