import React, { useState, useEffect, useRef } from 'react'
import { uuid } from 'uuidv4'
import List from './List'
import Alert from './Alert'
const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) return JSON.parse(list)
  return []
}
function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })

  const input = useRef('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      showAlert(true, 'please enter value', 'danger')
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
          }
          return item
        })
      )
      setName('')
      setIsEditing(false)
      setEditID(null)
    } else {
      showAlert(true, 'item added to the list', 'success')
      const newItem = { id: uuid(), title: name }
      setList([...list, newItem])
      setName('')
    }
  }
  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type })
  }
  const editItem = (id) => {
    const itemEdited = list.find((item) => item.id === id)
    setName(itemEdited.title)
    setEditID(itemEdited.id)
    setIsEditing(true)
    input.current.focus()
  }
  const removeItem = (id) => {
    showAlert(true, 'you removed the item', 'danger')
    const listFiltered = list.filter((item) => item.id !== id)
    setList(listFiltered)
  }
  const clearList = () => {
    showAlert(true, 'empty list', 'danger')
    setList([])
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            ref={input}
            type='text'
            className='grocery'
            placeholder='e.g eggs'
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>
            clear item
          </button>
        </div>
      )}
    </section>
  )
}

export default App
