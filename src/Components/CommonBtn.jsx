import React from 'react'

function CommonBtn({
    children,
    className = "",
    type="submit",
    ...props
}) {
  return (
    <button  type={type} {...props} className={`w-full p-1 bg-black rounded-md ${className}`}>
    {children}
    </button>
  )
}

export default CommonBtn