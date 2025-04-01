'use client';

import { useEffect, useState } from 'react';
import { TerminService } from '@/services/termin.service';
import { TagService } from '@/services/tag.service';
import { ITag } from '../../../core/interfaces/tag.interface';
import { ITermin } from '../../../core/interfaces/termin.interface';
import { Table, Button, Modal, Form, Input, Select, Popconfirm, Typography, message, Spin } from 'antd';
import { ColumnsType } from 'antd/es/table';
import AdminLayout from '@/components/layout/AdminLayout';

const { Title } = Typography;

export default function TerminPage() {
	const [termins, setTermins] = useState<ITermin[]>([]);
	const [tags, setTags] = useState<ITag[]>([]);
	const [loading, setLoading] = useState(true);
	const [openModal, setOpenModal] = useState(false);
	const [editTermin, setEditTermin] = useState<ITermin | null>(null);
	const [form] = Form.useForm();

	const loadData = async () => {
		const [terminsRes, tagsRes] = await Promise.all([
			TerminService.findBySearch(''),
			TagService.getAll(),
		]);
		setTermins(terminsRes.data!);
		setTags(tagsRes.data);
		setLoading(false);
	};

	useEffect(() => {
		loadData();
	}, []);

	const handleCreate = () => {
		setEditTermin(null);
		form.resetFields();
		setOpenModal(true);
	};

	const handleEdit = (termin: ITermin) => {
		setEditTermin(termin);
		form.setFieldsValue(termin);
		setOpenModal(true);
	};

	const handleDelete = async (id: number) => {
		await TerminService.delete(id);
		message.success('Термин удалён');
		loadData();
	};

	const handleSubmit = async () => {
		const values = form.getFieldsValue();
		if (editTermin) {
			await TerminService.update(editTermin.id!, values);
			message.success('Термин обновлён');
		} else {
			await TerminService.create(values);
			message.success('Термин создан');
		}
		setOpenModal(false);
		loadData();
	};

	const columns: ColumnsType<ITermin> = [
		{ title: 'ID', dataIndex: 'id' },
		{ title: 'Название', dataIndex: 'title' },
		{ title: 'Описание', dataIndex: 'description' },
		{ title: 'Пример', dataIndex: 'example' },
		{
			title: 'Тег',
			dataIndex: 'tag_id',
			render: (tagId) => tags.find(t => t.id === tagId)?.name || '—',
		},
		{
			title: 'Действия',
			render: (_, record) => (
				<>
					<Button type="link" onClick={() => handleEdit(record)}>Изменить</Button>
					<Popconfirm
						title="Удалить термин?"
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
			<Title level={3}>Термины</Title>
			<Button type="primary" style={{ marginBottom: 16 }} onClick={handleCreate}>
				Создать термин
			</Button>

			{loading ? (
				<Spin size="large" />
			) : (
				<Table
					columns={columns}
					dataSource={termins}
					rowKey="id"
					pagination={{ pageSize: 10 }}
				/>
			)}

			<Modal
				open={openModal}
				title={editTermin ? 'Редактировать термин' : 'Создать термин'}
				onCancel={() => setOpenModal(false)}
				onOk={handleSubmit}
				width={700}
			>
				<Form layout="vertical" form={form}>
					<Form.Item label="Название" name="title" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item label="Описание" name="description" rules={[{ required: true }]}>
						<Input.TextArea rows={3} />
					</Form.Item>
					<Form.Item label="Пример" name="example" rules={[{ required: true }]}>
						<Input.TextArea rows={2} />
					</Form.Item>
					<Form.Item label="Тег" name="tag_id" rules={[{ required: true }]}>
						<Select
							options={tags.map(tag => ({
								label: tag.name,
								value: tag.id,
							}))}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</AdminLayout>
	);
}
