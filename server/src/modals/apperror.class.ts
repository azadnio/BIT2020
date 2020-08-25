
export class AppError extends Error {

    constructor(public status: number, public message: string) {
        super(message)
    }
}

export class AppErrNotFound extends AppError {

    constructor(public message: string = 'Not Found') {
        super(404, message)
    }
}

