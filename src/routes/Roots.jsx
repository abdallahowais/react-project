import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

export default function Roots() {
    return (
       <>
        <Navbar/>

        <div className='container'>
       <Outlet/>
       </div>
       <Footer/>

       </>
    );
}

