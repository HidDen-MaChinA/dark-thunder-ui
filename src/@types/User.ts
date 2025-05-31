export type CreateUser= {
    id?:string
    password: string
    firstname: string
    lastname:string
    username: string
    birthdate: string
    pfp?: File | null
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
    daily_discussions_token:string
}

export type UserFriend= {
    id: string
    firstname: string
    lastname:string
    username: string
    birthdate: string
    pfp?: string
    email: string
    friendship_id: string
}

export type SimplifiedUserFriend = {
    id: string
    username: string
    pfp?: string
    friendship_id: string
}

export type SimplifiedUser = {
    id: string
    username: string
    pfp?: string
}
