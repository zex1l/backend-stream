import {
	Body,
	Head,
	Heading,
	Link,
	Preview,
	Section,
	Tailwind
} from '@react-email/components'
import { Html } from '@react-email/html'
import * as React from 'react'

export const VerificationTemplate = ({ domain, token }: Props) => {
	const verificationLink = `${domain}/account/verify?token=${token}`

	return (
		<Html>
			<Head />
			<Preview>Верификация аккаунта</Preview>
			<Tailwind>
				<Body className='max-w-2xl mx-auto p-6 bg-slate-50'>
					<Section className='text-center mb-8'>
						<Heading className='text-3xl text-black font-bold'>
							Подтверждение вашей почты
						</Heading>
						<p className='text-base text-black'>
							Пожалуйста, перейдите по ссылке ниже, чтобы подтвердить ваш
							аккаунт:
						</p>
						<Link
							href={verificationLink}
							className='inline-flex justify-center rounded-md text-sm font-medium bg-[#18b9ae] px-5 py-2'
						>
							Подтвердить почту
						</Link>
					</Section>
				</Body>
			</Tailwind>
		</Html>
	)
}

interface Props {
	domain: string
	token: string
}
