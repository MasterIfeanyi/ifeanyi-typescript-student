export type Student = {
    name: String
    age: String
    sex: String
}

export type StudentFormType = {
    id?: string
    firstName: String
    lastName: String
    education: String
    employment: String
    school: String
    date: string
}

export type UserType = {
    student: StudentFormType
}

