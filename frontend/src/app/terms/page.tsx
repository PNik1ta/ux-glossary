'use client'

import { useEffect, useState } from 'react'
import { Input, Select, Spin, Empty } from 'antd'
import { ITermin } from '@/core/interfaces/termin.interface'
import { ITag } from '@/core/interfaces/tag.interface'
import { TerminService } from '@/services/termin.service'
import { TagService } from '@/services/tag.service'
import { UserFavoriteService } from '@/services/user-favorite.service'
import TerminCard from '../components/TerminCard/TerminCard'
import styles from './terms.module.scss'

export default function TermsPage() {
	const [termins, setTermins] = useState<ITermin[]>([]);
	const [favorites, setFavorites] = useState<number[]>([]);
	const [tags, setTags] = useState<ITag[]>([]);
	const [selectedTag, setSelectedTag] = useState<number | null>(null);
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(false);

	const loadFavorites = async () => {
		try {
			const res = await UserFavoriteService.getFavorites();
			const favIds = res.data.map(fav => fav.termin_id);
			setFavorites(favIds);
		} catch (err) {
			console.error('Ошибка загрузки избранного:', err);
		}
	};

	const loadData = async (searchTerm?: string, tagId?: number | null) => {
		setLoading(true);
		try {
			let res;
			if (searchTerm) {
				res = await TerminService.findBySearch(searchTerm);
			} else if (tagId) {
				res = await TerminService.findByTag(tagId);
			} else {
				res = await TerminService.findBySearch('');
			}
			setTermins(res.data ?? []);
		} catch (err) {
			console.error('Ошибка загрузки терминов:', err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		console.log('TERMINS: ', termins);
		console.log('FAVORITES: ', favorites);
		for (const term of termins) {
			console.log('INCLUDES: ', favorites.includes(term.id!));

		}
		
		
	}, [termins, favorites])

	const handleSearch = () => {
		loadData(search.trim(), selectedTag);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	const handleTagChange = (tagId: number | null) => {
		setSelectedTag(tagId);
		loadData(undefined, tagId);
	};

	useEffect(() => {
		TagService.getAll().then(res => setTags(res.data));
		loadData();
		loadFavorites();
	}, []);

	return (
		<div className={styles.wrapper}>
			<div className={styles.filters}>
				<Input
					placeholder="Поиск по названию"
					value={search}
					onChange={e => setSearch(e.target.value)}
					onKeyDown={handleKeyDown}
					style={{ width: 240 }}
				/>

				<Select
					placeholder="Фильтр по тегу"
					value={selectedTag ?? undefined}
					onChange={value => handleTagChange(value ?? null)}
					allowClear
					className={styles.select}
					style={{ minWidth: 200 }}
				>
					{tags.map((tag) => (
						<Select.Option key={tag.id} value={tag.id!}>
							{tag.name}
						</Select.Option>
					))}
				</Select>
			</div>

			{loading ? (
				<div className={styles.loader}><Spin size="large" /></div>
			) : termins.length === 0 ? (
				<Empty description="Термины не найдены" />
			) : (
				<div className={styles.grid}>
					{termins.map((term) => (
						<TerminCard
							key={term.id}
							termin={term}
							isFavorite={favorites.includes(term.id!)}
						/>
					))}
				</div>
			)}
		</div>
	)
}
