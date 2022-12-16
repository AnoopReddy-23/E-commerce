import React,{useState} from 'react'
import AdSidebar from '../components/AdSidebar'
import {useForm} from 'react-hook-form'
import {Form, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { Navbar, Footer } from "../components";
import { useSelector } from 'react-redux'

function AdAddProduct() {

  const {register, handleSubmit,formState:{errors}}=useForm();
  const navigate=useNavigate()
  const {userObj}=useSelector(state=>state.user)

  //state for image
  let [img,setImg]=useState(null)

  //on image select
  const onImageSelect=(event)=>{
    setImg(event.target.files[0]);
  }

  //submit the form
  const onFormSubmit=(prodObj)=>{
    //console.log(prodObj)
    let formData=new FormData()
    //append values to it
    formData.append("prodObj", JSON.stringify(prodObj))
    formData.append("image", img)

    axios.post('/add-product',formData,{
        headers: {
          token: "Bearer "+userObj.token
        }
    })
      .then(res=>{
        alert(res.data.message)
        console.log(res.data)
      })
      .catch(err=>console.log(err))
  }

  return (
    <>
    <Navbar />
    <div className="row">
        <div className="col-3">
            <AdSidebar />
        </div>
        <div className="col-8 mx-auto mt-3">
            <h1 className="text-center m-4">ADD ENTRY</h1>
            <Form onSubmit={handleSubmit(onFormSubmit)} className='p-5 m-2 mx-auto' >

                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" autoComplete="title" placeholder="Enter Title" {...register("title",{required:true})} />
                    {errors.title && <p className='text-danger'>*title is required</p>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" autoComplete="desc" placeholder="Enter desc" {...register("description",{required:true})} />
                    {errors.description && <p className='text-danger'>*description is required</p>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" autoComplete="category" placeholder="Enter category" {...register("category",{required:true})} />
                    {errors.category && <p className='text-danger'>*category is required</p>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" autoComplete="price" placeholder="Enter price" {...register("price",{required:true})} />
                    {errors.price && <p className='text-danger'>*price is required</p>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type="number" autoComplete="stock" placeholder="Enter stock" {...register("stock",{required:true})} />
                    {errors.stock && <p className='text-danger'>*stock is required</p>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Rating Count</Form.Label>
                    <Form.Control type="number" autoComplete="count" placeholder="Enter count" {...register("count",{required:true})} />
                    {errors.count && <p className='text-danger'>*count is required</p>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control type="number" autoComplete="rate" placeholder="Enter rating" {...register("rate",{required:true})} />
                    {errors.rate && <p className='text-danger'>*rate is required</p>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Select Profile Pic</Form.Label>
                    <Form.Control 
                    type="file" 
                    {...register("image",{required:true})} 
                    onChange={(event)=>onImageSelect(event)}
                    />
                    {errors.image && <p className='text-danger'>*pic is required</p>}
                </Form.Group>
                
                {/* submit button */}
                <Button variant="primary" type="submit">
                    ADD ENTRY
                </Button>

            </Form>
        </div>
    </div>
    <Footer />
</>
  )
}

export default AdAddProduct