import crypto from "crypto";
import dotenv from "dotenv";

// Carga las variables de entorno desde el archivo .env
dotenv.config();

const generateEncryptionKey = (): string => {
  if (!process.env.ENCRYPTION_KEY) {
    console.warn("ENCRYPTION_KEY no definido. Generando una clave temporal...");
    return crypto.randomBytes(32).toString("hex"); // Genera una clave de 32 bytes en formato hexadecimal
  }

  const key = process.env.ENCRYPTION_KEY.trim();
  if (key.length !== 64) {
    throw new Error("ENCRYPTION_KEY debe tener exactamente 64 caracteres (32 bytes en formato hexadecimal).");
  }

  return key;
};

const ENCRYPTION_KEY = generateEncryptionKey();
const IV_LENGTH = 16;

// Función para cifrar datos
export const encrypt = (text: string): { iv: string; encryptedData: string } => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY, "hex"), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return {
    iv: iv.toString("hex"),
    encryptedData: encrypted,
  };
};

// Función para descifrar datos
export const decrypt = (encryptedData: string, iv: string): string => {
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY, "hex"), Buffer.from(iv, "hex"));
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
