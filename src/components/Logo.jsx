import React from 'react'

const Logo = ({width = "100px"}) => {
  return (
    <div
      style={{ width }}
      className="flex items-center gap-2 bg-slate-600 p-2 rounded-lg shadow font-extrabold text-xl text-white select-none tracking-wide justify-center"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="inline-block mr-2">
        <circle cx="12" cy="12" r="10" fill="#fff"/>
        <text x="12" y="17" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#f87171">MJ</text>
      </svg>
      MyJournal
    </div>
  )
}

export default Logo
