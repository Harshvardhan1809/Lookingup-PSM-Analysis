
const intersection_calculator = (index: number, scale: number[], cheapAnswerRate: number[], expensiveAnswerRate: number[]): number => {
  // x3,x4 negative slope; cheap curve

  const y1 = expensiveAnswerRate[index - 1]
  const y2 = expensiveAnswerRate[index]
  const y3 = cheapAnswerRate[index - 1]
  const y4 = cheapAnswerRate[index]

  const x1 = scale[index - 1]
  const x2 = scale[index]
  const x3 = scale[index - 1]
  const x4 = scale[index]

  const x: number = ((y3 - y1) * (x1 - x2) * (x3 - x4) + x1 * (y1 - y2) * (x3 - x4) - x3 * (y3 - y4) * (x1 - x2)) / ((y1 - y2) * (x3 - x4) - (x1 - x2) * (y3 - y4))
  return Math.round(x)
}

export default intersection_calculator
