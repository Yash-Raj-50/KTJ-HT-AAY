import React from 'react'
import dashboard from "../../pages/dashboard"
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/logo.gif'
const navbar = () => {
  return (
    <>
    <nav class="navbar navbar-expand-lg bg-body-tertiary my_navbar">
    <div class="container-fluid">
    <div class="logo">
    <Image id="real" className='logo-image' src={logo} alt="animation here" />
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
    <div>
      <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Current User
  </button>
  <ul class="dropdown-menu dropdown-menu-dark">
    <li><Link class="dropdown-item" href={"/"}>User 1</Link></li>
    <li><Link class="dropdown-item" href={"/"}>User 2</Link></li>
    <li><Link class="dropdown-item" href={"/"}>User 3</Link></li>
    <li><hr class="dropdown-divider"/></li>
    <li><Link class="dropdown-item" href={"/login"} style={{color: "red"}}>Logout</Link></li>
  </ul>
</div>
    </div>
    <Link href={"/register"} className="nav-link">
    <button class="btn btn-outline-primary" type="submit">Register</button>
    </Link>
    </div>
    </nav>
    </>
  )
}

export default navbar