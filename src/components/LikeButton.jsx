import { useDispatch, useSelector } from "react-redux"
import { toggleLike } from "../features/likes/likeSlice"

export default function LikeButton({ gameId = "mine-game" }) {

    const dispatch = useDispatch()
    const liked = useSelector(s => s.likes.liked[gameId])

    return (
        <button
            onClick={() => dispatch(toggleLike(gameId))}
            className={`mine-like-btn ${liked ? "liked" : ""}`}
            title={liked ? "Unlike" : "Like"}
        >
            <i className={`fa-${liked ? "solid" : "regular"} fa-heart`}></i>
            {liked ? " LIKED" : " LIKE"}
        </button>
    )
}
