import { Alert, Progress, Text, Box, Group, Button } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { FileError } from '../hooks/useFileProcessor'

interface ErrorDisplayProps {
  errors: FileError[] | null
  uploadProgress: number
  uploadError: string | null
  onRetry?: () => void
  onSkip?: () => void
}

export const ErrorDisplay = ({ errors, uploadProgress, uploadError, onRetry, onSkip }: ErrorDisplayProps) => {
  const { t } = useTranslation()

  return (
    <>
      {errors && errors.length > 0 && (
        <Alert color='red' variant='light'>
          {errors.map((error, index) => (
            <Text key={index} size='sm'>
              {t('dropzone.error-message')}: {error.file} - {error.message}
            </Text>
          ))}
        </Alert>
      )}

      {uploadProgress > 0 && uploadProgress < 100 && <Progress value={uploadProgress} size='sm' mb='md' />}

      {uploadError && (
        <Alert color='red' variant='light' mb='md'>
          {uploadError}
          {uploadError.includes('out of memory') && (
            <Box mt='sm'>
              <Text fw={700}>{t('console.loading.reloading', 'Page will reload in 3 seconds...')}</Text>
            </Box>
          )}
          {(onRetry || onSkip) && (
            <Group mt='sm' gap='xs'>
              {onRetry && (
                <Button size='xs' color='yellow' variant='light' onClick={onRetry}>
                  {t('retry', 'Retry')}
                </Button>
              )}
              {onSkip && (
                <Button size='xs' color='gray' variant='light' onClick={onSkip}>
                  {t('skip', 'Continue')}
                </Button>
              )}
            </Group>
          )}
        </Alert>
      )}
    </>
  )
}
