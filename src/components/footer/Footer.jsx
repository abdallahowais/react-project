import React from 'react';
import style from './footer.module.css'

export default function Footer() {
    return (
        <>
        <div className={`position-static-bottom  ${style.footerContaner}`}>
                <h6 className={style.para}>All rights reserved to Haven Style Electronic Marketing Company © 2024</h6>
                <img src="title.PNG" alt="" />
        </div>
        </>
    );
}

