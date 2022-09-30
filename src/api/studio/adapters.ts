import { IStudio, ServerStudio } from './types'

export const adaptServerStudio = (serverStudio: ServerStudio): IStudio => {
    return {
        id: serverStudio._id,
        name: serverStudio.name,
        owner: serverStudio.owner,
        users: serverStudio.users,
        adminToken: serverStudio.adminToken,
        userToken: serverStudio.userToken,
        createdAt: serverStudio.createdAt,
        updatedAt: serverStudio.updatedAt,
    }
}

export const adaptServerStudios = (serverStudios: ServerStudio[]): IStudio[] => serverStudios.map(adaptServerStudio)
