import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Gif from "../public/annimation.gif"
const register = () => {
  return (
    <div className="container page-box">
      <div className="row loginForm">
        <div className="col">
          <Image id="real" src={Gif} alt="animation here"/>
        </div>
        <div className="col-6">
          <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Name</label>
              <input type="text" class="form-control" id="Inputname" aria-describedby="nameHelp" />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Phone No.</label>
              <input type="integer" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" />
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">Remember me</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <div class="my-4">
              If Already Registered ?<Link href={"/login"} class="my-link"> Login</Link> here.
            </div>
          </form>
        </div>
        <div className="col"></div>
      </div>
    </div>
  )
}

export default register