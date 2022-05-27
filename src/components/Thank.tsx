import React from 'react'
import { useNavigate } from "react-router-dom"

const Thank = () => {

    const navigate = useNavigate();

    const goBack = () => navigate(-1);

  return (
    <section className="section">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Thank You</h1>
                    <div>
                        <button className="btn btn-primary logOut" onClick={goBack}>Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Thank