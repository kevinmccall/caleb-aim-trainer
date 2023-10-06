export const randInt = (a, b) => {
  a = Math.floor(a);
  b = Math.ceil(b);
  return Math.floor(Math.random() * (b - a)) + a;
};