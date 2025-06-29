import React from 'react'

const FeaturedActress = ({ actress }) => {
  if (!actress) return null

  return (
    <div style={featuredStyle}>
      <h2>Actriz destacada</h2>
      <img
        src={actress.imagen}
        alt={actress.nombre}
        style={{ width: '200px', borderRadius: '12px', cursor: 'pointer' }}
        onClick={() => window.open(actress.url, '_blank')}
      />
      <h3>{actress.nombre}</h3>
      <p>{actress.descripcion}</p>
      <p>Veces vista: {actress.vecesVisto}</p>
    </div>
  )
}

const featuredStyle = {
  textAlign: 'center',
  margin: '20px 0',
  padding: '10px',
  border: '2px solid #ff4081',
  borderRadius: '12px',
  backgroundColor: '#fff'
}

export default FeaturedActress
