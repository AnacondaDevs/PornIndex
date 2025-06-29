import React, { useState } from 'react'

const PendingModal = ({ onAdd, onClose }) => {
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    link: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nuevoPendiente = {
      id: Date.now(),
      ...form
    }
    onAdd(nuevoPendiente)
    onClose()
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>Nuevo pendiente</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          name="titulo"
          placeholder="Título o referencia"
          value={form.titulo}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="link"
          placeholder="Link del video"
          value={form.link}
          onChange={handleChange}
          style={inputStyle}
        />
        <textarea
          name="descripcion"
          placeholder="Descripción o idea"
          value={form.descripcion}
          onChange={handleChange}
          rows={3}
          style={inputStyle}
        ></textarea>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button type="button" onClick={onClose} style={buttonStyleCancel}>Cancelar</button>
          <button type="submit" style={buttonStyleConfirm}>Guardar</button>
        </div>
      </form>
    </div>
  )
}

const inputStyle = {
  padding: '8px',
  borderRadius: '6px',
  border: '1px solid #999',
  fontSize: '14px',
  backgroundColor: '#1e1e1e',
  color: '#eee'
}

const buttonStyleCancel = {
  padding: '6px 12px',
  backgroundColor: '#999',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
}

const buttonStyleConfirm = {
  padding: '6px 12px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
}

export default PendingModal
