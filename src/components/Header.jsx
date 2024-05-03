import React, { useState } from 'react'
// import logo from '../assets/logo.png'
import menu from '../assets/menu.svg'
import close from '../assets/close.svg'

const Header = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  const navLinks = [
    // {
    //   route: "/courses",
    //   title: "Courses",
    // },
    // {
    //   route: "/resume",
    //   title: "Resume",
    // },
    // {
    //   route: "/contact",
    //   title: "Contact",
    // },
  ];
  return (
    
    <nav className=" flex items-center justify-between">
    <a href="/">
        <div className="logo flex items-center gap-2">
            {/* <img src={logo} className='w-7 h-7' alt="" /> */}
            <h1 className='text-black font-medium md:text-2xl text-xl logo-text'>zentivx</h1>
        </div>
        </a>

    <ul className="list-none  text-black sm:flex hidden items-center justify-center flex-1 ">
      {navLinks.map((nav, index) => (
        <li
          key={nav.id}
          className={`font-poppins duration-300 hover:text-purple-600 hover:font-semibold font-normal cursor-pointer text-[16px] ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
          onClick={() => setActive(nav.title)}>
          <a href={`${nav.route}`}>{nav.title}</a>
        </li>
      ))}
    </ul>
    {/* <div className=" sm:hidden flex flex-1 justify-end items-center cursor-pointer">
      <img
        src={toggle ? close : menu}
        alt="menu"
        className="w-[28px] h-[28px] object-contain"
        onClick={() => setToggle(!toggle)}
      />

      <div
        className={`${
          !toggle ? "hidden" : "flex"
        } p-6 bg-white absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl border-2 sidebar`}>
     
      
        <ul className="list-none text-black flex justify-end items-start flex-1 flex-col">
          {navLinks.map((nav, index) => (
            <li
              key={nav.id}
              className={`font-poppins font-medium cursor-pointer text-[16px] ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
              onClick={() => setActive(nav.title)}>
              <a href={`${nav.route}`}>{nav.title}</a>
            </li>
          ))}
            
        </ul>
      </div>
    </div> */}
    
    <a className='flex  text-white bg-orange-600 hover:border-orange-600 border-2 hover:text-orange-600 duration-700 hover:bg-white rounded-full px-6 py-2 ml-4' href='/contact'>Contact Us</a>

  </nav>
  )
}

export default Header