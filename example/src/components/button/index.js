import React from 'react';
import styles from './styles.css';
import classNames from 'classnames';

export default function Badge ({ type = 'primary' }) {
    return (
        <button className={ classNames({
            [styles['button']]: true,
            [styles[`button--${type}`]]: true
        }) }>
            click me
        </button>
    );
}
