declare interface BaseReponse {
    success: boolean
}

declare interface AxiosError {
    response: {
        data: {
            message?: string
            error?: {
                message: string
            }
        }
    }
}
