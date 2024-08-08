import React, { useState } from 'react'
import { IoAdd } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { CiLogin } from "react-icons/ci";
import { IoDocuments } from "react-icons/io5";
import { authservice } from '../FireBase/Auth';
import { logout } from '../Store/AuthSlice';
import { useNavigate } from 'react-router-dom';



function Navbar() {

  const [isOpen, setIsOpen] = useState(false)
  const Status = useSelector((state) => state.auth.authStatus)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const baseNavItemStyle = "rounded-full border-2 border-gray-300 shadow-md shadow-gray-300 p-1 transition-all duration-300 hover:bg-gray-100 hover:scale-110";


  const NavItem = [
    {
      icon: <IoAdd />,
      status: Status,
      style: `${baseNavItemStyle} ${isOpen ? "hidden" : "text-[52px]"}`,
      path: "/add-blogs"
    },

    {
      icon: <CiLogin />,
      status: !Status,
      style: `${baseNavItemStyle} ${isOpen ? "hidden mt-2" : "text-[51px] mt-2"}`,
      path: "/login"
    },
    {
      icon: <IoDocuments />,
      status: Status,
      style: `${baseNavItemStyle} ${isOpen ? "hidden mt-2" : "text-[51px] mt-2"}`,
      path: "/home" 
    }
  ];

  const handleLogout = async () => {
    const response = await authservice.SignOut()
    if (response) {
      dispatch(logout())
       navigate("/login")
    } else {
      console.log("fail to logout")
    }
  }

  return (
    <div className={`fixed top-0 left-0 z-50 ${isOpen ? "w-0" : "w-24"} h-screen bg-white flex flex-col items-center rounded-r-xl shadow-md relative shadow-gray-300 transition-all transition-300`}>
      {isOpen ? <IoIosArrowForward onClick={handleSidebar} className='absolute top-[43%] left-[84%] text-[26px] md:hidden' /> : <IoIosArrowBack onClick={handleSidebar} className='absolute top-[43%] left-[86%] text-[26px] md:hidden' />}



      <h1 className={` ${isOpen ? "hidden" : ""} font-sans text-[11px] `}>Writing Buddy</h1>
      <div className='w-full h-[30%] mt-2 flex flex-col items-center'>
        <img className={` ${isOpen ? "hidden" : " h-16"}`} src="/logo.jpg" alt=""  onClick={()=> navigate(`${Status ? "/home": "/login"}`)} />
      </div>
      <div className='w-full h-[70%]'>
        <div className='h-[30%] w-full flex flex-col items-center '>
        
          {NavItem.map((item, id) => (
            item.status ? (
              <div key={id} onClick={()=> navigate(item.path)} className={`${item.style} cursor-pointer`}>{item.icon}</div>
            ) : null
          ))}
          {Status && <button onClick={handleLogout} className={`rounded-full border-2 border-gray-300 shadow-md shadow-gray-300 p-1 transition-all duration-300 hover:bg-gray-100 hover:scale-110 ${isOpen ? "hidden mt-2" : "text-[51px] mt-2"}`}>{<MdOutlineLogout />}</button>}

          {/*       <IoAdd className={` ${isOpen ? "text-[30px]" : "text-[52px]"}  rounded-full border-2 border-gray-300 shadow-md shadow-gray-300 p-1`} />
      <MdOutlineLogout className={` ${isOpen ? "text-[30px] mt-2" : "text-[51px]"}  rounded-full border-2 border-gray-300 shadow-md shadow-gray-300 p-1 mt-1`} />
      <CiLogin className={` ${isOpen ? "text-[30px] mt-2" : "text-[51px]"}  rounded-full border-2 border-gray-300 shadow-md shadow-gray-300 p-1 mt-1`} /> */}
        </div>

        <div className='w-full h-[70%] flex flex-col items-center justify-end pb-4'>
          <IoSettingsSharp className={` ${isOpen ? "hidden" : "text-[52px]"}  rounded-full border-2 border-gray-300 shadow-md shadow-gray-300 p-1`} />
        </div>
      </div>
    </div>
  )
}

export default Navbar