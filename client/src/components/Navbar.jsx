import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { clearLoginStatus } from '../redux/reducer/userSlice'
import { useDispatch } from 'react-redux'

const Navbar = () => {
    const {quantity}=useSelector(state => state.cart)
    const {userObj,isuserSuccess}=useSelector(state=>state.user)

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const logout=()=>{
        dispatch(clearLoginStatus())
        //navigate('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/"> React Ecommerce</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        {
                            userObj.isAdmin
                                ?
                                   <>  
                                    <li className="nav-item">
                                            <NavLink className="nav-link" to="/admin">Dashboard</NavLink>
                                        </li>
                                   </> 
                                :
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/about">About</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                                        </li>
                                    </>
                        }
                    </ul>
                    <div className="buttons text-center">
                        <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart ({quantity}) </NavLink>
                        {
                            !isuserSuccess 
                            && 
                            <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                        }
                        {
                            isuserSuccess 
                            &&
                            <NavLink onClick={()=>logout()} className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Logout</NavLink>
                        }
                    </div>
                </div>


            </div>
        </nav>
    )
}

export default Navbar