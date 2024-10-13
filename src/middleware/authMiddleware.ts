import jwt from 'jsonwebtoken';
import { Response, NextFunction, Request } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token no proporcionado" });
    return; 
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    
    (req as any).user = {
      userId: decodedToken.userId,
      userName: decodedToken.userName,
      rolId: decodedToken.rolId,
      rolName: decodedToken.rolName,
    };
    next(); 
  } catch (error) {
    res.status(401).json({ message: "Token no válido" });
    return; 
  }
};
