import React from 'react'
import { useDispatch } from 'react-redux'
import authentication from '../../auth/auth'
import { logout } from '../../store/AuthSlice'
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router';

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const Handlogout = () => {
        authentication.logout().then(() => {
            dispatch(logout())
            navigate("/login")
        }).catch(() => {
            console.log("user Not log out from Logout BTN")
        })
    }
    return (
        <MDBBtn
            className='me-1 shadow-0'
            color='danger'
            onClick={Handlogout}>
            Log out
        </MDBBtn>
    )
}

export default LogoutBtn
