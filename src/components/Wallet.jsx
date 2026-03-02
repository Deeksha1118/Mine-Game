import { useSelector } from "react-redux"

export default function Wallet() {
    const balance = useSelector((state) => state.wallet.balance)

    return (
        <div className="mine-wallet-card">
            <div className="mine-wallet-col">
                <p className="mine-wallet-label">DEMO BALANCE</p>
                <p className="mine-wallet-value">€{balance.toFixed(2)}</p>
            </div>
            <div className="mine-wallet-divider"></div>
            <div className="mine-wallet-col">
                <p className="mine-wallet-label">WIN</p>
                <p className="mine-wallet-value">€0.00</p>
            </div>
        </div>
    )
}