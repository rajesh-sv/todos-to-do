import {
  Modal,
  ScrollArea,
  ActionIcon,
  TextInput,
  Text,
  Textarea,
  Group,
  Button,
} from "@mantine/core"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import { IconX, IconPlus } from "@tabler/icons-react"
import { useState } from "react"

export default function AddNoteModal({
  handleAddNote,
}: {
  handleAddNote: (title: string, description: string) => void
}) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [opened, { open, close }] = useDisclosure(false)
  const isMobile = useMediaQuery("(max-width: 50em)")

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        fullScreen={isMobile}
        transitionProps={{ transition: "pop", duration: 200 }}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        scrollAreaComponent={ScrollArea.Autosize}
        closeButtonProps={{
          icon: (
            <ActionIcon
              variant="light"
              size="md"
              aria-label="Close Navigation Menu"
            >
              <IconX stroke={1.5} size={16} />
            </ActionIcon>
          ),
        }}
        title={
          <Text size="xl" fw={500}>
            Add Note
          </Text>
        }
      >
        <form
          id="note-form"
          action=""
          onSubmit={(e) => {
            e.preventDefault()
            handleAddNote(title, description)
            setTitle("")
            setDescription("")
            close()
          }}
        >
          <TextInput
            label="Title"
            withAsterisk
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            mt="md"
            label="Description"
            minRows={5}
            autosize
            resize="vertical"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </form>
        <Group mt={20}>
          <Button variant="default" onClick={close} ml="auto">
            Cancel
          </Button>
          <Button form="note-form" type="submit" variant="filled" color="green">
            Submit
          </Button>
        </Group>
      </Modal>

      <Button onClick={open} rightSection={<IconPlus stroke={1.5} size={20} />}>
        Note
      </Button>
    </>
  )
}
