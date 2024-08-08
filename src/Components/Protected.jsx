import React,{useEffect,useState} from 'react'
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

const Protector = ({children,authentication=true}) => {
  const [loader, setLoader] = useState(true)
 const navigate= useNavigate()
  const authStatus= useSelector((state)=>state.auth.authStatus)
  
  useEffect(() => {
    if(authentication && authStatus !== authentication){
      navigate("/login")
    }  setLoader(false)
  }, [authStatus,navigate,authentication])
  
  return loader ? <div>Loading...</div> : <div>{children}</div>
}

export default Protector