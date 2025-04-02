'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { TerminService } from '@/services/termin.service'
import { TagService } from '@/services/tag.service'
import { UserFavoriteService } from '@/services/user-favorite.service'
import { ITermin } from '@/core/interfaces/termin.interface'
import { ITag } from '@/core/interfaces/tag.interface'
import { Button, Spin, message } from 'antd'
import styles from './page.module.scss'

export default function TerminDetailsPage() {
  const { id } = useParams()
  const [termin, setTermin] = useState<ITermin | null>(null)
  const [tag, setTag] = useState<ITag | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await TerminService.findById(+id!)
        setTermin(res.data!)

        const tagRes = await TagService.getById(res.data!.tag_id)
        setTag(tagRes.data)

        const favs = await UserFavoriteService.getFavorites()
        setIsFavorite(favs.data.some((f) => f.termin_id === res.data!.id))
      } catch (e) {
        message.error('Ошибка при загрузке термина')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])
  

  const handleToggleFavorite = async () => {
    try {
      if (!termin) return
      if (isFavorite) {
        const favs = await UserFavoriteService.getFavorites()
        const favorite = favs.data.find((f) => f.termin_id === termin.id)
        if (favorite) await UserFavoriteService.delete(favorite.id!)
        message.success('Удалено из избранного')
      } else {
        await UserFavoriteService.create({ termin_id: termin.id! })
        message.success('Добавлено в избранное')
      }
      setIsFavorite(!isFavorite)
    } catch {
      message.error('Ошибка при изменении избранного')
    }
  }

  if (loading) return <div className={styles.loader}><Spin size="large" /></div>
  if (!termin) return <div className={styles.error}>Термин не найден</div>

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{termin.title}</h1>
      <p className={styles.tag}>Тег: {tag?.name}</p>

      <div className={styles.block}>
        <h3>Описание</h3>
        <p>{termin.description}</p>
      </div>

      <div className={styles.block}>
        <h3>Пример</h3>
        <p>{termin.example}</p>
      </div>

      <Button type={isFavorite ? 'default' : 'primary'} onClick={handleToggleFavorite}>
        {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
      </Button>
    </div>
  )
}
