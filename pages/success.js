import React from 'react';
import Header from '../components/Header';
import {CheckCircleIcon} from "@heroicons/react/solid"
import { useRouter } from 'next/router';

function success() {
    const router = useRouter()
  return(
      <div className='bg-gray-100 h-screen'>
          <Header />

          <main className='max-w-screen-lg mx-auto'>
            <div className='flex flex-col p-10 bg-white'>
                <div className='flex items-center space-x-2 mb-5 mt-2'>
                    <CheckCircleIcon className='text-green-500 h-10'/>
                    <h1 className='text-3xl'>Thank you, your order has been confirmed!</h1>
                </div>
                <div>
                    <p>
                        Thank you for shopping with us. We'll send a confirmation once your item has 
                        shipped, if you would like to check the status of your order(s) please press the link below.
                    </p>
                    <button onClick={() => router.push("/orders")} className='mt-8 p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-400 border border-yellow-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 active:from-yellow-500 w-full'>
                        Go to my orders
                    </button>
                </div>
            </div>
          </main>
      </div>
  );
}

export default success;
