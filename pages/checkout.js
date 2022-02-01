import React from 'react';
import Header from '../components/Header';
import Image from "next/image"
import { useSelector } from 'react-redux';
import CheckOutProduct from '../components/CheckOutProduct';
import Currency from "react-currency-formatter";
import { useSession } from 'next-auth/react';
import { selectTotal } from '../redux/basketSlice';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.stripe_public_key);
import axios from 'axios';

function checkout() {
    const session = useSession()
    const items = useSelector((state) => state.basket.items)
    const total = useSelector(selectTotal)

    const createCheckOutSession = async () => {
        console.log("Checkout has been clicked");
        const stripe = await stripePromise;

        const checkOutSection = await axios.post("/api/create-checkout-session", {
            items: items,
            email: session.data.user.email
        })

        const result = await stripe.redirectToCheckout({
            sessionId: checkOutSection.data.id
        })

        if (result.error) alert(result.error.message)
    }

    return (
        <div className='bg-gray-100'>
            <Header />

            <main className='lg:flex max-w-screen-2xl mx-auto'>
                <div className='flex-grow m-5 shadow-sm'>
                    <Image src="https://links.papareact.com/ikj" width={1020} height={250} objectFit="contain" />

                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>
                            {items.length === 0 ? "Your Amazon Basket is empty" : "Shopping Basket"}
                        </h1>

                        {items.map((item, i) => (
                            <CheckOutProduct
                                key={i}
                                id={item.id}
                                title={item.title}
                                rating={item.rating}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                hasPrime={item.hasPrime}
                            />
                        ))}
                    </div>
                </div>

                <div className='flex flex-col bg-white p-10 shadow-md'>
                    {items.length > 0 && (
                        <div>
                            <h2 className='whitespace-nowrap'>Subtotal ({items.length} items):
                                <span>
                                    <Currency quantity={total} currency="EUR" />
                                </span>
                            </h2>

                            <button onClick={createCheckOutSession} role="link" disabled={!session.data}
                                className={!session.data ? `p-2 text-xs md:text-sm bg-gradient-to-b from-gray-300 to-gray-500 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 active:from-yellow-500 mt-2 text-gray-50 w-full` : "mt-2 p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-400 border border-yellow-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 active:from-yellow-500 w-full"}>
                                {!session.data ? "Sign In to checkout" : "Proceed to checkout"}
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default checkout;
