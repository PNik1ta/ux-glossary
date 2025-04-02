'use client'

import { Modal, Form, Input, Select, Button, message } from 'antd'
import { useEffect, useState } from 'react'
import { ICreateTerminDto } from '@/dto/termin/create-termin.dto'
import { IUpdateTerminDto } from '@/dto/termin/update-termin.dto'
import { TerminService } from '@/services/termin.service'
import { TagService } from '@/services/tag.service'
import { ITermin } from '@/core/interfaces/termin.interface'
import { ITag } from '@/core/interfaces/tag.interface'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  termin?: ITermin
}

export default function TerminFormModal({ open, onClose, onSuccess, termin }: Props) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState<ITag[]>([])

  useEffect(() => {
    TagService.getAll().then(res => setTags(res.data))
    if (termin) {
      form.setFieldsValue({
        title: termin.title,
        description: termin.description,
        example: termin.example,
        tag_id: termin.tag_id,
      })
    } else {
      form.resetFields()
    }
  }, [termin, form])

  const handleSubmit = async (values: ICreateTerminDto | IUpdateTerminDto) => {
    setLoading(true)
    try {
      if (termin) {
        await TerminService.update(termin.id!, values)
        message.success('Термин обновлён')
      } else {
        await TerminService.create(values as ICreateTerminDto)
        message.success('Термин создан')
      }
      onSuccess()
      onClose()
    } catch {
      message.error('Ошибка при сохранении')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={termin ? 'Редактировать термин' : 'Добавить термин'}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Название" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Описание" name="description" rules={[{ required: true }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Пример" name="example" rules={[{ required: true }]}>
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="Тег" name="tag_id" rules={[{ required: true }]}>
          <Select placeholder="Выберите тег">
            {tags.map(tag => (
              <Select.Option key={tag.id} value={tag.id}>
                {tag.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {termin ? 'Сохранить' : 'Добавить'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
