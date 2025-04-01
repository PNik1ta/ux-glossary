'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserService } from '@/services/user.service';
import { Table, Typography, Spin, Button, Modal, Form, Input, Select, Popconfirm, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { IUser } from '../../../core/interfaces/user.interface';
import { ERoles } from '../../../core/enums/roles.enum';
import AdminLayout from '../../../components/layout/AdminLayout';

const { Title } = Typography;

export default function UsersPage() {
	const router = useRouter();
	const [users, setUsers] = useState<IUser[]>([]);
	const [loading, setLoading] = useState(true);
	const [openModal, setOpenModal] = useState(false);
	const [editUser, setEditUser] = useState<IUser | null>(null);
	const [form] = Form.useForm();

	const loadUsers = async () => {
		const data = await UserService.getAll();
		setUsers(data.data);
	};

	useEffect(() => {
		UserService.getProfile()
			.then(profile => {
				if (profile.data.role !== ERoles.ADMIN) {
					router.push('/auth/login');
				} else {
					loadUsers().then(() => setLoading(false));
				}
			})
			.catch(() => router.push('/auth/login'));
	}, []);

	const handleEdit = (user: IUser) => {
		setEditUser(user);
		form.setFieldsValue(user);
		setOpenModal(true);
	};

	const handleDelete = async (id: number) => {
		await UserService.delete(id);
		message.success('Пользователь удалён');
		loadUsers();
	};

	const handleCreate = () => {
		setEditUser(null);
		form.resetFields();
		setOpenModal(true);
	};

	const handleSubmit = async () => {
		const values = form.getFieldsValue();
		if (editUser) {
			await UserService.updateCurrentUser({ ...editUser, ...values }); // Можно сделать update по id отдельно
			message.success('Пользователь обновлён');
		} else {
			await UserService.create(values); // ты добавишь метод create в сервис
			message.success('Пользователь создан');
		}
		setOpenModal(false);
		loadUsers();
	};

	const columns: ColumnsType<IUser> = [
		{ title: 'ID', dataIndex: 'id' },
		{ title: 'Email', dataIndex: 'email' },
		{ title: 'Имя', dataIndex: 'username' },
		{ title: 'Роль', dataIndex: 'role' },
		{
			title: 'Действия',
			render: (_, record) => (
				<>
					<Button type="link" onClick={() => handleEdit(record)}>Изменить</Button>
					<Popconfirm
						title="Точно удалить пользователя?"
						onConfirm={() => handleDelete(record.id!)}
						okText="Да"
						cancelText="Нет"
					>
						<Button danger type="link">Удалить</Button>
					</Popconfirm>
				</>
			),
		},
	];

	return (
		<AdminLayout>
			<div style={{ padding: 24 }}>
				<Title level={3}>Пользователи</Title>
				<Button type="primary" style={{ marginBottom: 16 }} onClick={handleCreate}>
					Создать пользователя
				</Button>

				{loading ? (
					<Spin size="large" />
				) : (
					<Table columns={columns} dataSource={users} rowKey="id" pagination={{ pageSize: 10 }} />
				)}

				<Modal
					open={openModal}
					title={editUser ? 'Редактировать пользователя' : 'Создать пользователя'}
					onCancel={() => setOpenModal(false)}
					onOk={handleSubmit}
				>
					<Form layout="vertical" form={form}>
						<Form.Item label="Email" name="email" rules={[{ required: true }]}>
							<Input />
						</Form.Item>
						<Form.Item label="Имя" name="username" rules={[{ required: true }]}>
							<Input />
						</Form.Item>
						{!editUser && (
							<Form.Item label="Пароль" name="password" rules={[{ required: true }]}>
								<Input.Password />
							</Form.Item>
						)}
						<Form.Item label="Роль" name="role" rules={[{ required: true }]}>
							<Select options={[
								{ value: ERoles.ADMIN, label: 'Админ' },
								{ value: ERoles.USER, label: 'Пользователь' },
							]} />
						</Form.Item>
					</Form>
				</Modal>
			</div>
		</AdminLayout>
	);
}
