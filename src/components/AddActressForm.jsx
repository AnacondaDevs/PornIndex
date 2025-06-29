import React, { useState, useEffect } from 'react'

const AddActressForm = ({ onAdd, onUpdate, selected }) => {
  const [form, setForm] = useState({
    id: null,
    nombre: '',
    url: '',
    urls: [''],
    imagen: '',
    descripcion: '',
    tags: '',
    nota: '' // ✅ Agregamos nota
  })

  useEffect(() => {
    if (selected) {
      setForm({
        ...selected,
        urls: selected.urls && selected.urls.length ? selected.urls : [''],
        tags: selected.tags ? selected.tags.join(', ') : '',
        nota: selected.nota || ''
      })
    } else {
      setForm({
        id: Date.now(),
        nombre: '',
        url: '',
        urls: [''],
        imagen: '',
        descripcion: '',
        tags: '',
        nota: ''
      })
    }
  }, [selected])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleUrlChange = (index, value) => {
    const updatedUrls = [...form.urls]
    updatedUrls[index] = value
    setForm({ ...form, urls: updatedUrls })
  }

  const handleAddUrl = () => {
    setForm({ ...form, urls: [...form.urls, ''] })
  }

  const handleRemoveUrl = (index) => {
    const updatedUrls = form.urls.filter((_, i) => i !== index)
    setForm({ ...form, urls: updatedUrls })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const actrizData = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      vecesVisto: selected ? selected.vecesVisto : 0
    }
    if (selected) {
      onUpdate(actrizData)
    } else {
      onAdd(actrizData)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
      />

      <input
        type="text"
        name="url"
        placeholder="URL principal"
        value={form.url}
        onChange={handleChange}
      />

      {form.urls.map((link, index) => (
        <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '5px' }}>
          <input
            type="text"
            placeholder={`Otro enlace ${index + 1}`}
            value={link}
            onChange={(e) => handleUrlChange(index, e.target.value)}
          />
          {form.urls.length > 1 && (
            <button type="button" onClick={() => handleRemoveUrl(index)}>🗑</button>
          )}
        </div>
      ))}

      <button type="button" onClick={handleAddUrl}>+ Link</button>

      <input
        type="text"
        name="imagen"
        placeholder="URL de imagen"
        value={form.imagen}
        onChange={handleChange}
      />

      <input
        type="text"
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={handleChange}
      />

      <input
        type="text"
        name="tags"
        placeholder="Tags separados por coma"
        value={form.tags}
        onChange={handleChange}
      />

      <textarea
        name="nota"
        placeholder="Nota personal (ej: escena, gusto, detalle)"
        value={form.nota}
        onChange={handleChange}
        rows={3}
        style={{ width: '100%', marginTop: '10px' }}
      ></textarea>

      <button type="submit">{selected ? 'Actualizar' : 'Agregar'}</button>
    </form>
  )
}

export default AddActressForm
