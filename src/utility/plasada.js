export const setPayout = (plasadaRate, totalMeron, totalWala, playerBet) => {
  const plasada = plasadaRate / 100;

  const p1 = ((totalMeron + totalWala) / totalMeron) * playerBet;
  const p2 = ((totalMeron + totalWala) / totalWala) * playerBet;

  const p1Tong = p1 * plasada;
  const p2Tong = p2 * plasada;

  const meronPayout = p1 - p1Tong;
  const walaPayout = p2 - p2Tong;

  return {
    meronPayout,
    walaPayout,
  };
};
