import React from 'react';

import Navbar from './Navbar';

export default function Home() {
    return(
        <div data-testid='home-1'>
            <Navbar />
            <div>
                <div className='text-center mt-[20px]'>
                    <h1 className='text-3xl sm:text-3xl md:text-5xl lg:text-8xl'>Home</h1>
                    <p className='mt-[50px]'>
                        <span className='text-l sm:text-xl md:text-2xl lg:text-3xl'>Maths Worksheet Generator</span>
                        <br/>
                        <span className=''>
                        This website provides a maths worksheet generator that is leveraged with AI.
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}