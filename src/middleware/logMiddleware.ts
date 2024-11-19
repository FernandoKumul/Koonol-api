import { Request, Response, NextFunction } from "express";
import Log from "../models/logModel";
import { encrypt } from "../utils/encryption";

const logMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const log: any = {
    timestamp: new Date(),
    userId: req.user ? req.user.userId : null,
    ipAddress: req.ip,
    request: {
      method: req.method,
      endpoint: req.originalUrl,
      body: req.body,
    },
    response: null,
  };

  // Interceptar la respuesta original
  const originalSend = res.send;
  res.send = function (body: any) {
    try {
      // Parsear el cuerpo de la respuesta si es un string JSON
      let parsedBody = body;
      if (typeof body === "string") {
        try {
          parsedBody = JSON.parse(body);
        } catch (error) {
          parsedBody = body; // Si falla el parseo, mantener el body original
        }
      }

      // Crear la respuesta para el log
      const response = {
        success: res.statusCode < 400,
        statusCode: res.statusCode,
        message: res.locals.message || "Response",
        data: parsedBody?.data || parsedBody,
        errorMessages: res.locals.errors || [],
      };

      // Cifrar solo el campo `data`
      const encryptedData = encrypt(JSON.stringify(response.data || {}));
      log.response = {
        ...response,
        data: encryptedData, // Reemplazar `data` con su versión cifrada
      };

      // Guardar el log en la base de datos
      Log.create(log).catch((err) => console.error("Error al guardar el log:", err));
    } catch (error) {
      console.error("Error procesando el log:", error);
    }

    return originalSend.call(this, body);
  };

  next();
};

export default logMiddleware;
