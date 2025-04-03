'use client';

import { Button, Form, Input, Typography, Alert } from 'antd';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth.service';
import { UserService } from '@/services/user.service';
import { ERoles } from '../../../core/enums/roles.enum';
import { useState } from 'react';

const { Title } = Typography;

export default function LoginPage() {
	const router = useRouter();
	const [error, setError] = useState('');

	const onFinish = async (values: { email: string; password: string }) => {
		try {
			await AuthService.login(values);			

			const profile = await UserService.getProfile();
			if (profile.data.role === ERoles.ADMIN) {
				router.push('/auth/user');
			} else {
				setError('Нет доступа: только для админов');
			}
		} catch {
			setError('Неверный логин или пароль');
		}
	};

	return (
		<div style={{ maxWidth: 400, margin: '100px auto' }}>
			<Title level={3}>Вход в админку</Title>
			<Form layout="vertical" onFinish={onFinish}>
				<Form.Item label="Email" name="email" rules={[{ required: true, message: 'Введите email' }]}>
					<Input />
				</Form.Item>

				<Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
					<Input.Password />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" block>
						Войти
					</Button>
				</Form.Item>
			</Form>

			{error && <Alert type="error" message={error} />}
		</div>
	);
}
