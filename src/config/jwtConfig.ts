import dotenv from "dotenv";

dotenv.config();

// Verificar si JWT_SECRET está definido en el archivo .env
if (!process.env.JWT_SECRET) {
  throw new Error("Falta la clave secreta JWT en las variables de entorno (JWT_SECRET)");
}

export const jwtConfig = {
  secret: process.env.JWT_SECRET as string, 
  expiresIn: process.env.JWT_EXPIRES_IN || '1h' 
};
