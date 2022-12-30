import { useState, useEffect } from "react"

export default function Timer() {
    const limit = 2
    const [counter, setCounter] = useState(0)
    const [isCounting, setIsCounting] = useState(true)

    const countdownTimer = () => {
        const timer = setInterval(() => {
            if (counter >= 2) {
                clearInterval(timer)
            } else {
                setCounter((counter) => counter + 1)
            }
        }, 1000)
    }

    return (
        <div className="App">
            <h1>Counter: {counter}</h1>
            <button className="bg-red-500 p-4" onClick={countdownTimer}>
                Start Count
            </button>
        </div>
    )
}
