'use client';

import { useEffect, useState } from 'react';
import {
	Table,
	Button,
	Modal,
	Form,
	Select,
	Popconfirm,
	Typography,
	message,
	Spin,
} from 'antd';
import AdminLayout from '@/components/layout/AdminLayout';
import { IUserFavorites } from '@/core/interfaces/user-favorites.interface';
import { IUser } from '@/core/interfaces/user.interface';
import { ITermin } from '@/core/interfaces/termin.interface';
import { UserFavoriteService } from '@/services/user-favorite.service';
import { UserService } from '@/services/user.service';
import { TerminService } from '@/services/termin.service';

const { Title } = Typography;

export default function UserFavoritesPage() {
	const [favorites, setFavorites] = useState<IUserFavorites[]>([]);
	const [users, setUsers] = useState<IUser[]>([]);
	const [termins, setTermins] = useState<ITermin[]>([]);
	const [loading, setLoading] = useState(true);
	const [openModal, setOpenModal] = useState(false);
	const [form] = Form.useForm();

	const loadData = async () => {
		const [favRes, userRes, terminRes] = await Promise.all([
			UserFavoriteService.getFavorites(),
			UserService.getAll(),
			TerminService.findBySearch(''),
		]);
		setFavorites(favRes.data);
		setUsers(userRes.data);
		setTermins(terminRes.data);
		setLoading(false);
	};

	useEffect(() => {
		loadData();
	}, []);

	const handleCreate = () => {
		form.resetFields();
		setOpenModal(true);
	};

	const handleSubmit = async () => {
		try {
			const values = form.getFieldsValue(); // только termin_id
			await UserFavoriteService.create(values); // user_id с токена
			message.success('Добавлено в избранное');
			setOpenModal(false);
			loadData();
		} catch {
			message.error('Ошибка при добавлении');
		}
	};

	const handleDelete = async (id: number) => {
		await UserFavoriteService.delete(id);
		message.success('Удалено');
		loadData();
	};

	return (
		<AdminLayout>
			<Title level={3}>Избранные термины</Title>
			<Button type="primary" onClick={handleCreate} style={{ marginBottom: 16 }}>
				Добавить
			</Button>

			{loading ? (
				<Spin size="large" />
			) : (
				<Table
					rowKey="id"
					dataSource={favorites}
					columns={[
						{
							title: 'ID',
							dataIndex: 'id',
						},
						{
							title: 'Пользователь',
							dataIndex: 'user_id',
							render: (id) => users.find((u) => u.id === id)?.username || '—',
						},
						{
							title: 'Термин',
							dataIndex: 'termin_id',
							render: (id) => termins.find((t) => t.id === id)?.title || '—',
						},
						{
							title: 'Действия',
							render: (_, record) => (
								<Popconfirm
									title="Удалить?"
									onConfirm={() => handleDelete(record.id!)}
									okText="Да"
									cancelText="Нет"
								>
									<Button danger type="link">
										Удалить
									</Button>
								</Popconfirm>
							),
						},
					]}
				/>
			)}

			<Modal
				open={openModal}
				title="Добавить в избранное"
				onCancel={() => setOpenModal(false)}
				onOk={handleSubmit}
			>
				<Form layout="vertical" form={form}>
					<Form.Item name="termin_id" label="Термин" rules={[{ required: true }]}>
						<Select
							showSearch
							placeholder="Выберите термин"
							options={termins.map((t) => ({ label: t.title, value: t.id }))}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</AdminLayout>
	);
}
