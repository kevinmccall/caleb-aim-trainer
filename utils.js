export const randRange = (a, b) => {
  a = Math.floor(a);
  b = Math.ceil(b);
  return Math.floor(Math.random() * (b - a)) + a;
};

export const isPointInRect = (px, py, x, y, width, height) => {
  const right = x + width;
  const bottom = y + height;
  return px >= x && px < right && py >= y && py < bottom;
}