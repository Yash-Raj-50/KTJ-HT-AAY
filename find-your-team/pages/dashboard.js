import React from 'react'

const Dashboard = () => {
  return (
    <div className='container page-box'>
      <div className="team-requests">
        <div class="card team-item">
          <div class="card-header items-space-between">
            <div>Alok kumar</div>
            <div><button type="button" class="btn btn-outline-success mx-1"><i class="bi bi-check-lg"></i></button><button type="button" class="btn btn-outline-danger"><i class="bi bi-x-lg"></i></button></div>
          </div>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          </div>
        </div>
        <div class="card team-item">
          <div class="card-header items-space-between">
            <div>Aniket kumar</div>
            <div><button type="button" class="btn btn-outline-success mx-1"><i class="bi bi-check-lg"></i></button><button type="button" class="btn btn-outline-danger"><i class="bi bi-x-lg"></i></button></div>
          </div>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          </div>
        </div>
        <div class="card team-item">
          <div class="card-header items-space-between">
            <div>Ritik Raj</div>
            <div><button type="button" class="btn btn-outline-success mx-1"><i class="bi bi-check-lg"></i></button><button type="button" class="btn btn-outline-danger"><i class="bi bi-x-lg"></i></button></div>
          </div>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          </div>
        </div>
      </div>
      
      <div className="new-contest">
        <h4>Create a new team</h4>
        <div class="mb-3">
          <label for="event name" class="form-label">Event Name</label>
          <input type="text" class="form-control" id="event name" placeholder="hackathon" />
        </div>
        <div class="mb-3">
          <label for="Description" class="form-label">Description</label>
          <textarea class="form-control" id="Description" rows="3"></textarea>
        </div>
        <label class="form-label" for="typeNumber">Total participants</label>
        <div className="mb-3 items-space-between">
          <input style={{ width: "100px" }} type="number" id="typeNumber" class="form-control" />
          <button type="submit" class="btn btn-primary"><i class="bi bi-plus-lg m-2"></i>Create</button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard