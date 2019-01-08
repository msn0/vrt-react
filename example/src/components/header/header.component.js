import React from 'react';
import styles from './header.css';

export default function Header() {
    return (
        <h1>
            Lorem ipsum!
            <a href="#" className={ styles['more-link'] }>tell me more</a>
        </h1>
    );
}
