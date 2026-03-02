export function generateMines(gridSize, mineCount) {
    const total = gridSize * gridSize
    const mines = new Set() //set of cell indices that are mines

    while (mines.size < mineCount) {
        mines.add(Math.floor(Math.random() * total))
    }

    return mines
}
