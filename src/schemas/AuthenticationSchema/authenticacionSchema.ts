import {z} from 'zod'

export const loginSchema = z.object({
    email: z.string().email('Correo electrónico no válido'),
    password : z.string().min(3, 'La contraseña debe tener al menos 3 caracteres')
})