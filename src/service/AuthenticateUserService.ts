import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UseRepositories"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

interface IAuthenticateRequest {
    email: string;
    password: string;
}


class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        //// verificar se email existe

        const user = await usersRepositories.findOne({
            email
        });

        if (!user) {
            throw new Error("Email/Password incorrect")
        }

        //// verificar senha correta
        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch) {
            throw new Error("Email/Password incorrect")
        }


        /// gerar token
        const token = sign({
            email: user.email
        }, "0d9b8509dd4780f30b6c534507480640", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;
    }
}

export { AuthenticateUserService }