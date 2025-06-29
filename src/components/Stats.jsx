import React, { useState } from 'react'

const Stats = ({ actresses }) => {
  const [showTop3, setShowTop3] = useState(false)

  const totalViews = actresses.reduce((sum, a) => sum + (a.vecesVisto || 0), 0)

  const top3 = [...actresses]
    .sort((a, b) => b.vecesVisto - a.vecesVisto)
    .slice(0, 3)

  const medals = ['🥇', '🥈', '🥉']

  return (
    <div style={statsContainer}>
      <h3>📊 Estadísticas</h3>
      <p>Total de vistas: <strong>{totalViews}</strong></p>

      <button onClick={() => setShowTop3(!showTop3)} style={toggleBtn}>
        {showTop3 ? '⬆️ Ocultar top 3' : '⬇️ Ver top 3'}
      </button>

      {showTop3 && (
        <ul style={topList}>
          {top3.map((a, i) => (
            <li key={a.id}>
              {medals[i]}{' '}
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
              >
                {a.nombre}
              </a>{' '}
              ({a.vecesVisto} vistas)
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const statsContainer = {
  margin: '30px auto',
  maxWidth: '500px',
  padding: '20px',
  backgroundColor: '#1e1e1e',
  borderRadius: '12px',
  textAlign: 'center',
  boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
}

const topList = {
  marginTop: '10px',
  paddingLeft: '0',
  listStyle: 'none'
}

const toggleBtn = {
  marginTop: '10px',
  padding: '6px 12px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#ff4081',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer'
}

const linkStyle = {
  color: '#4FC3F7',
  textDecoration: 'none'
}

export default Stats
