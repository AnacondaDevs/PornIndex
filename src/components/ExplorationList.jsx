// src/components/ExplorationList.jsx
import React from 'react'

const ExplorationList = ({ explorations, onRemove }) => {
  if (explorations.length === 0) return null

  return (
    <div style={{ marginTop: '40px' }}>
      <h2 style={{ textAlign: 'center', color: '#ff4081' }}>🧠 Exploración Sexual</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {explorations.map((item, idx) => (
          <li key={idx} style={{
            background: '#1e1e1e',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '8px'
          }}>
            <p><strong>{item.descripcion}</strong></p>
            {item.link && (
              <p>
                <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: '#4caf50' }}>
                  Ver video de referencia
                </a>
              </p>
            )}
            <small style={{ color: '#ccc' }}>📅 {item.fecha}</small><br />
            <button
              onClick={() => onRemove(idx)}
              style={{
                marginTop: '8px',
                backgroundColor: '#ff4081',
                border: 'none',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              🗑 Quitar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ExplorationList
