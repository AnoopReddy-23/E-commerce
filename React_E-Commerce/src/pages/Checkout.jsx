import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {Form,Button} from 'react-bootstrap'

const Checkout = () => {
  const {products,quantity,total} = useSelector((state) => state.cart);
  const {isuserSuccess}=useSelector(state=>state.user)
  const {register,handleSubmit,formState:{errors}}=useForm()
  const navigate=useNavigate()

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {
    let shipping = 30.0;
    let totalItems = 0;

    products.map((item) => {
      return (totalItems += item.qty);
    });

    const onFormSubmit=(addressObj)=>{
      //console.log(addressObj)
      addressObj.shipping_cost=shipping
      navigate('/payment',{state:{addressObj}})
      //dispatch(userLogin(userObj))
    }

    return (
      <>
        <div className="container py-5">
          <div className="row my-4">
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products ({totalItems})<span>${Math.round(total)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>${shipping}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>${Math.round(total + shipping)}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">Billing address</h4>
                </div>
                <div className="card-body">
                  <Form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="row g-3 mt-3">
                      <div className="col-sm-6 my-1">
              
                        <Form.Group className="form__input mb-2">
                            <Form.Control className='input' type="text" placeholder="Enter first name" {...register('firstName',{required:true})} />
                            {/* validation error message for username */}
                            {errors.firstName && <p className='text-danger'>*firstName is required</p>}
                        </Form.Group>
                      </div>

                      <div className="col-sm-6 my-1">
                        <Form.Group className="form__input mb-2">
                            <Form.Control className='input' type="text" placeholder="Enter last name" {...register('lastName',{required:true})} />
                            {/* validation error message for username */}
                            {errors.lastName && <p className='text-danger'>*lastName is required</p>}
                        </Form.Group>
                      </div>

                      <div className="col-12 my-1">
                        <Form.Group className="form__input mb-2">
                            <Form.Control className='input' type="email" placeholder="Enter email" {...register('email',{required:true})} />
                            {/* validation error message for username */}
                            {errors.email && <p className='text-danger'>*Email is required</p>}
                        </Form.Group>
                      </div>

                      <div className="col-12 my-1">
                        <Form.Group className="form__input mb-2">
                            <Form.Control className='input' type="text" placeholder="Enter address" {...register('address',{required:true})} />
                            {/* validation error message for username */}
                            {errors.address && <p className='text-danger'>*Address is required</p>}
                        </Form.Group>
                      </div>

                      <div className="col-md-5 my-1">
                        <label htmlFor="">State</label>
                        <Form.Select  {...register('state',{required:true})}>
                          <option value="Telangana">Telangana</option>
                          <option value="AndhraPradesh">Andhra Pradesh</option>
                        </Form.Select>
                        {errors.state && <p className='text-danger'>*Address is required</p>}
                      </div>

                      <div className="col-md-4 my-1">
                        <label htmlFor="">Country</label>
                        <Form.Select  {...register('country',{required:true})}>
                          <option value="India">India</option>
                        </Form.Select>
                        {errors.country && <p className='text-danger'>*country is required</p>}
                      </div>

                      <div className="col-md-3 my-1">
                        <label htmlFor="">Zip Code</label>
                        <Form.Group className="form__input">
                            <Form.Control className='input' type="text" placeholder="Enter zip" {...register('zip',{required:true})} />
                            {/* validation error message for username */}
                            {errors.zip && <p className='text-danger'>*Zip is required</p>}
                        </Form.Group>
                      </div>
                    </div>

                    <hr className="my-4" />

                    <Button type="submit" className='m-3 p-3'>
                      COntinue to Checkout
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Login = () => {
    return (
        <div className="container">
        <div className="row">
            <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Please login to checkout</h4>
            <Link to="/login" className="btn  btn-outline-dark mx-4">
                <i className="fa fa-arrow-left"></i> Login
            </Link>
            </div>
        </div>
        </div>
    );
    };

    
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {
                isuserSuccess===false 
                ? <Login />
                : 
                  (quantity 
                    ? <ShowCheckout /> 
                    : <EmptyCart />
                  )
        }
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
