import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001')

function App() {
  const [input, setInput] = useState('')
  const [room, setRoom] = useState('')
  const [messages, setMessages] = useState()

  function handleSubmit(e) {
    e.preventDefault()
    socket.emit('send_message', { message: input, room })
    setInput('')
  }

  function handleRoom(e) {
    e.preventDefault()
    if (room !== '') {
      socket.emit('join_room', room)
    }
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages(data.message)
    })
  }, [socket])

  return (
    <>
      <form onSubmit={handleRoom}>
        <input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder='select room'
        />
        <button hidden type='submit'></button>
      </form>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder='message here..' />
        <button type='submit' hidden></button>
      </form>

      <div>
        {messages}
      </div>
    </>
  )
}

export default App
