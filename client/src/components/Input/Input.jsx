import React from 'react'
import styles from './Input.module.css';

const Input = ({ name, onChange,  value, placeholder, type = 'text', required = true, disabled = false }) => {
    return (
        <div className = {styles.root}>
            <input onChange = {onChange} value = {value} name = {name} placeholder = {placeholder} required = {required} type = {type} />
        </div>
    )
}

export default Input
