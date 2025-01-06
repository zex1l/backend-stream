import type { User } from '@/prisma/generated'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserModel implements User {
	@Field(() => ID)
	id: string

	@Field(() => String)
	email: string

	@Field(() => String)
	password: string

	@Field(() => String)
	username: string

	@Field(() => String)
	displayName: string

	@Field(() => String, { nullable: true })
	avatar: string

	@Field(() => String, { nullable: true })
	bio: string

	@Field(() => Boolean)
	isVerifed: boolean

	@Field(() => Boolean)
	isEmailVerifed: boolean

	@Field(() => Date)
	createdAt: Date

	@Field(() => Date)
	updatedAt: Date
}
