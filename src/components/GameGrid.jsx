import { useState } from "react"
import { useSelector } from "react-redux"
import GameCell from "./GameCell"
import { calculateMultiplier } from "../utils/multipleCalculator"

export default function GameGrid({ gridSize }) {

    const { started, over, cashedOut, mines, revealed, mineCount, currentMultiplier } = useSelector(s => s.mineGame)
    const [shake, setShake] = useState(false)

    const total = gridSize * gridSize
    const cells = Array(total).fill(null)

    const nextMultipliers = []
    for (let i = 1; i <= 4; i++) {
        const m = calculateMultiplier(gridSize, mineCount, revealed.length + i)
        nextMultipliers.push(`${m}x`)
    }

    const showOverlay = !started && !over && !cashedOut

    const handleOverlayTrigger = () => {
        if (showOverlay) {
            setShake(true)
            setTimeout(() => setShake(false), 600)
        }
    }

    return (
        <div className="mine-grid-container font-['Orbitron']">

            <h1 className="app-title">MINES</h1>

            {/* Multiplier Bar */}
            <div className="mine-multiplier-bar">
                <div className="mine-multiplier-active">
                    <div className="mine-multiplier-icon">✦</div>
                    {currentMultiplier > 0 ? `${currentMultiplier}x` : "0.00x"}
                </div>
                {nextMultipliers.map((m, i) => (
                    <span key={i} className="mine-multiplier-item">{m}</span>
                ))}
            </div>

            {/* Grid */}
            <div className="mine-grid-wrapper" onClick={handleOverlayTrigger}>

                <div
                    className="mine-grid"
                    style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
                >
                    {cells.map((_, index) => {
                        const isRevealed = revealed.includes(index)
                        const isMine = mines.includes(index)

                        let state = "hidden"
                        if (isRevealed) state = "safe"
                        if ((over || cashedOut) && isMine) state = "mine"

                        return (
                            <GameCell
                                key={index}
                                index={index}
                                gridSize={gridSize}
                                state={state}
                                disabled={!started || over || cashedOut || isRevealed}
                            />
                        )
                    })}
                </div>

                {showOverlay && (
                    <div className={`mine-press-bet-overlay ${shake ? "shake" : ""}`}>
                        <span className="mine-press-bet-text">
                            PRESS BET TO START
                        </span>
                    </div>
                )}

            </div>

        </div>
    )
}