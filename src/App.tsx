import Tasks from "./features/task/Tasks"
import Stats from "./features/stats/Stats"
import "./App.css"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className={"header__title"}>Tasks</h1>
      </header>
      <div className={"container"}>
        <Tasks />
        <Stats />
      </div>
    </div>
  )
}

export default App
