let score = 0;

export const increaseScore = (amt = 1) => {
  score += amt
}

export const getScore = () => {
  return score;
}