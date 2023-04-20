let score = 0;
let livesLeft = 3;

export const increaseScore = (amt = 1) => {
  score += amt
}

export const getScore = () => {
  return score;
}

export const removeLife = (amt = 1) => {
  livesLeft -= amt;
}

export const getLivesLeft = () => {
  return livesLeft;
}