import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { resetGame } from "../features/mineGame/mineGame"

import betImg from "../assets/dashboard/bet.png"
import pickImg from "../assets/dashboard/pick.png"
import collectImg from "../assets/dashboard/collect.png"

export default function Dashboard() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleContinue = () => {
        dispatch(resetGame())
        navigate("/mine")
    }

    return (
        <div className="dashboard-container font-['Orbitron']">

            {/* Title */}
            <div className="dashboard-title-wrapper">
                <h1 className="app-title">
                    MINE GAME
                </h1>
            </div>

            {/* Cards */}
            <div className="dashboard-cards">

                {/* BET */}
                <div className="dashboard-card">
                    <img src={betImg} className="dashboard-card-img" />
                    <div className="dashboard-card-body">
                        <h2 className="dashboard-card-title">BET</h2>
                        <p className="dashboard-card-text">
                            Choose grid size, amount of mines and press BET to start.
                        </p>
                    </div>
                </div>

                {/* PICK */}
                <div className="dashboard-card">
                    <img src={pickImg} className="dashboard-card-img" />
                    <div className="dashboard-card-body">
                        <h2 className="dashboard-card-title">PICK</h2>
                        <p className="dashboard-card-text">
                            Pick diamonds to increase your win, but beware of the mines!
                        </p>
                    </div>
                </div>

                {/* COLLECT */}
                <div className="dashboard-card">
                    <img src={collectImg} className="dashboard-card-img" />
                    <div className="dashboard-card-body">
                        <h2 className="dashboard-card-title">COLLECT</h2>
                        <p className="dashboard-card-text">
                            Collect your win at any time!
                        </p>
                    </div>
                </div>

            </div>

            {/* Continue Button */}
            <button onClick={handleContinue} className="dashboard-btn">
                CLICK TO CONTINUE
            </button>

        </div>
    )
}