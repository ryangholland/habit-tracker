import { format } from "date-fns";

export function getHeatmapTooltipAttrs(value) {
  if (value && value.date) {
    const dateStr = format(new Date(value.date), "EEE, MMMM d");
    const percent = Math.round(value.count * 100);
    return {
      "data-tooltip-id": "heatmap-tooltip",
      "data-tooltip-content": `${dateStr}: ${percent}% completed`,
    };
  }

  return {
    "data-tooltip-id": "heatmap-tooltip",
    "data-tooltip-content": "No data",
  };
}
