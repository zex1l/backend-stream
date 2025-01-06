import { Request } from 'express'
import { SessisonMetadata } from '../types/session-metadata.types'
import { User } from '@/prisma/generated'
import { InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

export function saveSession(
	req: Request,
	user: User,
	metadata: SessisonMetadata
) {
	return new Promise((resolve, reject) => {
		req.session.createdAt = new Date()
		req.session.userId = user.id
		req.session.metadata = metadata

		req.session.save(err => {
			if (err) {
				return reject(
					new InternalServerErrorException('Не удалось сохранить сессию')
				)
			}

			resolve(user)
		})
	})
}

export function destroySession(req: Request, configService: ConfigService) {
	return new Promise((resolve, reject) => {
		req.session.destroy(err => {
			if (err) {
				return reject(
					new InternalServerErrorException('Не удалось завершить сессию')
				)
			}
			req.res.clearCookie(configService.getOrThrow<string>('SESSION_NAME'))
			resolve(true)
		})
	})
}
