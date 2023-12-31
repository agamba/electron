import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import "./app.css";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Electron + Vite + Preact</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/app.jsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">
        Click on the Vite and Preact logos to learn more
      </p>
    </>
  );
}
