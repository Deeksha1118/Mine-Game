import { useCallback } from "react"
import { useAudioContext } from "../utils/AudioContext"
import { useDispatch, useSelector } from "react-redux"
import { revealSafe, hitMine } from "../features/mineGame/mineGame"
import { calculateMultiplier } from "../utils/multipleCalculator"

import diamondImg from "../assets/diamond.png"
import bombImg from "../assets/bomb.png"

export default function GameCell({ index, gridSize, state = "hidden", disabled }) {

    const dispatch = useDispatch()
    const { sfx } = useAudioContext()
    const { mines, revealed, mineCount } = useSelector(s => s.mineGame)

    // Recreated only when mines/revealed/disabled change — not on every multiplier update
    const handleClick = useCallback(() => {
        if (disabled) return

        if (mines.includes(index)) {
            sfx.mine()
            dispatch(hitMine(index))
        } else {
            const newRevealed = revealed.length + 1
            const multiplier = calculateMultiplier(gridSize, mineCount, newRevealed)
            sfx.diamond()
            dispatch(revealSafe({ index, multiplier }))
        }
    }, [disabled, mines, revealed, index, gridSize, mineCount, dispatch, sfx])

    const sizeClasses = {
        3: "w-20 h-20 sm:w-24 sm:h-24",
        5: "w-16 h-16 sm:w-20 sm:h-20",
        7: "w-12 h-12 sm:w-14 sm:h-14",
        9: "w-10 h-10 sm:w-12 sm:h-12"
    }

    return (
        <div
            onClick={handleClick}
            className={`mine-cell ${sizeClasses[gridSize]} 
            ${state === "safe" ? "revealed-safe" : ""} 
            ${state === "mine" ? "revealed-mine" : ""}
            ${disabled && state === "hidden" ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
            {state === "safe" && (
                <img src={diamondImg} alt="diamond" className="w-full h-full object-cover" />
            )}
            {state === "mine" && (
                <img src={bombImg} alt="bomb" className="w-full h-full object-cover" />
            )}
        </div>
    )
}