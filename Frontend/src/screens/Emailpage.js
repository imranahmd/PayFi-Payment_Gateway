import React from 'react'
import Submenu from './Submenu'
import Nav from "../screens/Navbar";

export default function Emailpage() {
  return (
    <div>
    <Nav />
    <div className='flex'>
      <Submenu   />
        <div className="flex ">
        <div className="w-[85%] bg-blue-400 flex justify-center">
            <h1 className="text-2xl">Mass Email</h1>
         </div>
        </div>
    </div>
  </div>
  )
}
