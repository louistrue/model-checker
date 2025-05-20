import { Modal, Text, Button, List } from '@mantine/core'
import { useEffect, useState } from 'react'
import { auditIds, IdsAuditResult } from '@utils/idsAudit'
import { useTranslation } from 'react-i18next'

interface IdsAuditModalProps {
  opened: boolean
  onClose: () => void
  idsContent: string | null
}

export const IdsAuditModal = ({ opened, onClose, idsContent }: IdsAuditModalProps) => {
  const { t } = useTranslation()
  const [result, setResult] = useState<IdsAuditResult | null>(null)

  useEffect(() => {
    if (opened && idsContent) {
      auditIds(idsContent).then(setResult)
    } else {
      setResult(null)
    }
  }, [opened, idsContent])

  return (
    <Modal opened={opened} onClose={onClose} title={t('ids-audit.title', 'IDS Check')} size='lg'>
      {result ? (
        result.valid ? (
          <Text>{t('ids-audit.valid', 'The IDS file is syntactically valid.')}</Text>
        ) : (
          <>
            <Text mb='sm'>{t('ids-audit.invalid', 'The IDS file contains errors:')}</Text>
            <List size='sm' withPadding>
              {result.errors.map((err, idx) => (
                <List.Item key={idx}>{err}</List.Item>
              ))}
            </List>
          </>
        )
      ) : (
        <Text>{t('ids-audit.running', 'Checking IDS...')}</Text>
      )}
      <Button mt='md' onClick={onClose} fullWidth>
        {t('close')}
      </Button>
    </Modal>
  )
}
