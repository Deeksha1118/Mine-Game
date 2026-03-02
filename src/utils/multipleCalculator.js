export function calculateMultiplier(gridSize, mineCount, revealed) {
    if (revealed === 0) return 0

    const total = gridSize * gridSize
    const safeTotal = total - mineCount
    const houseEdge = 0.97

    let multiplier = 1

    for (let i = 0; i < revealed; i++) {
        const remainingTotal = total - i
        const remainingSafe = safeTotal - i
        multiplier *= remainingTotal / remainingSafe
    }

    return Math.round(multiplier * houseEdge * 100) / 100
}
