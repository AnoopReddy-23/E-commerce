import React, { useEffect, useState } from 'react'
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import {Form, Button} from 'react-bootstrap'
import {GoSignIn} from 'react-icons/go'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import '../styles/Register.css'

const Register = () => {

    const {register,handleSubmit,formState:{errors}}=useForm()
    const navigate=useNavigate()

    const onFormSubmit=async (userObj)=>{
        //console.log(userObj)
        let response=await axios.post('/register',userObj)
        let data=response.data
        //if login successful
        if(data.message==="User Registered successfully"){
            navigate('/login')
        }
        //if login is not successful
        if(data.message==="User with email already exist." ){
            console.log(data.message)
        }
        else{
            console.log(data.message)
        }
    }

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3 register">
                <h1 className="text-center">Register</h1>
                <hr />
                <div className='register'>
                    <div className="form">
                    
                    <Form onSubmit={handleSubmit(onFormSubmit)}>
                        <Form.Group className="form__input">
                            <i className="ri-user-line"></i>
                            <Form.Control className='input' type="text" placeholder="Enter username" {...register('username',{required:true})} />
                            {/* validation error message for username */}
                            {errors.username && <p className='text-danger'>*Username is required</p>}
                            <span className="bar"></span>
                        </Form.Group>

                        <Form.Group className="form__input">
                            <i className="ri-mail-line"></i>
                            <Form.Control className='input' type="email" placeholder="Enter mail" {...register('email',{required:true})} />
                            {/* validation error message for username */}
                            {errors.email && <p className='text-danger'>*Email is required</p>}
                            <span className="bar"></span>
                        </Form.Group>

                        <Form.Group className="form__input">
                            <i className="ri-lock-line"></i>
                            <Form.Control className='input' autoComplete="" type="password" placeholder="Enter password" {...register('password',{required:true})} />
                            {/* validation error message for username */}
                            {errors.password && <p className='text-danger'>*Password is required</p>}
                            <span className="bar"></span>
                        </Form.Group>

                        
                            <Button type="submit" className='m-3 p-3'>
                                Regsiter <GoSignIn />
                            </Button>
                        

                        <span className="form__switch">
                            Already have an account? <a href="/login">Login</a>
                        </span>
                    </Form>
                    
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register