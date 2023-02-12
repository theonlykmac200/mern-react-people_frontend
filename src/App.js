import React from "react"
import './App.css';
import Header from "./components/Header"
import Main from "./components/Main"

function App() {
  return (
    <div className="App">
      <Header key={1} />
      <Main />
    </div>
  )
}

export default App
