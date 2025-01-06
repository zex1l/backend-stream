import { User, TokenType } from '@/prisma/generated'
import { PrismaService } from '@/src/core/prisma/prisma.service'
import { v4 as uuidv4 } from 'uuid'

export async function generateToken(
	prismaService: PrismaService,
	user: User,
	type: TokenType,
	isUUID: boolean = false
) {
	let token: string

	if (isUUID) {
		token = uuidv4()
	} else {
		token = Math.floor(Math.random() * (1000000 - 100000) + 100000).toString()
	}

	const expiresIn = new Date(new Date().getTime() + 300000)

	const exisitingToken = await prismaService.token.findFirst({
		where: {
			type: 'EMAIL_VERIFY',
			user: {
				id: user.id
			}
		}
	})

	if (exisitingToken) {
		await prismaService.token.delete({
			where: {
				id: exisitingToken.id
			}
		})
	}

	const newToken = await prismaService.token.create({
		data: {
			token,
			expiresIn,
			type,
			user: {
				connect: {
					id: user.id
				}
			}
		},
		include: {
			user: true
		}
	})
	return newToken
}
