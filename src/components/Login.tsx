import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import useAuth from '../hooks/useAuth';
import { LocationState } from "../types/LocationState";
import TypescriptNote from './TypescriptNote';


import { AxiosError } from "axios";

const Login = () => {


    const navigate = useNavigate();
    const location = useLocation();
    
    // this gets where the user came from 
    const from = (location?.state as LocationState)?.from?.pathname || "/";

    const { setAuth } = useAuth();

    // username and password state
    const [user, setUser] = useState<string>("");

    const [pwd, setPwd] = useState<string>("");

    // error message state
    const [errMsg, setErrMsg] = useState<string>("");

    // typing useRef hook
    const userRef = useRef<HTMLInputElement>(null)

    const LOGIN_URL = "/login"

    // when component mounts, set focus on username input fields
    useEffect(() => {
        userRef.current?.focus();
    }, [])

    // clear error message when user or password field changes
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            const accessToken = data?.accessToken;

            // save response into global auth state
            setAuth({ user, pwd, accessToken })
            console.log(data)
            setUser("");
            setPwd("");
            navigate(from, { replace: true })
        } catch (error) {
            const err = error as AxiosError
            if (err.isAxiosError && err.response) {
                // console.log(err.response?.data)
                if (!err?.response) {
                    setErrMsg("No Server Response");
                } else if (err.response?.status === 400) {
                    setErrMsg("Missing Username or Password");
                } else if (err.response?.status === 401) {
                    setErrMsg("Unauthorized");
                } else {
                    setErrMsg("Login Failed");
                } 
            } 
        }
    } 


  return (
    <section className="section">
        <div className="container">

            <TypescriptNote />
              
            <div className="row mt-1">
                <div className="col-12 intro">
                    <h3>Login</h3>
                    <p className="lead mt-3">
                    Please login to access the application
                    </p>
                </div>
            </div>

            <div className="row d-flex justify-content-center">
                  <div className="col-lg-7">
                    <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                    <form action="" className="row" onSubmit={handleSubmit}>
                        <div className="form-group col-12">
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder=""
                                value={user}
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                id="username"
                            />
                        </div>
                        <div className="form-group col-12">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                placeholder=""
                                id="password"
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)}
                                className="form-control" 
                                autoComplete='off'
                            />
                        </div>
                        <div className="">
                            <button className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>


            <div className="row">
                <div className="col-12 intro">
                    <div className="d-sm-flex justify-content-center lead mt-2 align-items-center text-center">
                        <small className='me-4'>Don't have an account ?</small>
                        <Link to="/register">
                            <button className="btn btn-primary">Register</button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    </section>
  )
}

export default Login