import { Request } from 'express';
class ValidationControllerClass {

      constructor() {}

      validatePostRequest(req: Request) {

            //has feilds
            return req.body && Object.entries(req.body).length;
      }
}

export const  ValidationController = new ValidationControllerClass()