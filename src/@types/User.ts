export type CreateUser= {
    id?:string
    password: string
    firstname: string
    lastname:string
    username: string
    birthdate: string
    pfp?: string
    email: string
}

export type UserAuthentified = {
    id: string
    firstname: string
    lastname:string
    username: string
    birthdate: string
    pfp?: string
    email: string
}

export type SimplifiedUser = {
    id: string
    username: string
    pfp?: string
}
