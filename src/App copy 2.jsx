// ... imports sin cambios ...
import React, { useState, useEffect } from 'react'
import ActressCard from './components/ActressCard'
import FeaturedActress from './components/FeaturedActress'
import Stats from './components/Stats'
import AddActressForm from './components/AddActressForm'
import Modal from './components/Modal'
import initialActresses from './data/initialActresses'
import ThemeToggle from './components/ThemeToggle'

const themes = {
  dark: { background: '#121212', text: '#eee', button: '#ff4081' },
  light: { background: '#f4f4f4', text: '#222', button: '#007BFF' },
  pink: { background: '#ffe4f2', text: '#4a004a', button: '#ff69b4' }
}

const App = () => {
  const [actresses, setActresses] = useState(() => {
    const stored = localStorage.getItem('actrices')
    return stored ? JSON.parse(stored) : initialActresses
  })

  const [selected, setSelected] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  // 🆕 Criterio de orden
  const [sortBy, setSortBy] = useState('nombre')

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  const currentTheme = themes[theme]

  const updateLocalStorage = (list) => {
    localStorage.setItem('actrices', JSON.stringify(list))
  }

  const handleClick = (id) => {
    const updated = actresses.map((a) =>
      a.id === id ? { ...a, vecesVisto: a.vecesVisto + 1 } : a
    )
    setActresses(updated)
    updateLocalStorage(updated)
  }

  const handleAdd = (newActress) => {
    const updated = [...actresses, newActress]
    setActresses(updated)
    updateLocalStorage(updated)
  }

  const handleUpdate = (edited) => {
    const updated = actresses.map((a) => (a.id === edited.id ? edited : a))
    setActresses(updated)
    updateLocalStorage(updated)
    setSelected(null)
  }

  const toggleFavorite = (id) => {
    const updated = actresses.map(a =>
      a.id === id ? { ...a, favorita: !a.favorita } : a
    )
    setActresses(updated)
    updateLocalStorage(updated)
  }

  const openAddForm = () => {
    setSelected(null)
    setModalOpen(true)
  }

  const openEditForm = (actress) => {
    setSelected(actress)
    setModalOpen(true)
  }

  const handleExport = () => {
    const data = JSON.stringify(actresses, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'actrices_backup.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleImport = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result)
        if (Array.isArray(imported)) {
          setActresses(imported)
          updateLocalStorage(imported)
          alert('Datos importados correctamente.')
        } else {
          alert('El archivo no es válido.')
        }
      } catch {
        alert('Error al importar JSON.')
      }
    }
    reader.readAsText(file)
  }

  const handleSurprise = () => {
    if (actresses.length === 0) return
    const random = actresses[Math.floor(Math.random() * actresses.length)]
    window.open(random.url, '_blank')
  }

  const featured = actresses.reduce((prev, curr) =>
    curr.vecesVisto > prev.vecesVisto ? curr : prev
  )

  const favoritas = actresses.filter(a => a.favorita)

  const filteredActresses = actresses
    .filter((a) => a.id !== featured.id)
    .filter((a) => {
      const term = searchTerm.toLowerCase()
      return (
        a.nombre.toLowerCase().includes(term) ||
        a.descripcion?.toLowerCase().includes(term) ||
        a.tags?.some(tag => tag.toLowerCase().includes(term))
      )
    })

  // 🆕 Aplicar orden según el criterio seleccionado
  const sortedActresses = [...filteredActresses].sort((a, b) => {
    if (sortBy === 'nombre') return a.nombre.localeCompare(b.nombre)
    if (sortBy === 'vistas') return b.vecesVisto - a.vecesVisto
    if (sortBy === 'favoritas') return (b.favorita === a.favorita) ? 0 : b.favorita ? 1 : -1
    return 0
  })

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', backgroundColor: currentTheme.background, color: currentTheme.text, minHeight: '100vh' }}>
      <h1>PornIndex</h1>

      <ThemeToggle current={theme} setTheme={setTheme} />

      <button onClick={() => window.open('https://www.pornhub.com/video/search?search=johnny+sins', '_blank')} style={{ ...johnnyBtnStyle, backgroundColor: currentTheme.button }}>
        🎲 Que decida Johnny Sins
      </button>

      <button onClick={handleSurprise} style={{ ...johnnyBtnStyle, backgroundColor: '#4CAF50', top: '60px' }}>
        🎁 Sorpresa
      </button>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <button onClick={openAddForm} style={{ ...addBtnStyle, backgroundColor: currentTheme.button }}>➕ Agregar actriz</button>
        <button onClick={handleExport} style={{ ...addBtnStyle, backgroundColor: currentTheme.button }}>📤 Exportar</button>
        <label htmlFor="file-upload" style={{ ...addBtnStyle, backgroundColor: currentTheme.button }}>📂 Importar</label>
        <input id="file-upload" type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
      </div>

      <input
        type="text"
        placeholder="🔍 Buscar actriz..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          display: 'block',
          margin: '0 auto 20px',
          padding: '10px 15px',
          fontSize: '16px',
          borderRadius: '8px',
          border: '1px solid #555',
          backgroundColor: '#1e1e1e',
          color: '#eee',
          width: '80%',
          maxWidth: '400px'
        }}
      />

      {/* 🆕 Selector de orden */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>📊 Ordenar por:</label>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: '8px', borderRadius: '6px' }}>
          <option value="nombre">Nombre (A-Z)</option>
          <option value="vistas">Veces visto</option>
          <option value="favoritas">Favoritas</option>
        </select>
      </div>

      <FeaturedActress actress={featured} />
      <Stats actresses={actresses} />

      {favoritas.length > 0 && (
        <>
          <h2 style={{ textAlign: 'center', color: currentTheme.button }}>⭐ Favoritas</h2>
          <div style={cardContainerStyle}>
            {favoritas.map((actress) => (
              <ActressCard
                key={actress.id}
                actress={actress}
                onClick={handleClick}
                onEdit={openEditForm}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </>
      )}

      <h2 style={{ textAlign: 'center', marginTop: '30px' }}>📂 Todas</h2>
      <div style={cardContainerStyle}>
        {sortedActresses.map((actress) => (
          <ActressCard
            key={actress.id}
            actress={actress}
            onClick={handleClick}
            onEdit={openEditForm}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <AddActressForm
          onAdd={(actress) => {
            handleAdd(actress)
            setModalOpen(false)
          }}
          onUpdate={(actress) => {
            handleUpdate(actress)
            setModalOpen(false)
          }}
          selected={selected}
        />
      </Modal>
    </div>
  )
}

// estilos
const cardContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '10px'
}
const addBtnStyle = {
  padding: '10px 15px',
  fontSize: '16px',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
}
const johnnyBtnStyle = {
  position: 'fixed',
  top: '10px',
  right: '10px',
  color: 'white',
  border: 'none',
  borderRadius: '20px',
  padding: '8px 14px',
  fontWeight: 'bold',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  cursor: 'pointer',
  zIndex: 999
}

export default App
