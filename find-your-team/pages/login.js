import React from 'react'
import Link from 'next/link'

const login = () => {
  return (
    <div className="container page-box">
        <div className="row loginForm">
            <div className="col"></div>
            <div className="col-6">
            <div>
                <h3>Login User</h3>
            </div>
            <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Name</label>
              <input type="text" class="form-control" id="Inputname" aria-describedby="nameHelp" />
            </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                    <label class="form-check-label" for="exampleCheck1">Remember me</label>
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
                <div class="my-4">
                    First time here? <Link href={"/register"} class="my-link"> Register</Link> here.
                </div>
                </form>
            </div>
            <div className="col"></div>
        </div>
    </div>
  )
}

export default login