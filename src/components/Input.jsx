import React, {useId} from 'react'



const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    error = "",
    ...props
}, ref){
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label className='block mb-1' htmlFor={id}>
                {label}
            </label>}
            <input 
                id={id}
                type={type}  
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border w-full ${error ? 'border-red-500' : 'border-gray-200'} ${className}`} 
                ref={ref} 
                {...props} 
                aria-label={label}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
            />
            {error && (
                <span id={`${id}-error`} className="text-red-500 text-xs mt-1 block">{error}</span>
            )}
        </div>
    )
})

export default Input
