import { Color } from '@svgdotjs/svg.js';

function normalizeColorValue(color) {
  return new Color(color).toHex();
}

export { normalizeColorValue };
