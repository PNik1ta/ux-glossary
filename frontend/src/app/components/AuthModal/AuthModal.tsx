'use client'

import { Modal, Tabs, Form, Input, Button, message } from 'antd'
import { useState } from 'react'
import { AuthService } from '@/services/auth.service'
import { useRouter } from 'next/navigation'

const { TabPane } = Tabs

interface AuthModalProps {
	open: boolean
	onClose: () => void
	onLoginSuccess: () => void
 }
 

export default function AuthModal({ open, onClose, onLoginSuccess }: AuthModalProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogin = async (values: any) => {
    setLoading(true)
    try {
      await AuthService.login(values)
      message.success('Успешный вход')
      onClose()
		onLoginSuccess()
      router.refresh()
    } catch {
      message.error('Ошибка входа')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (values: any) => {
    setLoading(true)
    try {
      await AuthService.register(values)
      message.success('Успешная регистрация')
      onClose()
		onLoginSuccess()
      router.refresh()
    } catch {
      message.error('Ошибка регистрации')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onCancel={onClose} footer={null} centered title="Войти или зарегистрироваться">
      <Tabs defaultActiveKey="login">
        <TabPane tab="Вход" key="login">
          <Form layout="vertical" onFinish={handleLogin}>
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Пароль" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Войти
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Регистрация" key="register">
          <Form layout="vertical" onFinish={handleRegister}>
            <Form.Item name="username" label="Имя пользователя" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Пароль" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Зарегистрироваться
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Modal>
  )
}
