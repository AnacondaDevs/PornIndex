import React from 'react'

const PracticesModal = ({ practices, onDelete, onClose }) => {
  return (
    <div style={modalOverlay}>
      <div style={modalContent}>
        <h2>Prácticas Pendientes</h2>
        {practices.length === 0 ? (
          <p>No hay prácticas registradas.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {practices.map((item, idx) => (
              <li key={idx} style={practiceItem}>
                <p><strong>Actriz:</strong> {item.actress}</p>
                <p><strong>Nota:</strong> {item.note}</p>
                {item.url && <a href={item.url} target="_blank" rel="noreferrer">🔗 Ver video</a>}
                <button onClick={() => onDelete(idx)} style={deleteBtn}>Eliminar</button>
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
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
}

const modalContent = {
  background: '#fff',
  padding: '20px',
  borderRadius: '10px',
  maxWidth: '500px',
  width: '90%',
  maxHeight: '80vh',
  overflowY: 'auto',
  color: '#000'
}

const practiceItem = {
  background: '#f4f4f4',
  marginBottom: '12px',
  padding: '10px',
  borderRadius: '8px'
}

const deleteBtn = {
  backgroundColor: '#c0392b',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  marginTop: '8px',
  borderRadius: '6px',
  cursor: 'pointer'
}

const closeBtn = {
  marginTop: '15px',
  backgroundColor: '#555',
  color: 'white',
  border: 'none',
  padding: '8px 14px',
  borderRadius: '8px',
  cursor: 'pointer'
}

export default PracticesModal
