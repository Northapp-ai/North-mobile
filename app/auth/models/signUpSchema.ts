import { z } from 'zod';

export const baseSignUpSchema = z.object({
  name: z.string().nonempty('El nombre es obligatorio'),
  lastName: z.string().nonempty('El apellido es obligatorio'),
  email: z.string().nonempty('El email es obligatorio').email('Email inválido'),
  password: z.string().nonempty('La contraseña es obligatoria').min(6, 'Debe tener al menos 6 caracteres'),
});

export const validateCodeSchema = z.object({
  code: z.string().nonempty('El código es obligatorio')
  .regex(/^\d+$/, 'Código de confirmación inválido'),

});

export const signUpSchema = baseSignUpSchema.extend({ code: z.string().optional() });

export type SignUpForm = z.infer<typeof signUpSchema>;
export type ValidateCodeForm = z.infer<typeof validateCodeSchema>;
