import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwtConfig';
import { IJwt } from '../interfaces/IAuthenticacion';

export const generateToken = (userId: string, userName: string, rolId: string, rolName: string) => {
    const payload: IJwt = {
        userId,
        userName,
        rolId,
        rolName
    }

    return jwt.sign(payload, jwtConfig.secret,{
        expiresIn: jwtConfig.expiresIn,
    })
}