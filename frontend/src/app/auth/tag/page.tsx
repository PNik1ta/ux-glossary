'use client';

import { useEffect, useState } from 'react';
import { TagService } from '@/services/tag.service';
import { ITag } from '../../../core/interfaces/tag.interface';
import { Table, Button, Modal, Form, Input, Popconfirm, Typography, message, Spin } from 'antd';
import { ColumnsType } from 'antd/es/table';
import AdminLayout from '@/components/layout/AdminLayout';

const { Title } = Typography;

export default function TagPage() {
	const [tags, setTags] = useState<ITag[]>([]);
	const [loading, setLoading] = useState(true);
	const [openModal, setOpenModal] = useState(false);
	const [form] = Form.useForm();
	const [editTag, setEditTag] = useState<ITag | null>(null);

	const loadTags = async () => {
		const res = await TagService.getAll();
		setTags(res.data);
		setLoading(false);
	};

	useEffect(() => {
		loadTags();
	}, []);

	const handleCreate = () => {
		setEditTag(null);
		form.resetFields();
		setOpenModal(true);
	};

	const handleEdit = (tag: ITag) => {
		setEditTag(tag);
		form.setFieldsValue(tag);
		setOpenModal(true);
	};

	const handleDelete = async (id: number) => {
		await TagService.delete(id);
		message.success('Тег удалён');
		loadTags();
	};

	const handleSubmit = async () => {
		const values = form.getFieldsValue();
		if (editTag) {
			await TagService.update(editTag.id!, values);
			message.success('Тег обновлён');
		} else {
			await TagService.create(values);
			message.success('Тег создан');
		}
		setOpenModal(false);
		loadTags();
	};

	const columns: ColumnsType<ITag> = [
		{ title: 'ID', dataIndex: 'id' },
		{ title: 'Название', dataIndex: 'name' },
		{
			title: 'Действия',
			render: (_, record) => (
				<>
					<Button type="link" onClick={() => handleEdit(record)}>Изменить</Button>
					<Popconfirm
						title="Удалить тег?"
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
			<Title level={3}>Теги</Title>
			<Button type="primary" style={{ marginBottom: 16 }} onClick={handleCreate}>
				Создать тег
			</Button>

			{loading ? (
				<Spin size="large" />
			) : (
				<Table
					columns={columns}
					dataSource={tags}
					rowKey="id"
					pagination={{ pageSize: 10 }}
				/>
			)}

			<Modal
				open={openModal}
				title={editTag ? 'Редактировать тег' : 'Создать тег'}
				onCancel={() => setOpenModal(false)}
				onOk={handleSubmit}
			>
				<Form layout="vertical" form={form}>
					<Form.Item label="Название" name="name" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</AdminLayout>
	);
}
