import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { SessionService } from './session.service'
import { UserModel } from '../account/models/user.model'
import { GqlContext } from '@/src/shared/types/gql-context.types'
import { LoginInput } from './inputs/login.inputs'
import { UserAgent } from '@/src/shared/decorators/user-agent.decorator'
import { Authorization } from '@/src/shared/decorators/auth.decorator'
import { SessionModel } from './models/session.model'

@Resolver('Session')
export class SessionResolver {
	constructor(private readonly sessionService: SessionService) {}

	// Получить сессию юзера
	@Authorization()
	@Query(() => [SessionModel], { name: 'findSessionByUser' })
	public async findByUser(@Context() { req }: GqlContext) {
		return this.sessionService.findByUser(req)
	}

	// Получить текущую  сессию юзера
	@Authorization()
	@Query(() => SessionModel, { name: 'findCurrentSessionByUser' })
	public async findCurrent(@Context() { req }: GqlContext) {
		return this.sessionService.findCurrent(req)
	}

	// Логин Пользователя
	@Mutation(() => UserModel, { name: 'loginUser' })
	public async login(
		@Context() { req }: GqlContext,
		@Args('data') input: LoginInput,
		@UserAgent() userAgent: string
	) {
		return this.sessionService.login(req, input, userAgent)
	}

	// Выход пользователя
	@Authorization()
	@Mutation(() => Boolean, { name: 'logoutUser' })
	public async logout(@Context() { req }: GqlContext) {
		return this.sessionService.logout(req)
	}

	// Очитска куки пользователя
	@Authorization()
	@Mutation(() => Boolean, { name: 'clearSessionCookie' })
	public async clearSession(@Context() { req }: GqlContext) {
		return this.sessionService.clearSession(req)
	}

	// Удаление куки пользователя
	@Authorization()
	@Mutation(() => Boolean, { name: 'removeSession' })
	public async remove(@Context() { req }: GqlContext, @Args('id') id: string) {
		return this.sessionService.remove(req, id)
	}
}
