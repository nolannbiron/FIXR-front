import { createContext, ReactNode, useContext, useReducer } from 'react'

const eventTypes = ['click', 'blur'] as const
type EventType = typeof eventTypes[number]

export interface EventCapture {
    isActive: boolean
}

export type Action = { type: 'update'; payload: Pick<EventCapture, 'isActive'> }

const defaultValue: EventCapture = {
    isActive: false,
}

const EventCaptureContext = createContext<{ state: EventCapture; dispatch: React.Dispatch<Action> } | undefined>(
    undefined
)

function eventCaptureReducer(state: EventCapture, action: Action): EventCapture {
    switch (action.type) {
        case 'update': {
            return { ...state, ...action.payload }
        }
        default: {
            return state
        }
    }
}

interface BaseProviderProps {
    children: ReactNode
    callback?: (eventType: EventType) => void
}
type ProviderProps = BaseProviderProps & {
    [key in EventType]?: boolean
}
function EventCaptureProvider({ click, blur, callback, children }: ProviderProps) {
    const [state, dispatch] = useReducer(eventCaptureReducer, { ...defaultValue })

    const handleClickCapture = (e: React.MouseEvent) => {
        if (!state.isActive || !click) return
        e.stopPropagation()
        !!callback && callback('click')
    }
    const handleBlurCapture = (e: React.FocusEvent) => {
        if (!state.isActive || !blur) return
        e.stopPropagation()
        !!callback && callback('blur')
    }

    const value = { state, dispatch }
    return (
        <EventCaptureContext.Provider value={value}>
            <div onClickCapture={handleClickCapture} onBlurCapture={handleBlurCapture}>
                {children}
            </div>
        </EventCaptureContext.Provider>
    )
}

function useEventCapture() {
    const context = useContext(EventCaptureContext)
    if (context === undefined) {
        throw new Error('useEventCapture must be used within a EventCaptureProvider')
    }
    return context
}

export { EventCaptureProvider, useEventCapture }
