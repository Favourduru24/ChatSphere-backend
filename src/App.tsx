import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

// white #FFFFFF green #4CAF50 allmes #696969 icon #C9C9C9 icon-text #9E9E9E BG #F1EFFF TYPING #8ADE9F HOVER #F1EFFF

// white #FFFFFF BG #F9FBFC HOVER #EDF2FE TEXT-BG #F9FBFC IMAGE-BORER #FFFFFF ICON #495568 ACTIVE #EDFFF2 DRRK #D5FDE3 LINEN #8E8AD8