import React, { useState, useEffect } from 'react'
import ActressCard from './components/ActressCard'
import FeaturedActress from './components/FeaturedActress'
import Stats from './components/Stats'
import AddActressForm from './components/AddActressForm'
import Modal from './components/Modal'
import ThemeToggle from './components/ThemeToggle'
import PendingModal from './components/PendingModal'
import initialActresses from './data/initialActresses'

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
  const [order, setOrder] = useState('nombre')
  const [collapsed, setCollapsed] = useState({
    destacada: false,
    favoritas: false,
    todas: false,
    pendientes: false
  })

  const [pendings, setPendings] = useState(() => {
    const stored = localStorage.getItem('pendientes')
    return stored ? JSON.parse(stored) : []
  })
  const [showPendingModal, setShowPendingModal] = useState(false)

  const currentTheme = themes[theme]

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

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

  const handleDelete = (id) => {
    const updated = actresses.filter(a => a.id !== id)
    setActresses(updated)
    updateLocalStorage(updated)
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
      } catch (error) {
        alert('Error al importar JSON.')
      }
    }
    reader.readAsText(file)
  }

  const handleSurprise = () => {
    if (actresses.length === 0) return
    const random = actresses[Math.floor(Math.random() * actresses.length)]
    if (random.url) {
      window.open(random.url, '_blank')
    }
  }

  const featured = actresses.reduce((prev, curr) =>
    curr.vecesVisto > prev.vecesVisto ? curr : prev
  , actresses[0] || {})

  const filteredActresses = actresses
    .filter((a) => a.id !== featured?.id)
    .filter((a) => {
      const term = searchTerm.toLowerCase()
      return (
        a.nombre.toLowerCase().includes(term) ||
        a.descripcion?.toLowerCase().includes(term) ||
        a.tags?.some(tag => tag.toLowerCase().includes(term))
      )
    })

  const sortedActresses = [...filteredActresses].sort((a, b) => {
    if (order === 'nombre') return a.nombre.localeCompare(b.nombre)
    if (order === 'vecesVisto') return b.vecesVisto - a.vecesVisto
    if (order === 'favorita') return (b.favorita ? 1 : 0) - (a.favorita ? 1 : 0)
    return 0
  })

  const favoritas = actresses.filter(a => a.favorita)

  const handleAddPending = (item) => {
    const updated = [...pendings, item]
    setPendings(updated)
    localStorage.setItem('pendientes', JSON.stringify(updated))
  }

  const handleDeletePending = (id) => {
    const updated = pendings.filter(p => p.id !== id)
    setPendings(updated)
    localStorage.setItem('pendientes', JSON.stringify(updated))
  }

  const toggleCollapse = (section) => {
    setCollapsed(prev => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: currentTheme.background, minHeight: '100vh', color: currentTheme.text }}>
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
        <button onClick={() => setShowPendingModal(true)} style={{ ...addBtnStyle, backgroundColor: currentTheme.button }}>📌 Pendientes</button>
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

      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <select value={order} onChange={(e) => setOrder(e.target.value)} style={{ padding: '6px 10px', borderRadius: '6px', fontSize: '14px' }}>
          <option value="nombre">🔠 Ordenar por nombre</option>
          <option value="vecesVisto">🔥 Más vistas</option>
          <option value="favorita">❤️ Favoritas primero</option>
        </select>
      </div>

      {!collapsed.destacada && <FeaturedActress actress={featured} />}
      <button onClick={() => toggleCollapse('destacada')}>{collapsed.destacada ? '📂 Mostrar destacada' : '📁 Ocultar destacada'}</button>

      <Stats actresses={actresses} />

      {favoritas.length > 0 && (
        <>
          <h2 onClick={() => toggleCollapse('favoritas')} style={{ cursor: 'pointer', color: currentTheme.button }}>
            {collapsed.favoritas ? '📂 Mostrar favoritas' : '📁 Ocultar favoritas'}
          </h2>
          {!collapsed.favoritas && (
            <div style={cardContainerStyle}>
              {favoritas.map((actress) => (
                <ActressCard
                  key={actress.id}
                  actress={actress}
                  onClick={handleClick}
                  onEdit={openEditForm}
                  onDelete={handleDelete}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </>
      )}

      <h2 onClick={() => toggleCollapse('todas')} style={{ textAlign: 'center', marginTop: '30px', cursor: 'pointer' }}>
        {collapsed.todas ? '📂 Mostrar todas' : '📁 Ocultar todas'}
      </h2>
      {!collapsed.todas && (
        <div style={cardContainerStyle}>
          {sortedActresses.map((actress) => (
            <ActressCard
              key={actress.id}
              actress={actress}
              onClick={handleClick}
              onEdit={openEditForm}
              onDelete={handleDelete}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}

      {pendings.length > 0 && (
        <>
          <h2 onClick={() => toggleCollapse('pendientes')} style={{ textAlign: 'center', marginTop: '30px', color: currentTheme.button, cursor: 'pointer' }}>
            {collapsed.pendientes ? '📂 Mostrar pendientes por explorar' : '📁 Ocultar pendientes por explorar'}
          </h2>
          {!collapsed.pendientes && (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {pendings.map(p => (
                <li key={p.id} style={{
                  backgroundColor: '#2c2c2c',
                  color: '#eee',
                  borderRadius: '8px',
                  padding: '10px',
                  marginBottom: '10px'
                }}>
                  <strong>{p.titulo}</strong>
                  {p.descripcion && <p>{p.descripcion}</p>}
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ color: '#4ecdc4' }}>
                      Ver enlace 🔗
                    </a>
                  )}
                  <div>
                    <button onClick={() => handleDeletePending(p.id)} style={{
                      marginTop: '6px',
                      backgroundColor: '#ff5555',
                      color: 'white',
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}>
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
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

      {showPendingModal && (
        <Modal isOpen={showPendingModal} onClose={() => setShowPendingModal(false)}>
          <PendingModal onAdd={handleAddPending} onClose={() => setShowPendingModal(false)} />
        </Modal>
      )}
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
