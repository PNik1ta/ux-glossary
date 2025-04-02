'use client'

import { useEffect, useState } from 'react'
import { TagService } from '@/services/tag.service'
import { TerminService } from '@/services/termin.service'
import { UserFavoriteService } from '@/services/user-favorite.service'
import { ITermin } from '@/core/interfaces/termin.interface'
import { message, Typography, Divider, Button } from 'antd'
import TerminCard from '../components/TerminCard/TerminCard'
import styles from './Profile.module.scss'
import { useRouter } from 'next/navigation'
import TerminFormModal from '../components/TerminFormModal/TerminFormModal'

const { Title } = Typography

export default function ProfilePage() {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const [favoriteTermins, setFavoriteTermins] = useState<ITermin[]>([])
  const [myTermins, setMyTermins] = useState<ITermin[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAll = async () => {
	try {
	  const favs = await UserFavoriteService.getFavorites()
	  const favTerminIds = favs.data.map((f) => f.termin_id)
    if (favTerminIds.length !== 0) {
      const favTerminRes = await TerminService.findByIds(favTerminIds)
      setFavoriteTermins(favTerminRes.data ?? [])
    }
  

	  const myRes = await TerminService.findByUserId() // ID из токена на бэке
	  setMyTermins(myRes.data ?? [])
	} catch (e) {
	  message.error('Ошибка при загрузке профиля')
	} finally {
	  setLoading(false)
	}
 }

  useEffect(() => {
    fetchAll()
  }, [])

  const handleSuccess = () => {
    setModalOpen(false)
    fetchAll()
  }

  if (loading) return <p>Загрузка...</p>

  return (
    <div className={styles.profile}>
       <div className={styles.header}>
        <Title level={2}>Профиль</Title>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Добавить термин
        </Button>
      </div>

      <Divider>Избранные термины</Divider>
      <div className={styles.grid}>
        {favoriteTermins.length > 0 ? (
          favoriteTermins.map((termin) => (
            <TerminCard hideHeart key={termin.id} termin={termin} onUpdated={fetchAll}/>
          ))
        ) : (
          <p className={styles.text}>Пока нет избранных терминов.</p>
        )}
      </div>

      <Divider>Мои термины</Divider>
      <div className={styles.grid}>
        {myTermins.length > 0 ? (
          myTermins.map((termin) => (
            <TerminCard key={termin.id} termin={termin} showActions onUpdated={fetchAll}/>
          ))
        ) : (
          <p className={styles.text}>Вы ещё не добавили терминов.</p>
        )}
      </div>

      <TerminFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
