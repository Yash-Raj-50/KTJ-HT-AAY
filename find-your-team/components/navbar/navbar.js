import React from 'react'
import dashboard from "../../pages/dashboard"
import Link from 'next/link'
const navbar = () => {
  return (
    <>
    <nav class="navbar navbar-expand-lg bg-body-tertiary my_navbar">
    <div class="container-fluid">
    <div>
      <i class="bi bi-laptop"></i>
    </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        {/* <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li> */}
        <li class="nav-item">
          <Link href={"/"} className="nav-link">
            Home
          </Link>
        </li>
        <li class="nav-item">
          <Link href={"/dashboard"} className="nav-link">
            Dashboard
          </Link>
        </li>
      </ul>
    </div>
    <Link href={"/login"} className="nav-link">
    <button class="btn btn-outline-primary" type="submit">Login</button>
    </Link>
    <Link href={"/register"} className="nav-link">
    <button class="btn btn-outline-danger" type="submit">Register</button>
    </Link>
    </div>
    </nav>
    </>
  )
}

export default navbar