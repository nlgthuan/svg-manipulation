import { Color } from '@svgdotjs/svg.js';

function normalizeColorValue(color) {
  if (color === 'none') {
    return '#000000';
  }

  return new Color(color).toHex();
}

export { normalizeColorValue };
