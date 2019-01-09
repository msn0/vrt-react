import React from 'react';
import styles from './styles.css';

export default function Badge ({ num = 0 }) {
    return (
        <div className={ styles.badge }>
            { num > 0 ? num : 'no' } new messages
        </div>
    );
}
