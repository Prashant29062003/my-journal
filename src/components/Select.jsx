import React, { useId } from 'react'

const Select = ({
    options = [],
    label,
    error = "",
    className = "", 
    ...props
}, ref) => {
    const id = useId();
  return (
    <div className='w-full'>
      {label && <label htmlFor={id} className='block mb-1 font-medium'>{label}</label>}
      <select
        {...props}
        ref={ref}
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border w-full ${error ? 'border-red-500' : 'border-gray-200'} ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        <option value="" disabled hidden>Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <span id={`${id}-error`} className="text-red-500 text-xs mt-1 block">{error}</span>
      )}
    </div>
  )
}

export default React.forwardRef(Select)
