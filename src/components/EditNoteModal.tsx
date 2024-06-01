import {
  Modal,
  ScrollArea,
  ActionIcon,
  TextInput,
  Textarea,
  Group,
  Button,
  Text,
  Tooltip,
} from "@mantine/core"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import { IconX, IconEdit } from "@tabler/icons-react"
import { useState } from "react"

export default function EditNoteModal({
  id,
  title,
  description,
  handleEditNote,
}: {
  id: string
  title: string
  description: string
  handleEditNote: (id: string, title: string, description: string) => void
}) {
  const [newTitle, setTitle] = useState(title)
  const [newDescription, setDescription] = useState(description)

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
            Edit Note
          </Text>
        }
      >
        <form
          id="note-form"
          action=""
          onSubmit={(e) => {
            e.preventDefault()
            handleEditNote(id, newTitle, newDescription)
            close()
          }}
        >
          <TextInput
            label="Title"
            withAsterisk
            value={newTitle}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            mt="md"
            label="Description"
            minRows={5}
            autosize
            resize="vertical"
            value={newDescription}
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

      <Tooltip
        label="Edit"
        transitionProps={{ transition: "fade", duration: 300 }}
        openDelay={300}
      >
        <ActionIcon color="gray" variant="subtle" onClick={open}>
          <IconEdit color="gray" size={16} stroke={1.5} />
        </ActionIcon>
      </Tooltip>
    </>
  )
}
