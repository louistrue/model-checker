import { Modal, Text, Button, Group } from '@mantine/core'
import { useTranslation } from 'react-i18next'

interface IdsAuditModalProps {
  opened: boolean
  onConfirm: () => void
  onSkip: () => void
}

export const IdsAuditModal = ({ opened, onConfirm, onSkip }: IdsAuditModalProps) => {
  const { t } = useTranslation()

  return (
    <Modal opened={opened} onClose={onSkip} title={t('ids-audit-modal.title')} centered>
      <Text mb='md'>{t('ids-audit-modal.text')}</Text>
      <Group justify='flex-end'>
        <Button variant='default' onClick={onSkip} mr='sm'>
          {t('ids-audit-modal.skip')}
        </Button>
        <Button color='blue' onClick={onConfirm}>
          {t('ids-audit-modal.confirm')}
        </Button>
      </Group>
    </Modal>
  )
}
