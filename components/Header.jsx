import React from 'react';
import Image from "next/image"
import {
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon
} from "@heroicons/react/outline"
import { useSession, signIn, signOut } from "next-auth/react"
import {useRouter} from "next/router"
import { useSelector } from 'react-redux';

function Header() {
    const session = useSession();
    const router = useRouter();
    const items = useSelector((state) => state.basket.items)

  return(
      <header>

          {/* HEADER */}
          <div className='flex items-center bg-[#131921] p-1 flex-grow py-2'>
            
            {/* LOGO */}
            <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
                <Image 
                    onClick={() => router.push("/")}
                    src="https://links.papareact.com/f90"
                    height={40}
                    width={150}
                    objectFit='contain'
                    className='cursor-pointer'
                />
            </div>

            {/* SEARCH */}
            <div className='bg-yellow-400 cursor-pointer mx-1 hover:bg-yellow-500 hidden sm:flex items-center h-10 rounded-md flex-grow'>
                <input type="text" className='h-full w-6 px-2 flex-grow flex-shrink rounded-l-md border-none outline-none' />
                <SearchIcon className='h-12 p-4'/>
            </div>

            {/* RIGHT */}
            <div className='text-white flex items-center text-xs space-x-6 mx-4 whitespace-nowrap'>
                <div className='links' onClick={!session.data ? signIn : signOut}>
                    <p>
                        {session.data ? `Hello, ${session.data.user.name}` : "Sign In"}
                    </p>
                    <p className='font-extrabold sm:text-sm'>Account & Lists</p>
                </div>
                <div className='links'>
                    <p>Returns</p>
                    <p className='font-extrabold sm:text-sm'>& Orders</p>
                </div>
                <div className='links relative'>
                    <span className='absolute top-0 right-0 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'>
                        {items.length}
                    </span>
                    <ShoppingCartIcon
                        onClick={() => router.push("/checkout")}
                        className='h-10'
                     />
                </div>
            </div>
          </div>

          {/* BOTTOM NAVBAR */}
          <div className='flex items-center bg-[#232F3E] text-white text-sm space-x-3 p-2 pl-6 whitespace-nowrap'>
            <p className='flex items-center links'>
                <MenuIcon className='h-6 mr-1'/>
                All
            </p>
            <p className='links'>Prime Video</p>
            <p className='links'>Amazon Business</p>
            <p className='links'>Today's Deals</p>
            <p className='links hidden lg:inline-flex'>Electronics</p>
            <p className='links hidden lg:inline-flex'>Food & Grocery</p>
            <p className='links hidden lg:inline-flex'>Prime</p>
            <p className='links hidden lg:inline-flex'>Buy Again</p>
            <p className='links hidden lg:inline-flex'>Shopper Toolkit</p>
            <p className='links hidden lg:inline-flex'>Health & Personal Care</p>
          </div>
      </header>
  )
}

export default Header;
