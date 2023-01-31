import { useState } from 'react'
import './App.scss'

function App() {

  const [list, setList] = useState([])
  const [undid, setUndid] = useState([])

  const handleClick = (e) => {
    const circle = {
      clientX: e.clientX,
      clientY: e.clientY,
    }

    setList((prev) => [...prev, circle])
  }

  const handleUndo = (e) => {
    e.stopPropagation()

    if (list.length === 0) {
      return
    }

    const lastitem = list[list.length - 1]
    setUndid((prev) => [...prev, lastitem])

    setList((prev) => {
      const newArr = [...prev].slice(0, -1)
      return newArr
    })
  }

  const handleRedo = (e) => {
    e.stopPropagation()

    if (undid.length === 0) {
      return
    }

    const recoveredCircle = undid[undid.length - 1]
    setUndid((prev) => {
      const newArr = [...prev].slice(0, -1)
      return newArr
    })
    setList((prev) => [...prev, recoveredCircle])
  }

  const handleResetList = (e) => {
    e.stopPropagation()
    setList([])
    setUndid([])
  }

  return (
    <div id="app" onClick={handleClick}>
      <div className='top-menu'>
        <button className='top-button' onClick={handleUndo}>Desfazer</button>
        <button className='top-button' onClick={handleRedo}>Refazer</button>
        <button className='top-button' onClick={handleResetList}>Resetar</button>
      </div>
      {list.map((item, index) => (
        <span className='dot' key={index} style={{ left: item.clientX, top: item.clientY }}></span>
      ))}
    </div>
  )
}

export default App
