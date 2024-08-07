import { z } from 'zod'

const UserDto = z.object({
  id: z.number(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  profile_image: z.object({
    id: z.number(),
    url: z.string().url(),
  }),
  biography: z.string(),
})

type UserDto = z.infer<typeof UserDto>

const UpdateUserDto = z.object({
  biography: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  profileImage: z.number().optional(),
})

type UpdateUserDto = z.infer<typeof UpdateUserDto>

export { UpdateUserDto, UserDto }
