import { BackgroundImage, Button, Flex, Input } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useClipboard } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'

type FormValuesType = {
  text: string
}

function App() {
  const form = useForm<FormValuesType>({
    initialValues: {
      text: '',
    },
  })
  const clipboard = useClipboard({ timeout: 500 })

  const transformText = (s: string) => {
    let result = ''
    for (let i = 0; i < s.length; i++) {
      result +=
        s[i] === ' '
          ? '   '
          : s[i].match(/[a-z]/i)
          ? `:alphabet-${i % 2 === 0 ? 'yellow' : 'white'}-${s[i]}:`
          : s[i]
    }
    return result
  }

  const onGenerate = (text: string) => {
    const alphabetFormat = transformText(text)
    clipboard.copy(alphabetFormat)
  }

  const onSubmitForm = (values: FormValuesType) => {
    onGenerate(values.text)
    notifications.show({
      title: 'Copied',
      color: 'green',
      message:
        'Your text has been coolioooly generated and copied to your clipboard, send it to your friend! 🫶',
    })
  }

  return (
    <form onSubmit={form.onSubmit(onSubmitForm)}>
      <BackgroundImage src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80">
        <Flex gap={8} h={150} w={400} align="center" justify="center">
          <Input
            placeholder="Type your coolio"
            {...form.getInputProps('text')}
            autoFocus
          />
          <Button type="submit">Generate</Button>
        </Flex>
      </BackgroundImage>
    </form>
  )
}

export default App
