import {
  Modal,
  ScrollArea,
  ActionIcon,
  TextInput,
  Textarea,
  NativeSelect,
  Group,
  Button,
  Tooltip,
  Text,
} from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import { IconX, IconCalendar, IconEdit } from "@tabler/icons-react"
import { useState } from "react"

export default function EditTodoModal({
  id,
  title,
  description,
  dueDate,
  priority,
  category,
  categoryList,
  handleEditTodo,
}: {
  id: string
  title: string
  description: string
  dueDate: string
  priority: string
  category: string
  categoryList: string[]
  handleEditTodo: (
    id: string,
    title: string,
    description: string,
    dueDate: string,
    priority: string,
    category: string,
  ) => void
}) {
  const [newTitle, setTitle] = useState(title)
  const [newDescription, setDescription] = useState(description)
  const [newDueDate, setDueDate] = useState<Date | null>(new Date(dueDate))
  const [newPriority, setPriority] = useState(priority)
  const [newCategory, setCategory] = useState(category)

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
            Edit Todo
          </Text>
        }
      >
        <form
          id="todo-form"
          action=""
          onSubmit={(e) => {
            e.preventDefault()
            const today = new Date()
            const date = today.toLocaleDateString()
            handleEditTodo(
              id,
              newTitle,
              newDescription,
              newDueDate ? newDueDate.toLocaleDateString() : date,
              newPriority,
              newCategory,
            )
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
          <DatePickerInput
            leftSection={<IconCalendar size={18} stroke={1.5} />}
            leftSectionPointerEvents="none"
            mt="md"
            label="Due Date"
            placeholder="Pick date"
            withAsterisk
            value={newDueDate}
            onChange={setDueDate}
          />
          <NativeSelect
            mt="md"
            label="Priority"
            description="Default priority is Low"
            data={[
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ]}
            withAsterisk
            value={newPriority}
            onChange={(e) => setPriority(e.target.value)}
          />
          <NativeSelect
            mt="md"
            label="Category"
            description="Default category is General"
            data={categoryList}
            withAsterisk
            value={newCategory}
            onChange={(e) => setCategory(e.target.value)}
          />
        </form>
        <Group mt={20}>
          <Button variant="default" onClick={close} ml="auto">
            Cancel
          </Button>
          <Button form="todo-form" type="submit" variant="filled" color="green">
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
