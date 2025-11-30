import React from 'react'

interface Prop {
    children: React.ReactNode
}

const AppWrapper = ({children}: Prop) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default AppWrapper