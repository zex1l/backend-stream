import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { SessionService } from './session.service'
import { UserModel } from '../account/models/user.model'
import { GqlContext } from '@/src/shared/types/gql-context.types'

@Resolver('Session')
export class SessionResolver {
	constructor(private readonly sessionService: SessionService) {}

	@Mutation(() => UserModel, { name: 'login' })
	public login(@Context() { req }: GqlContext, @Args('data') input) {
		return this.sessionService.login(req, input)
	}

	@Mutation(() => Boolean, { name: 'logout' })
	public logout(@Context() { req }: GqlContext, @Args('data') input) {
		return this.sessionService.logout(req)
	}
}
