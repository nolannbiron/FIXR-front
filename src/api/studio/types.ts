import { IUser } from '../../contexts/UserContext'

export interface IStudio {
    id: string
    name: string
    owner: string | IUser
    users: string[] | IUser[]
    adminToken: string
    userToken: string
    createdAt: string
    updatedAt: string
}

export interface ServerStudio {
    id: string
    name: string
    owner: string | IUser
    users: string[] | IUser[]
    adminToken: string
    userToken: string
    createdAt: string
    updatedAt: string
}
