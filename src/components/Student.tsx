import {useEffect, useState} from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import StudentForm from "./StudentForm"
import User from "./User"
import { UserType } from '../types/Student'
import { AxiosError } from "axios";
// import { LocationState } from "../types/LocationState"

const Student = () => {

    const navigate = useNavigate();
    const location = useLocation();

    // this gets where the user came from 
    // const from = (location?.state as LocationState)?.from?.pathname || "/";

    // const [student, setStudent] = useState<StudentFormType>({} as StudentFormType)

    const [backEndData, setBackEndData] = useState<UserType[]>([] as UserType[])

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        // used by axios to cancel request
        const controller = new AbortController();

        const getBioData = async () => {
            try {
                const { data } = await axiosPrivate.get<UserType[]>("/student", {
                    // option to cancel request
                    signal: controller.signal
                })
                console.log(data);
                // set student state when component mounts
                isMounted && setBackEndData(data)
            } catch (error) {
                const err = error as AxiosError;
                if (process.env.NODE_ENV === "production" && err) {
                    console.log(err.message);
                } else {
                    // when refreshToken expires
                    navigate("/login", { state: { from: location }, replace: true });
                }
            }
        }

        getBioData();

        // cleanup function
        return () => {
            // don't set state if component unmounts
            isMounted = false;
            // cancel request if component unmounts
            controller.abort();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <section className="section">
        <div className="container">
            <div className="row">
                <div className="col-12 mt-3">
                    <h3>Welcome</h3>
                </div> 
            </div>

            {
                backEndData?.length ? (
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 intro">
                            <p>Here are your details</p>
                        </div>
                        {backEndData.map((data: UserType, i: number) => <User key={i} item={data} />)}
                    </div>
                ) : (
                    <StudentForm />
                )
            }

        </div>
    </section>
  )
}

export default Student