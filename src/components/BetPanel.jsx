import { useState, useEffect, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Wallet from "./Wallet"
import InfoModal from "./InfoModal"
import { useAudioContext } from "../utils/AudioContext"
import { generateMines } from "../utils/mineGenerator"
import { startGame, cashOut, resetGame, markRefundIssued } from "../features/mineGame/mineGame"
import { deductBalance, addBalance } from "../features/wallet/walletSlice"
import { addHistoryEntry } from "../features/history/historySlice"

const MINE_OPTIONS = [1, 3, 5, 7]
const GRID_OPTIONS = [3, 5, 7, 9]

export default function BetPanel({ gridSize, setGridSize }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { started, cashedOut, over, wasRefreshed, refundIssued, currentMultiplier, betAmount } = useSelector(s => s.mineGame)
    const balance = useSelector(s => s.wallet.balance)

    const [bet, setBet] = useState(2)
    const [selectedMines, setSelectedMines] = useState(3)
    const [error, setError] = useState("")
    const [showInfo, setShowInfo] = useState(false)
    const { soundOn, musicOn, toggleSound, toggleMusic, sfx } = useAudioContext()

    const lossHandled = useRef(false)

    useEffect(() => {
        if (wasRefreshed && betAmount && !refundIssued) {
            dispatch(markRefundIssued())
            dispatch(addBalance(betAmount))
            dispatch(addHistoryEntry({
                bet: betAmount,
                multiplier: 0,
                payout: betAmount,
                result: "refund",
                timestamp: new Date().toISOString()
            }))
        }
    }, [wasRefreshed, betAmount, refundIssued, dispatch])

    useEffect(() => {
        if (over && !wasRefreshed && betAmount && !lossHandled.current) {
            lossHandled.current = true
            dispatch(addHistoryEntry({
                bet: betAmount,
                multiplier: 0,
                payout: 0,
                result: "loss",
                timestamp: new Date().toISOString()
            }))
        }
        if (!over) lossHandled.current = false
    }, [over, wasRefreshed, betAmount, dispatch])

    const increaseBet = useCallback(() => setBet((b) => +(b + 0.5).toFixed(2)), [])
    const decreaseBet = useCallback(() => setBet((b) => Math.max(0.5, +(b - 0.5).toFixed(2))), [])

    const showError = useCallback((msg) => {
        setError(msg)
        setTimeout(() => setError(""), 3000)
    }, [])

    const handleBet = useCallback(() => {
        if (bet > balance) return showError("Insufficient balance")
        if (bet <= 0) return showError("Bet must be greater than 0")
        const mines = Array.from(generateMines(gridSize, selectedMines))
        dispatch(deductBalance(bet))
        dispatch(startGame({ mines, betAmount: bet, mineCount: selectedMines, gridSize }))
        sfx.bet()
        setError("")
    }, [bet, balance, gridSize, selectedMines, showError, dispatch])

    const handleCashOut = useCallback(() => {
        const payout = +(betAmount * currentMultiplier).toFixed(2)
        dispatch(addBalance(payout))
        dispatch(addHistoryEntry({
            bet: betAmount,
            multiplier: currentMultiplier,
            payout,
            result: "win",
            timestamp: new Date().toISOString()
        }))
        sfx.cashout()
        dispatch(cashOut())
    }, [betAmount, currentMultiplier, dispatch, sfx])

    const handleReset = useCallback(() => dispatch(resetGame()), [dispatch])
    const handleHome = useCallback(() => navigate("/dashboard"), [navigate])
    const handleOpenInfo = useCallback(() => setShowInfo(true), [])
    const handleCloseInfo = useCallback(() => setShowInfo(false), [])

    const isLocked = started && !over && !cashedOut

    const renderBetCard = () => {
        if (over) return (
            <>
                {wasRefreshed ? (
                    <>
                        <p className="text-yellow-400 text-center font-bold text-sm mb-2">GAME INTERRUPTED</p>
                        <p className="text-center text-xs text-gray-400 mb-3">Page was refreshed. Your bet of €{betAmount.toFixed(2)} has been refunded.</p>
                    </>
                ) : (
                    <>
                        <p className="text-red-400 text-center font-bold text-sm mb-2">YOU HIT A MINE</p>
                        <p className="text-center text-xs text-gray-400 mb-3">Lost €{betAmount.toFixed(2)}</p>
                    </>
                )}
                <button className="mine-bet-btn" onClick={handleReset}>PLAY AGAIN</button>
            </>
        )

        if (cashedOut) return (
            <>
                <p className="text-green-400 text-center font-bold text-sm mb-2">CASHED OUT</p>
                <p className="text-center text-xs text-gray-400 mb-3">Won €{(betAmount * currentMultiplier).toFixed(2)}</p>
                <button className="mine-bet-btn" onClick={handleReset}>PLAY AGAIN</button>
            </>
        )

        if (!started) return (
            <>
                <div className="mine-bet-controls">
                    <button className="mine-bet-arrow" onClick={decreaseBet}>
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                    </button>
                    <span className="mine-bet-amount">€{bet.toFixed(2)}</span>
                    <button className="mine-bet-arrow" onClick={increaseBet}>
                        <i className="fa-solid fa-chevron-up text-xs"></i>
                    </button>
                </div>
                <input type="range" min={0.5} max={100} step={0.5} value={bet} onChange={(e) => setBet(+e.target.value)} className="mine-bet-slider" />
                <button className="mine-bet-btn" onClick={handleBet}>BET</button>
            </>
        )

        return (
            <>
                <div className="mine-bet-controls">
                    <span className="mine-bet-amount text-green-400">{currentMultiplier > 0 ? currentMultiplier + "x" : "—"}</span>
                </div>
                <p className="text-center text-xs text-gray-400 mb-3">Win: €{currentMultiplier > 0 ? (betAmount * currentMultiplier).toFixed(2) : "0.00"}</p>
                <button
                    className={"mine-bet-btn " + (currentMultiplier === 0 ? "opacity-50 cursor-not-allowed" : "bg-green-600 hover:bg-green-500")}
                    onClick={currentMultiplier > 0 ? handleCashOut : undefined}
                >
                    CASH OUT
                </button>
            </>
        )
    }

    return (
        <>
            <div className="mine-bet-panel">
                <div>
                    <button onClick={handleHome} className="mine-home-btn" title="Back to Dashboard">
                        <i className="fa-solid fa-house"></i>
                        HOME
                    </button>
                    <p className="mine-section-label">NUMBER OF MINES</p>
                    <div className="mine-button-group">
                        {MINE_OPTIONS.map((n) => (
                            <button key={n} onClick={() => !isLocked && setSelectedMines(n)} className={"mine-btn-option " + (selectedMines === n ? "active" : "") + " " + (isLocked ? "opacity-50 cursor-not-allowed" : "")}>{n}</button>
                        ))}
                    </div>
                    <p className="mine-section-label">GRID SIZE</p>
                    <div className="mine-button-group">
                        {GRID_OPTIONS.map((size) => (
                            <button key={size} onClick={() => !isLocked && setGridSize(size)} className={"mine-btn-option " + (gridSize === size ? "active" : "") + " " + (isLocked ? "opacity-50 cursor-not-allowed" : "")}>{size}x{size}</button>
                        ))}
                    </div>
                </div>
                <div>
                    <Wallet />
                    {error && (
                        <div className="mine-error">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            {error}
                        </div>
                    )}
                    <div className="mine-bet-card">{renderBetCard()}</div>
                    <div className="mine-panel-footer">
                        <button className={"mine-footer-btn " + (soundOn ? "footer-active" : "")} onClick={toggleSound}><i className={"fa-solid text-lg " + (soundOn ? "fa-volume-high" : "fa-volume-xmark")}></i>{soundOn ? "SOUND ON" : "SOUND OFF"}</button>
                        <button className={"mine-footer-btn " + (musicOn ? "footer-active" : "")} onClick={toggleMusic}><i className="fa-solid fa-music text-lg"></i>{musicOn ? "MUSIC ON" : "MUSIC OFF"}</button>
                        <button className="mine-footer-btn" onClick={handleOpenInfo}>
                            <i className="fa-solid fa-circle-info text-lg"></i>INFO
                        </button>
                    </div>
                </div>
            </div>

            {showInfo && <InfoModal onClose={handleCloseInfo} />}
        </>
    )
}