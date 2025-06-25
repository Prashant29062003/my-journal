import React from 'react'

const Logo = ({width = "100px"}) => {
  return (
    <div style={{width: width}} className='bg-red-400 p-2'>
      MyJournal
    </div>
  )
}

export default Logo
