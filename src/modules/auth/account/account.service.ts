import { PrismaService } from '@/src/core/prisma/prisma.service'
import { ConflictException, Injectable } from '@nestjs/common'
import { CreateUserInput } from './inputs/create-user.input'
import { hash } from 'argon2'

@Injectable()
export class AccountService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async findAll() {
		const users = await this.prismaService.user.findMany()
		return users
	}

	public async create(input: CreateUserInput) {
		const { email, password, username } = input
		const isUsernameExists = await this.prismaService.user.findUnique({
			where: {
				username
			}
		})

		if (isUsernameExists)
			throw new ConflictException('Это имя пользователя уже занято')

		const isEmailExists = await this.prismaService.user.findUnique({
			where: {
				email
			}
		})

		if (isEmailExists) throw new ConflictException('Эта почта уже занята')

		const user = await this.prismaService.user.create({
			data: {
				email,
				username,
				password: await hash(password),
				displayName: username
			}
		})

		return true
	}
}