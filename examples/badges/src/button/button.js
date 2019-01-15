import React from 'react';
import classNames from 'classnames';
import styles from './styles.css';
import Badge from '../badge-with-props';

export default function Button ({ type = 'primary', text }) {
    return (
        <button className={ classNames({
            [styles['button']]: true,
            [styles[`button--${type}`]]: true
        }) }>
            { type === 'badge' &&
                <div className={ styles['badge-wrapper'] }>
                    <Badge num={ 7 } />
                </div>
            }
            { text }
        </button>
    );
}
