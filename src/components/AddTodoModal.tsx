import {
  Modal,
  ScrollArea,
  ActionIcon,
  TextInput,
  Textarea,
  NativeSelect,
  Group,
  Button,
  Text,
} from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import { IconX, IconCalendar, IconPlus } from "@tabler/icons-react"
import { useState } from "react"

export default function AddTodoModal({
  handleAddTodo,
  categoryList,
}: {
  handleAddTodo: (
    title: string,
    description: string,
    dueDate: string,
    priority: string,
    category: string,
  ) => void
  categoryList: string[]
}) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState<Date | null>(null)
  const [priority, setPriority] = useState("low")
  const [category, setCategory] = useState("General")

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
            Add Todo
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
            handleAddTodo(
              title,
              description,
              dueDate ? dueDate.toLocaleDateString() : date,
              priority,
              category,
            )
            setTitle("")
            setDescription("")
            setDueDate(null)
            setPriority("low")
            setCategory("General")
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
          <DatePickerInput
            leftSection={<IconCalendar size={18} stroke={1.5} />}
            leftSectionPointerEvents="none"
            mt="md"
            label="Due Date"
            placeholder="Pick date"
            withAsterisk
            value={dueDate}
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
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
          <NativeSelect
            mt="md"
            label="Category"
            description="Default category is General"
            data={categoryList}
            withAsterisk
            value={category}
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

      <Button onClick={open} rightSection={<IconPlus stroke={1.5} size={20} />}>
        Todo
      </Button>
    </>
  )
}
