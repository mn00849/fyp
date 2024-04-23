import React from 'react';
import Navbar from './Navbar';

export default function NoPage() {
    return(
        <div>
            <Navbar />
            <div className='mt-[20px]'>
                <h1 className='text-center'>Error 404</h1>
                <p className='text-center'>No page found.</p>
            </div>
        </div>
    );
}