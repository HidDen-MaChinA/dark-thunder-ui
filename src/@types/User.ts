export type CreateUser= {
    password: string
} & UserAuthentified

export type UserAuthentified = {
    id?: string
    firstname: string
    lastname:string
    username: string
    birthdate: string
    pfp?: string
    email: string
}