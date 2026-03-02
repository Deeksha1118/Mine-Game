import { useState } from "react"
import BetPanel from "../components/BetPanel"
import GameGrid from "../components/GameGrid"
import BetHistory from "../components/BetHistory"
import { AudioProvider } from "../utils/AudioContext"

export default function MineGame() {

    const [gridSize, setGridSize] = useState(5)

    return (
        <AudioProvider>
            <div className="mine-game-layout">

                {/* CENTER — Game Grid */}
                <div className="mine-game-area">
                    <GameGrid gridSize={gridSize} />
                </div>

                {/* Wrapper: side-by-side on mobile */}
                <div className="flex flex-row lg:contents order-2 lg:order-none">
                    <BetPanel gridSize={gridSize} setGridSize={setGridSize} />
                    <div className="mine-history-panel">
                        <BetHistory />
                    </div>
                </div>

            </div>
        </AudioProvider>
    )
}