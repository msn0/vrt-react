import React from 'react';
import styles from './styles.css';

export default function Badge({ message }) {
    return (
        <div className={ styles.wrapper }>
            { message } new
        </div>
    );
}
