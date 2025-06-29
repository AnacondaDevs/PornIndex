import React, { useState, useEffect } from 'react'
import ActressCard from './components/ActressCard'
import FeaturedActress from './components/FeaturedActress'
import Stats from './components/Stats'
import AddActressForm from './components/AddActressForm'
import Modal from './components/Modal'
import initialActresses from './data/initialActresses'
import ThemeToggle from './components/ThemeToggle'

const themes = {
  dark: {
    background: '#121212',
    text: '#eee',
    button: '#ff4081'
  },
  light: {
    background: '#f4f4f4',
    text: '#222',
    button: '#007BFF'
  },
  pink: {
    background: '#ffe4f2',
    text: '#4a004a',
    button: '#ff69b4'
  }
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
  const [sortBy, setSortBy] = useState(() => localStorage.getItem('sortBy') || 'nombre')

  const [showFeatured, setShowFeatured] = useState(true)
  const [showFavorites, setShowFavorites] = useState(true)
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('sortBy', sortBy)
  }, [sortBy])

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
    const updated = actresses.map((a) =>
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
      } catch (error) {
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

  const favoritas = actresses.filter((a) => a.favorita)

  const sortedActresses = [...actresses].sort((a, b) => {
    if (sortBy === 'nombre') {
      return a.nombre.localeCompare(b.nombre)
    } else if (sortBy === 'vecesVisto') {
      return b.vecesVisto - a.vecesVisto
    } else if (sortBy === 'favoritas') {
      return (b.favorita ? 1 : 0) - (a.favorita ? 1 : 0)
    }
    return 0
  })

  const filteredActresses = sortedActresses
    .filter((a) => a.id !== featured.id)
    .filter((a) => {
      const term = searchTerm.toLowerCase()
      return (
        a.nombre.toLowerCase().includes(term) ||
        a.descripcion?.toLowerCase().includes(term) ||
        a.tags?.some((tag) => tag.toLowerCase().includes(term))
      )
    })

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: currentTheme.background,
      minHeight: '100vh',
      color: currentTheme.text
    }}>
      <h1>PornIndex</h1>
      <ThemeToggle current={theme} setTheme={setTheme} />

      <button
        onClick={() => window.open('https://www.pornhub.com/video/search?search=johnny+sins', '_blank')}
        style={{ ...johnnyBtnStyle, backgroundColor: currentTheme.button }}
      >
        🎲 Que decida Johnny Sins
      </button>
      <button
        onClick={handleSurprise}
        style={{ ...johnnyBtnStyle, backgroundColor: '#4CAF50', top: '60px' }}
      >
        🎁 Sorpresa
      </button>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <button onClick={openAddForm} style={{ ...addBtnStyle, backgroundColor: currentTheme.button }}>➕ Agregar actriz</button>
        <button onClick={handleExport} style={{ ...addBtnStyle, backgroundColor: currentTheme.button }}>📤 Exportar</button>
        <label htmlFor="file-upload" style={{ ...addBtnStyle, backgroundColor: currentTheme.button }}>
          📂 Importar
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".json"
          onChange={handleImport}
          style={{ display: 'none' }}
        />
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={sortSelectStyle}>
          <option value="nombre">Ordenar por Nombre</option>
          <option value="vecesVisto">Ordenar por Visitas</option>
          <option value="favoritas">Ordenar por Favoritas</option>
        </select>
      </div>

      <input
        type="text"
        placeholder="🔍 Buscar actriz..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={searchInputStyle}
      />

      <Stats actresses={actresses} />

      {/* Destacada */}
      <h2 onClick={() => setShowFeatured(!showFeatured)} style={sectionHeader(currentTheme.button)}>⭐ Destacada</h2>
      {showFeatured && (
        <>
          <FeaturedActress actress={featured} />
          <button onClick={() => openEditForm(featured)} style={editBtnStyle}>✏️ Editar destacada</button>
        </>
      )}

      {/* Favoritas */}
      <h2 onClick={() => setShowFavorites(!showFavorites)} style={sectionHeader(currentTheme.button)}>💖 Favoritas</h2>
      {showFavorites && favoritas.length > 0 && (
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
      )}

      {/* Todas */}
      <h2 onClick={() => setShowAll(!showAll)} style={sectionHeader(currentTheme.button)}>📂 Todas</h2>
      {showAll && (
        <div style={cardContainerStyle}>
          {filteredActresses.map((actress) => (
            <ActressCard
              key={actress.id}
              actress={actress}
              onClick={handleClick}
              onEdit={openEditForm}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}

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

const editBtnStyle = {
  display: 'block',
  margin: '10px auto 30px',
  backgroundColor: '#ff4081',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  padding: '8px 15px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '14px'
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

const searchInputStyle = {
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
}

const sortSelectStyle = {
  padding: '10px',
  fontSize: '14px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  cursor: 'pointer'
}

const sectionHeader = (color) => ({
  textAlign: 'center',
  color,
  cursor: 'pointer',
  userSelect: 'none',
  marginTop: '30px'
})

export default App
