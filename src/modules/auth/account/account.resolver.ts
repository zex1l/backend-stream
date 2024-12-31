import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AccountService } from './account.service'
import { Query } from '@nestjs/graphql'
import { UserModel } from './models/user.model'
import { CreateUserInput } from './inputs/create-user.input'

@Resolver('Account')
export class AccountResolver {
	constructor(private readonly accountService: AccountService) {}

	// Получение все юзеров
	@Query(() => [UserModel], { name: 'findAllUsers' })
	public async findAll() {
		return this.accountService.findAll()
	}

	// Создания юзера
	@Mutation(() => Boolean, { name: 'createUser' })
	public async create(@Args('data') input: CreateUserInput) {
		return this.accountService.create(input)
	}
}
