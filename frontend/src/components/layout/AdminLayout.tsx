'use client';

import { Layout, Menu } from 'antd';
import {
	UserOutlined,
	TagOutlined,
	BookOutlined,
	HeartOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';

const { Sider, Content } = Layout;

const items = [
	{ key: '/auth/user', icon: <UserOutlined />, label: 'Пользователи' },
	{ key: '/auth/tag', icon: <TagOutlined />, label: 'Теги' },
	{ key: '/auth/termin', icon: <BookOutlined />, label: 'Термины' },
	{ key: '/auth/user-favorite', icon: <HeartOutlined />, label: 'Избранное' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider width={220} style={{ background: '#fff', borderRight: '1px solid #eee' }}>
				<div style={{ height: 64, padding: 16, fontWeight: 600, fontSize: 18 }}>
					UX Glossary
				</div>
				<Menu
					mode="inline"
					selectedKeys={[pathname]}
					items={items}
					onClick={({ key }) => router.push(key)}
				/>
			</Sider>
			<Layout>
				<Content style={{ padding: 24 }}>{children}</Content>
			</Layout>
		</Layout>
	);
}
