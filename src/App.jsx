import './App.css'
import PestanasHeader from './components/PestanasHeader.jsx'
import { ImagenProvider } from './context/ImagenContext.jsx'

function App() {
  return (
    <>
      <ImagenProvider>
        <PestanasHeader />
      </ImagenProvider>
    </>
  )
}

export default App
