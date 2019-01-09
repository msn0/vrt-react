import React from 'react';
import styles from './styles.css';

export default function Badge ({ num = 0 }) {
    return (
        <div className={ styles.badge }>
            <span className={ styles.num }>
                { num > 0 ? num : 'no' }
            </span>
            <span className={ styles.text }>
                new message{ num !== 1 ? 's' : ''}
            </span>
        </div>
    );
}
