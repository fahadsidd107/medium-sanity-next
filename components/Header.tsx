import Link from 'next/link'
import React from 'react'

function Header() {
    return (
        <div>
            <div>
                <Link href='/'>
                    <img className='w-44 object-contain cursor-pointer' src='https://links.papareact.com/yvf' />
                </Link>
                <div className='hidden md:inline-flex'>
                    <h3>About</h3>
                    <h3>Contact</h3>
                    <h3>Follow</h3>
                </div>
            </div>

            <div></div>
        </div>
    )
}

export default Header