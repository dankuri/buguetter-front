import { useState } from 'react';
import './App.css';

function App() {
    const [count, setCount] = useState(0);
    console.log(process.env.API_URL);
    return (
        <div className="App">
            <h1 className="text-left mr-40 inline-block font-bold text-green-500 cursor-default hover:drop-shadow-[0_0_20px_rgba(34,197,94,1)]">
                buguetter
            </h1>
            <button
                className="align-bottom"
                onClick={() => setCount((count) => count + 1)}
            >
                count is {count}
            </button>
        </div>
    );
}

export default App;
