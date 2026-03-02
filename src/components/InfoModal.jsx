import { useCallback } from "react"

export default function InfoModal({ onClose }) {

    const handleBackdropClick = useCallback((e) => {
        if (e.target === e.currentTarget) onClose()
    }, [onClose])

    return (
        <div className="info-backdrop" onClick={handleBackdropClick}>
            <div className="info-modal">

                {/* Fixed Header */}
                <div className="info-header">
                    <div className="info-header-line" />
                    <h2 className="info-title">GAME INFO - MINES</h2>
                    <div className="info-header-line" />
                </div>

                {/* Close Button */}
                <button className="info-close" onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>

                {/* Scrollable body + green right bar */}
                <div className="info-scroll-wrapper">
                    <div className="info-body">

                        <p className="info-text">
                            MINES is a classic game where the objective of the game is to pick cells from a grid.
                            Behind each cell there can be either a mine or a diamond. For each diamond you find,
                            your win increases, but if you hit a mine you lose it all!
                        </p>
                        <p className="info-text">
                            Once you have placed your initial bet, each pick is free. Pick cells until you are
                            happy with the win, and then collect it.
                        </p>

                        <h3 className="info-section">PAYOUT DISPLAY</h3>
                        <p className="info-text">
                            Above the grid is a bar with numbers. The highlighted number is the payout you will
                            receive if you collect immediately, expressed as a multiplier of your initial bet.
                            The number to the right of the highlighted value is the potential payout if you
                            successfully find another diamond, and so on. Your potential win amount is also
                            displayed in your currency in the dark bar below the game.
                        </p>

                        <h3 className="info-section">SETTINGS MENU</h3>
                        <p className="info-text">
                            The size of the grid and the number of mines is configurable in the settings screen.
                            The more mines you configure, the higher the risk, but the larger the potential payout!
                            On the other hand, if you increase the size of the grid, the payout per found diamond
                            will go down, but the risk decreases. You can configure the game to fit your own playstyle!
                        </p>

                        <h3 className="info-section">RETURN TO PLAYER</h3>
                        <p className="info-text">
                            The RTP of this game is 97%. The RTP is deterministically calculated by a theoretical
                            probability model.
                        </p>
                        <p className="info-text">
                            Please note that if the next pick would cause your potential win to exceed €1,000,000.00
                            or 10,000 times your bet (whichever is lower), the round will end and your current win
                            will be credited immediately.
                        </p>

                        <h3 className="info-section">WAYS TO WIN</h3>
                        <p className="info-text">
                            Pick at least one diamond and collect the potential win.
                        </p>

                        <h3 className="info-section">GENERAL</h3>

                        <p className="info-label">BALANCE</p>
                        <p className="info-text">
                            Your current balance is shown in the BALANCE display. Balance, bets and winnings
                            are presented in the player's chosen currency.
                        </p>

                        <p className="info-label">BET</p>
                        <p className="info-text">
                            The current bet level is shown in the BET display. Change the bet by clicking on
                            the arrows and choosing the bet level of your choice.
                        </p>
                        <p className="info-text">
                            The allowed bet levels for this game are between €0.50 and €100.00.
                        </p>

                        <h3 className="info-section">ADDITIONAL INFORMATION</h3>
                        <p className="info-text">
                            In addition to the features described here, the bar on the bottom of the game screen
                            displays the current balance in the chosen currency, the amount paid if a win occurs,
                            and the amount bet on the last/current proposition.
                        </p>

                        <h3 className="info-section">HISTORY</h3>
                        <p className="info-text">
                            The result of a completed game may be viewed in History. Results of unfinished games
                            are not displayed in History.
                        </p>

                        <h3 className="info-section">GENERAL TERMS AND CONDITIONS</h3>
                        <p className="info-text">- Misuse or malfunction voids all pays and plays.</p>
                        <p className="info-text">
                            - Any visual representation does not represent a "real" physical device and the
                            probabilities are determined by the game's random number generator.
                        </p>
                        <p className="info-text">
                            - Refreshing mid-game will end the round and your bet will be fully refunded.
                        </p>

                        <div className="info-footer">
                            <p className="info-text">Game version 1.0.0</p>
                        </div>

                    </div>
                    <div className="info-right-bar" />
                </div>

            </div>
        </div>
    )
}