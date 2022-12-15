import React,{useEffect} from "react";
import { Footer, Navbar } from "../components";
import {useForm} from 'react-hook-form'
import {Form, Button} from 'react-bootstrap'
import {GoSignIn} from 'react-icons/go'
import {useDispatch,useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { userLogin } from "../redux/reducer/userSlice";
import '../styles/Login.css'

const Login = () => {
  const {register,handleSubmit,formState:{errors}}=useForm()
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const onFormSubmit=(userObj)=>{
    //console.log(userObj)
    dispatch(userLogin(userObj))
  }

  const {isuserError,isuserLoading,isuserSuccess,errMsg}=useSelector(state=>state.user)
    
  useEffect(()=>{
      if(isuserSuccess){
          navigate('/')
      }
  },[isuserSuccess])

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className='login'>
          <div className="form">
          <Form onSubmit={handleSubmit(onFormSubmit)}>

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
                      Login <GoSignIn />
                  </Button>
              

              <span className="form__switch">
                  Already have an account? <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>
              </span>
          </Form>
          
          </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
