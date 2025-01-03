import {
	DeviceInfo,
	LocationInfo,
	SessisonMetadata
} from '@/src/shared/types/session-metadata.types'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class LocationModal implements LocationInfo {
	@Field(() => String)
	country: string

	@Field(() => String)
	city: string

	@Field(() => Number)
	latidute: number

	@Field(() => Number)
	longetude: number
}

@ObjectType()
export class DeviceModel implements DeviceInfo {
	@Field(() => String)
	browser: string

	@Field(() => String)
	os: string

	@Field(() => String)
	type: string
}

@ObjectType()
export class SessionMetadataModel implements SessisonMetadata {
	@Field(() => DeviceModel)
	device: DeviceModel

	@Field(() => LocationModal)
	location: LocationModal

	@Field(() => String)
	ip: string
}

@ObjectType()
export class SessionModel {
	@Field(() => ID)
	id: string

	@Field(() => String)
	userId: string

	@Field(() => String)
	createdAt: string

	@Field(() => SessionMetadataModel)
	metadata: SessionMetadataModel
}
