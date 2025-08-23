import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'


export default function Protect({ children, authentication = true }) {

    const [loader, setLoader] = useState(true)
    const navigat = useNavigate()
    const authstatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authentication !== authstatus) {
            if (authentication) {
                navigat("/login")
            } else {
                navigat("/")
            }
        } else {
            setLoader(false)
        }
    }, [authentication, navigat, authstatus])

    return loader ? <h1>Loading...</h1> : children
}


