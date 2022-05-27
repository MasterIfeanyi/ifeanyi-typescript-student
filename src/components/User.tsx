import React, {useEffect} from 'react'
import { UserType } from '../types/Student'

type UserComponentProps = {
  item: UserType
}

const User = ({item}: UserComponentProps) => {

  useEffect(() => {
    console.log(item)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const today = new Date(item.student.date)


  return (
    <div className="col-lg-6 mt-3 mb-5">
      <div className="user">
        <div className="row">
          <div className="col-12">
            <div><p><span className="label">FirstName:</span> {item.student.firstName}</p></div>
            <div><p><span className="label">LastName:</span> {item.student.lastName}</p></div>
            <div><p><span className="label">Education:</span> {item.student.education}</p></div>
            <div><p><span className="label">Employment:</span> {item.student.employment}</p></div>
            <div><p><span className="label">School:</span> {item.student.school}</p></div>  
            <div><p><span className="label">Date:</span> {today.toDateString()}</p></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User