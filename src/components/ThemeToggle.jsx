import React from 'react'

const ThemeToggle = ({ current, setTheme }) => {
  const nextTheme = current === 'dark' ? 'light' : current === 'light' ? 'pink' : 'dark'

  return (
    <button
      onClick={() => setTheme(nextTheme)}
      style={{
        marginBottom: '20px',
        padding: '8px 14px',
        backgroundColor: '#888',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '14px',
        cursor: 'pointer'
      }}
    >
      🎨 Cambiar tema ({current})
    </button>
  )
}

export default ThemeToggle

