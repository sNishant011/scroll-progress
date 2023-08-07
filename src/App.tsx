import './App.css'
import Demo1 from './components/Demo1'
import Demo2 from './components/Demo2'

function App() {
  return (
    <div>
      <div className='dummyLongContent'>Keep scrolling</div>
      <div className='dummyLongContent'>Keep scrolling</div>
      <div className='dummyLongContent'>Demo 1
        <p>based on how much content is visible in the viewport</p>
      </div>
      <Demo1/>

      <div className='dummyLongContent'>Demo 2
        <p>Based on how much item entered viewport</p>
      </div>
      <Demo2/>
    </div>

  )
}

export default App
