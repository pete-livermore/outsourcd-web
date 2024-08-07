import { z } from 'zod'

const LoginDto = z.object({
  password: z.string().min(1),
  email: z.string().email(),
})

type LoginDto = z.infer<typeof LoginDto>

const AuthenticatedUserDto = z.object({
  id: z.string(),
})

type AuthenticatedUserDto = z.infer<typeof AuthenticatedUserDto>

const LoginResponseDto = z.object({
  token: z.string(),
  user: AuthenticatedUserDto,
})

type LoginResponseDto = z.infer<typeof LoginResponseDto>

export { AuthenticatedUserDto, LoginDto, LoginResponseDto }
