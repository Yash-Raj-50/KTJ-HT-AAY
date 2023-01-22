import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Gif from "../public/annimation.gif"
import { useState } from 'react'
const register = () => {

  const [name, setName] = useState('')
  const [phone, setPhone] = useState(0)
  const [email, setEmail] = useState('')

  async function registerUser(){
    const response = await fetch('', {
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        name,
        phone,
        email,
      })
    })
    const data = await response.json()
    console.log(data);
  }

  return (
    <div className="container page-box">
      <div className="row loginForm">
        <div className="col-6">
          <Image id="real" src={Gif} alt="animation here" />
        </div>
        <div className="col-6">
          <form onSubmit={registerUser}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Name</label>
              <input value={name} onChange={
                (event) => {
                  setName(event.target.value);
                }
              } type="text" class="form-control" id="Inputname" aria-describedby="nameHelp" />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" value={phone} onChange={
                (event) => {
                  setPhone(event.target.value);
                }
              } class="form-label">Phone No.</label>
              <input type="integer" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input value={email} onChange={
                (event) => {
                  setEmail(event.target.value);
                }
              } type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">Remember me</label>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
            <div class="my-4">
              If Already Registered ?<Link href={"/login"} class="my-link"> Login</Link> here.
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default register