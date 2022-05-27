import { useState, useEffect, useRef } from 'react'
import axios from "../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom"
import useAuth from '../hooks/useAuth';
import { LocationState } from "../types/LocationState"
import { FaTimes, FaCheck, FaInfoCircle } from "react-icons/fa";
import TypescriptNote from './TypescriptNote';

// import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { AxiosError } from "axios";

const Register = () => {

    const navigate = useNavigate();
    const location = useLocation();

    // this gets where the user came from 
    const from = (location?.state as LocationState)?.from?.pathname || "/";

    // global auth state
    const { setAuth } = useAuth();

    // username and password state
    const [user, setUser] = useState<string>("");

    const [pwd, setPwd] = useState<string>("");

    // error message state
    const [errMsg, setErrMsg] = useState<string>("");

    // typin useRef hook
    const userRef = useRef<HTMLInputElement>(null);


    const REGISTER_URL = "/register"



    // confirm password state
    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    // when component mounts, set focus on username input fields
    useEffect(() => {
        userRef.current?.focus();
    }, []);

    // check if both password matches
    useEffect(() => {
        console.log(pwd);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])



    // clear error message when user or password field changes
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(REGISTER_URL, JSON.stringify({ user, pwd }),
                {
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
            if (err.isAxiosError) {
                // console.log(err.response?.data)
                if (!err?.response) {
                    setErrMsg("No Server Response");
                } else if (err.response?.status === 400) {
                    setErrMsg("Missing Username or Password");
                } else if (err.response?.status === 401) {
                    setErrMsg("Unauthorized");
                } else {
                    setErrMsg("Registration Failed");
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
                    <h3>Register</h3>
                    <p className="lead mt-3">
                    Please Register to use the application
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
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                ref={userRef}
                                autoComplete="off"
                                placeholder=""
                                id="username"
                            />
                        </div>
                        <div className="col-12 form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                placeholder=''
                                className="form-control"
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)}
                                id="password"
                                autoComplete='off'
                            />
                          </div>
                          <div className="form-group col-12">
                              <label htmlFor="confirm_pwd">Confirm Password
                                  <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                      <FaCheck />
                                  </span>
                                  <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                      <FaTimes />
                                  </span>
                              </label>
                              <input
                                  value={matchPwd}
                                  onChange={(e) => setMatchPwd(e.target.value)}
                                  type="password"
                                  id="confirm_pwd"
                                  placeholder=''
                                  className="form-control"
                                  autoComplete='off'
                                  required
                                  aria-invalid={validMatch ? "false" : "true"}
                                  aria-describedby="confirmnote"
                                  onFocus={() => setMatchFocus(true)}
                                  onBlur={() => setMatchFocus(false)}
                              />
                              <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                  <FaInfoCircle />
                                  Must match the first password input field.
                              </p>
                          </div>
                          <div className=''>
                              <button disabled={!validMatch ? true : false} className="btn btn-primary">Submit</button>
                          </div>
                    </form>
                </div>
            </div>

            <div className="row">
                <div className="col-12 intro">
                    <div className="d-sm-flex justify-content-center align-items-center text-center lead">
                        <small className='me-4'>Already have an account ?</small>
                        <Link to="/login">
                            <button className="btn btn-primary">Login</button>
                        </Link>
                    </div>
                </div>
            </div>
              
        </div>
    </section>
  )
}

export default Register