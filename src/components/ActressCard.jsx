import React, { useState } from 'react'

const ActressCard = ({ actress, onClick, onEdit, onToggleFavorite, onDelete, viewMode }) => {
  const [showOptions, setShowOptions] = useState(false)

  const handleImageClick = () => {
    if (viewMode === 'grid') {
      onClick(actress.id)
      return
    }
    setShowOptions(prev => !prev)
  }

  const handleOpen = (url) => {
    window.open(url, '_blank')
    setShowOptions(false)
  }

  if (viewMode === 'grid') {
    return (
      <div style={gridCardStyle} onClick={() => onClick(actress.id)}>
        <img
          src={actress.imagen}
          alt={actress.nombre}
          style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
        />
      </div>
    )
  }

  return (
    <div className="card" style={cardStyle}>
      <div style={{ position: 'relative' }}>
        <img
          src={actress.imagen}
          alt={actress.nombre}
          onClick={handleImageClick}
          style={{ cursor: 'pointer', width: '100%', borderRadius: '8px' }}
        />

        {showOptions && (
          <div style={optionsStyle}>
            {actress.url && (
              <button onClick={() => handleOpen(actress.url)}>🔗 Principal</button>
            )}
            {Array.isArray(actress.urls) && actress.urls.map((link, idx) => {
              if (!link) return null
              const url = typeof link === 'string' ? link : link.link
              if (!url) return null

              let icon = '🧭'
              const urlLower = url.toLowerCase()

              if (urlLower.includes('instagram.com')) icon = '📸'
              else if (urlLower.includes('twitter.com') || urlLower.includes('x.com')) icon = '🐦'
              else if (urlLower.includes('onlyfans.com')) icon = '🔒'
              else if (urlLower.includes('tiktok.com')) icon = '🎵'
              else if (urlLower.includes('reddit.com')) icon = '👽'
              else if (urlLower.includes('facebook.com')) icon = '📘'
              else if (urlLower.includes('youtube.com')) icon = '▶️'
              else if (urlLower.includes('eporner.com')) icon = '🎥'

              const label = typeof link === 'object' && link.label
                ? link.label
                : url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]

              return (
                <button key={idx} onClick={() => handleOpen(url)}>
                  {icon} {label}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <h3>{actress.nombre}</h3>
      <p>{actress.descripcion}</p>

      {actress.nota && (
        <p style={noteStyle}><strong>📝 Nota:</strong> {actress.nota}</p>
      )}

      {actress.tags?.length > 0 && (
        <div style={tagContainer}>
          {actress.tags.map((tag, idx) => (
            <span key={idx} style={tagStyle}>#{tag}</span>
          ))}
        </div>
      )}

      <button onClick={() => onEdit(actress)} style={editBtnStyle}>✏️ Editar</button>
      <button onClick={() => onToggleFavorite(actress.id)} style={favBtnStyle}>
        {actress.favorita ? '💔 Quitar favorita' : '❤️ Marcar favorita'}
      </button>
      <button onClick={() => onDelete(actress.id)} style={deleteBtnStyle}>🗑 Eliminar</button>
    </div>
  )
}

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '10px',
  margin: '10px',
  maxWidth: '250px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

const optionsStyle = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  background: '#1e1e1e',
  borderRadius: '8px',
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
  zIndex: 10
}

const tagContainer = {
  marginTop: '8px',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  justifyContent: 'center'
}

const tagStyle = {
  backgroundColor: '#ff4081',
  color: 'white',
  borderRadius: '12px',
  padding: '2px 10px',
  fontSize: '12px',
  fontWeight: 'bold',
  userSelect: 'none'
}

const editBtnStyle = {
  marginTop: '10px',
  padding: '5px 12px',
  borderRadius: '6px',
  border: 'none',
  backgroundColor: '#ff4081',
  color: 'white',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '14px'
}

const favBtnStyle = {
  marginTop: '6px',
  padding: '4px 10px',
  fontSize: '12px',
  borderRadius: '6px',
  border: 'none',
  backgroundColor: '#333',
  color: 'white',
  cursor: 'pointer'
}

const deleteBtnStyle = {
  marginTop: '6px',
  padding: '4px 10px',
  fontSize: '12px',
  borderRadius: '6px',
  border: 'none',
  backgroundColor: '#cc0000',
  color: 'white',
  cursor: 'pointer'
}

const noteStyle = {
  fontStyle: 'italic',
  fontSize: '13px',
  backgroundColor: '#000',
  color: '#fff' , // ✅ texto negro
  borderRadius: '6px',
  padding: '6px',
  marginTop: '6px',
  width: '100%',
  textAlign: 'left'
}


const gridCardStyle = {
  width: '180px',
  margin: '8px',
  cursor: 'pointer',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
}

export default ActressCard
