import { Request, Response } from "express"
import { CreateUserService } from "../service/CreateUserService";



class CreateUserController {

    async handle(request: Request, response: Response) {
        const { name, email, admin, password } = request.body;

        const createUserService = new CreateUserService();

        const users = await createUserService.execute({ name, email, admin, password });

        return response.json(users);

    }
}

export { CreateUserController }