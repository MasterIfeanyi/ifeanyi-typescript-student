import React, {useState} from 'react'
import { StudentFormType, UserType } from "../types/Student"
import { useNavigate } from "react-router-dom"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {AxiosError} from "axios"

const StudentForm = () => {

    const navigate = useNavigate();

    const axiosPrivate = useAxiosPrivate();

    const [firstName, setFirstName] = useState<string>("")

    const [lastName, setLastName] = useState<string>("")

    const [education, setEducation] = useState<string>("")

    const [employment, setEmployment] = useState<string>("")

    const [school, setSchool] = useState<string>("")

    const [date, setDate] = useState<string>("")

    const saveEducation = (data: string): void => {
        if (data !== "Education") {
            setEducation(data)
        }
    }

    const saveEmployment = (data: string): void => {
        if (data !== "Employment type") {
            console.log("here")
            setEmployment(data)
        }
    }


    const formData: StudentFormType = {
        firstName,
        lastName,
        education,
        employment,
        school,
        date
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!formData.firstName) return
        console.log(formData);
        try {
            const { data } = await axiosPrivate.post<UserType[]>("/student", {"student": formData})
            console.log(data);
            setFirstName("");
            setLastName("");
            setEducation("");
            setEmployment("");
            setSchool("");
            setDate("");
            navigate("/thank")
        } catch (error) {
            const err = error as AxiosError
            console.log(err.message)
        }
    }


  return (
    <>
        <div className="row">
            <div className="col-12 my-3">
                <h5 className="intro">You have not submitted your details</h5>
                <small className="lead">You do not have to submit your real details, please keep your data private.</small>
            </div>
        </div>
            
        <div className="row d-flex justify-content-center">
            <div className="col-lg-9 mb-2">
                <form className="row d-flex justify-content-center" onSubmit={handleSubmit}>
                    <div className="form-group col-md-5">
                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="enter first name"
                            id=""
                            type="text"
                            className="form-control"
                            required
                        />
                    </div>                    
                    <div className="form-group col-md-5">
                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="enter last name"
                            id=""
                            type="text"
                            className="form-control"
                            required
                        />
                    </div>                    
                    <div className="form-group col-md-10">
                        <input
                            onChange={(e) => setDate(e.target.value)}
                            placeholder=""
                            id=""
                            type="date"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group col-md-10">
                        <select name="" id="" className='form-control' onChange={(e) => saveEducation(e.target.value)}>
                            <option value="Education">Education</option>
                            <option value="BSC Bachelors">BSC Bachelors</option>
                            <option value="MSC Masters">MSC Masters</option>
                            <option value="PHD Doctor of Philosophy">PHD Doctor of Philosophy</option>
                        </select>
                    </div>                   
                    <div className="form-group col-md-10">
                        <input
                            value={school}
                            onChange={(e) => setSchool(e.target.value)}
                            placeholder="enter school"
                            id=""
                            type="text"
                            className="form-control"
                            required
                        />
                    </div>                    
                    <div className="form-group col-md-10">
                        <select name="" id="" className='form-control' onChange={(e) => saveEmployment(e.target.value)}>
                            <option value="Employment type">Employment type</option>
                            <option value="Front-end Developer">Front-end Developer</option>
                            <option value="Back-end Developer">Back-end Developer</option>
                            <option value="UI/UX Designer">UI/UX Designer</option>
                        </select>
                    </div>                    
                    <div>
                        <button className="btn btn-primary">
                            submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default StudentForm