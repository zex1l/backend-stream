import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { VerificationTemplate } from './templates/verification.template'
import { render } from '@react-email/components'

@Injectable()
export class MailService {
	public constructor(
		private readonly mailerService: MailerService,
		private readonly configService: ConfigService
	) {}

	public async sendVerificationToken(email: string, token: string) {
		const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
		const html = await render(VerificationTemplate({ domain, token }))

		return this.sendMail(email, 'Верификация аккаунта', html)
	}

	private sendMail(email: string, subject: string, html: string) {
		return this.mailerService.sendMail({
			to: email,
			subject,
			html
		})
	}
}
