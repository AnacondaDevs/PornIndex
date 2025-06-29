import React from 'react'

const PracticeList = ({ practices, onDelete }) => {
  if (practices.length === 0) return null

  return (
    <div style={{ marginTop: '40px' }}>
      <h2>📓 Prácticas anotadas</h2>
      {practices.map((p, index) => (
        <div key={index} style={itemStyle}>
          <p style={{ margin: 0 }}>{p.practice}</p>
          {p.reference && (
            <a href={p.reference} target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px' }}>
              🔗 Ver referencia
            </a>
          )}
          <button onClick={() => onDelete(index)} style={btnStyle}>Eliminar</button>
        </div>
      ))}
    </div>
  )
}

const itemStyle = {
  background: '#f0f0f0',
  padding: '10px',
  borderRadius: '8px',
  marginBottom: '10px',
  position: 'relative'
}

const btnStyle = {
  position: 'absolute',
  right: '10px',
  top: '10px',
  backgroundColor: '#c00',
  color: 'white',
  border: 'none',
  padding: '4px 8px',
  borderRadius: '5px',
  cursor: 'pointer'
}

export default PracticeList
