import React,{useId} from 'react'

function Input({
    label,
    className = "",
    placeholder,
    type= "text",
    ...props
},ref) {
    const id = useId()
  return (
    <div className='w-full p-3 text-center'>
        {label && <label className=' font-sans text-sm text-black'>{label}</label>}

        <input 
        type={type}
        className={`w-full p-1 border-2 border-gray-300 rounded-md outline-none mt-1 ${className}`}
        htmlFor={id}
        placeholder={placeholder} 
        ref={ref}
        {...props}
        />
        
    </div>
  )
}

export default React.forwardRef(Input)