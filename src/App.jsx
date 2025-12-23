import './App.css'
import Customization from './components/Customization/Customization'
import Preview from './components/Preview/Preview'

function App() {
  return (
    <>
      <header>
        <h1>Shonk Generator</h1>
      </header>
      <main>
        <Customization />
        <Preview />
      </main>
    </>
  )
}

export default App
