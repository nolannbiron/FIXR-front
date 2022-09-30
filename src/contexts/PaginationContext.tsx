import { createContext, ReactNode, useContext, useReducer } from 'react'
import { PaginationState } from '@tanstack/react-table'

export type Action = { type: 'update'; payload: Partial<PaginationState> }

const UserContext = createContext<{ state: PaginationState; dispatch: React.Dispatch<Action> } | undefined>(undefined)

function paginationReducer(state: PaginationState, action: Action): PaginationState {
    switch (action.type) {
        case 'update': {
            return { ...state, ...action.payload }
        }
        default: {
            return state
        }
    }
}

interface ProviderProps {
    children: ReactNode
}
function PaginationProvider({ children }: ProviderProps) {
    const [state, dispatch] = useReducer(paginationReducer, { pageIndex: 0, pageSize: 10 } as PaginationState)

    const value = { state, dispatch }
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

function usePagination() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}

export { PaginationProvider, usePagination }
