import { useSelector, useDispatch } from "react-redux"
import { clearHistory } from "../features/history/historySlice"
import LikeButton from "./LikeButton"
import Profile from "./Profile"

export default function BetHistory() {

    const dispatch = useDispatch()
    const entries = useSelector(s => s.history.entries)

    const getRowClass = (result) => {
        if (result === "win") return "history-win"
        if (result === "refund") return "history-refund"
        return "history-loss"
    }

    const getLabel = (result) => {
        if (result === "win") return "WIN"
        if (result === "refund") return "REF"
        return "LOSS"
    }

    const getLabelClass = (result) => {
        if (result === "win") return "text-green-400"
        if (result === "refund") return "text-yellow-400"
        return "text-red-400"
    }

    const getPayout = (entry) => {
        if (entry.result === "win") return `+€${entry.payout.toFixed(2)}`
        if (entry.result === "refund") return `€${entry.bet.toFixed(2)}`
        return `-€${entry.bet.toFixed(2)}`
    }

    const getPayoutClass = (result) => {
        if (result === "win") return "text-green-400"
        if (result === "refund") return "text-yellow-400"
        return "text-red-400"
    }

    return (
        <div className="mine-history">

            <div className="mine-history-toprow">
                <LikeButton gameId="mine-game" />
                <Profile />
            </div>

            <div className="mine-history-header">
                <h3 className="mine-history-title">BET HISTORY</h3>
                <button onClick={() => dispatch(clearHistory())} className="mine-history-clear">
                    CLEAR
                </button>
            </div>

            {entries.length === 0 ? (
                <div className="mine-history-empty">
                    <p>No bets placed yet.</p>
                </div>
            ) : (
                <div className="mine-history-list">
                    {entries.map((entry, i) => (
                        <div key={i} className={`mine-history-row ${getRowClass(entry.result)}`}>
                            <span className={`history-result ${getLabelClass(entry.result)}`}>
                                {getLabel(entry.result)}
                            </span>
                            <span>€{entry.bet.toFixed(2)}</span>
                            <span>{entry.multiplier > 0 ? `${entry.multiplier}x` : "—"}</span>
                            <span className={getPayoutClass(entry.result)}>
                                {getPayout(entry)}
                            </span>
                            <span className="history-time">
                                {new Date(entry.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}