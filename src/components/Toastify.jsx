import React from 'react'

export function ToastifySuccess({ message }) {
    return (
        <div className="alert alert-success">
            <span>{message}</span>
        </div>
    )
}


export function ToastifyInfo({ message }) {
    return (
        <div className="alert alert-info">
            <span>{message}</span>
        </div>
    )
}

export function ToastifyError({ message }) {
    return (
        <div className="alert alert-error">
            <span>{message}</span>
        </div>
    )
}