import React from 'react'

const PendingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const pendientes = JSON.parse(localStorage.getItem('pendientes')) || []

  const handleDelete = (index) => {
    const actualizados = pendientes.filter((_, i) => i !== index)
    localStorage.setItem('pendientes', JSON.stringify(actualizados))
    window.location.reload()
  }

  return (
    <div style={modalOverlay}>
      <div style={modalContent}>
        <h2>📝 Pendientes</h2>
        {pendientes.length === 0 ? (
          <p>No hay notas pendientes.</p>
        ) : (
          <ul>
            {pendientes.map((item, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <strong>{item.titulo}</strong><br />
                {item.descripcion}<br />
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">🔗 Ver enlace</a>
                )}
                <br />
                <button onClick={() => handleDelete(index)} style={deleteBtn}>❌ Eliminar</button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={onClose} style={closeBtn}>Cerrar</button>
      </div>
    </div>
  )
}

const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
}

const modalContent = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  padding: '20px',
  width: '90%',
  maxWidth: '500px',
  maxHeight: '80vh',
  overflowY: 'auto'
}

const deleteBtn = {
  marginTop: '5px',
  padding: '5px 10px',
  backgroundColor: '#ff4d4d',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '12px'
}

const closeBtn = {
  marginTop: '20px',
  padding: '8px 15px',
  backgroundColor: '#333',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
}

export default PendingModal
