import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../features/auth/authSlice"

export default function Profile() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(s => s.auth)
    const balance = useSelector(s => s.wallet.balance)

    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false)
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    const initials = user?.email
        ? user.email.slice(0, 2).toUpperCase()
        : "?"

    const handleLogout = () => {
        dispatch(logout())
        navigate("/")
    }

    return (
        <div ref={ref} className="profile-profile font-['Orbitron']" onClick={() => setOpen(o => !o)}>
            <div className="profile-avatar">{initials}</div>
            <i className={`fa-solid fa-chevron-down profile-chevron ${open ? "rotated" : ""}`}></i>
            {open && (
                <div className="profile-dropdown">
                    <div className="profile-dropdown-header">
                        <div className="profile-avatar profile-avatar-lg">{initials}</div>
                        <div>
                            <p className="profile-email">{user?.email}</p>
                            <p className="profile-balance">€{balance.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="profile-divider" />
                    <button className="profile-logout" onClick={handleLogout}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}