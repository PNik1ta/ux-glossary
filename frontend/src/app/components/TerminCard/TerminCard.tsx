'use client'

import styles from './TerminCard.module.scss'
import { ITermin } from '@/core/interfaces/termin.interface'
import { useRouter } from 'next/navigation'
import { Heart, Edit, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { UserFavoriteService } from '@/services/user-favorite.service'
import { TerminService } from '@/services/termin.service'
import { message, Modal, Popconfirm } from 'antd'
import TerminFormModal from '../TerminFormModal/TerminFormModal'


interface Props {
  termin: ITermin
  isFavorite?: boolean
  showActions?: boolean
  onUpdated?: () => void
  hideHeart?: boolean
}

export default function TerminCard({ termin, isFavorite = false, showActions = false, onUpdated, hideHeart = false }: Props) {
  const router = useRouter()
  const [favorite, setFavorite] = useState(isFavorite)
  const [editOpen, setEditOpen] = useState(false)

  const handleFavorite = async () => {
    try {
      if (favorite) {
        message.info('Уже в избранном')
        return
      }

      await UserFavoriteService.create({ termin_id: termin.id! })
      setFavorite(true)
      message.success('Добавлено в избранное')
    } catch {
      message.error('Ошибка при добавлении')
    }
  }

  useEffect(() => {
    setFavorite(isFavorite)
  }, [isFavorite])

  const handleDelete = async () => {
    await TerminService.delete(termin.id!)
    if (typeof onUpdated === 'function') {
      onUpdated()
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{termin.title}</h3>
        {(!showActions || hideHeart) && (
          <Heart
            size={20}
            className={`${styles.heart} ${favorite ? styles.filled : ''}`}
            onClick={handleFavorite}
          />
        )}
      </div>

      <p className={styles.description}>{termin.description}</p>

      <button className={styles.link} onClick={() => router.push(`/terms/${termin.id}`)}>
        Подробнее →
      </button>

      {showActions && (
        <div className={styles.actions}>
          <button className={styles.edit} onClick={() => setEditOpen(true)}>
            <Edit size={18} />
          </button>
          <Popconfirm
            title="Удалить термин?"
            description="Это действие необратимо"
            onConfirm={handleDelete}
            okText="Удалить"
            cancelText="Отмена"
            okButtonProps={{ danger: true }}
          >
            <button className={styles.delete}>
              <Trash2 size={18} />
            </button>
          </Popconfirm>
        </div>
      )}

      <TerminFormModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSuccess={onUpdated || (() => { })}
        termin={termin}
      />
    </div>
  )
}
