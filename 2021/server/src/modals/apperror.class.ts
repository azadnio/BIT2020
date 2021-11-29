
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

export class AppErrInvalidRequest extends AppError {

    constructor(public message: string = 'Invalid Request') {
        super(500, message);
    }
}

export class AppErrDatabaseError extends AppError {

    constructor(sqlErr) {
        super(501, sqlErr.sqlMessage);
    }
}

export class AppErrUnAuthorized extends AppError {

    constructor(public message: string = 'UnAuthorized') {
        super(403, message);
    }
}