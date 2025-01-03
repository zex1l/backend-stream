import 'express-session'
import { SessisonMetadata } from './session-metadata.types'

declare module 'express-session' {
	interface SessionData {
		userId?: string
		createdAt?: Date | string
		metadata: SessisonMetadata
	}
}
