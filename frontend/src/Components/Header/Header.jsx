import React, { useState } from 'react'
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
const Header = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Home
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );
  return (
    <header>
      <nav className="bg-white p-4 fixed z-20 w-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center flex-shrink-0 text-black mr-6">
              <a className="font-semibold text-xl cursor-pointer">Blog.ai</a>
            </div>
            <div className="hidden lg:block">
              {/* <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-black px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </a>

                <a
                  href="#"
                  className="text-black px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact
                </a>
              </div> */}
            </div>
            {/* <div className="flex items-center gap-x-1">
              <Button
                variant="text"
                size="sm"
                className="hidden lg:inline-block"
              >
                <span>Log In</span>
              </Button>
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
              >
                <span>Sign in</span>
              </Button>
            </div> */}
          </div>
        </div>
        
      </nav>
    </header>
  )
}

export default Header