import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { loginSuccess } from "../features/auth/authSlice"

export default function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (e) => {
        e.preventDefault()

        if (email === "admin@test.com" && password === "123456") {

            const fakeToken = "fake-jwt-token-123456"

            dispatch(loginSuccess({
                user: { email },
                token: fakeToken
            }))

            navigate("/dashboard")

        } else {
            alert("Invalid credentials")
        }
    }

    return (

        <div className="page-center">

            <form
                onSubmit={handleLogin}
                className="login-card"
            >

                <h2 className="login-title">
                    Login
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />

                <button
                    type="submit"
                    className="login-btn"
                >
                    Login
                </button>

            </form>

        </div>

    )
}