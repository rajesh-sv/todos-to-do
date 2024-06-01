import { Checkbox, Group, Paper, Stack, Text, Tooltip } from "@mantine/core"
import { useState } from "react"
import DeleteTodoModal from "./DeleteTodoModal"
import EditTodoModal from "./EditTodoModal"
import { ExpandTodoModal } from "./ExpandTodoModal"

function Todo({
  id,
  title,
  description,
  dueDate,
  priority,
  category,
  categoryList,
  handleEditTodo,
  handleDeleteTodo,
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
  handleDeleteTodo: (id: string) => void
}) {
  const [checked, setChecked] = useState(false)

  const border = `5px solid ${priority === "low" ? "green" : priority === "medium" ? "orange" : "red"}`

  return (
    <Paper
      shadow="sm"
      p="sm"
      withBorder
      style={{ borderTop: border }}
      opacity={checked ? 0.5 : 1}
    >
      <Group h={80} align="center">
        <Tooltip
          label={checked ? "Undo" : "Done"}
          transitionProps={{ transition: "fade", duration: 300 }}
          openDelay={300}
        >
          <Checkbox
            radius="sm"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
        </Tooltip>
        <Stack maw={300} gap={0}>
          <Text truncate="end" fw={600} td={checked ? "line-through" : ""}>
            {title}
          </Text>
          <Text
            hiddenFrom="xs"
            size="sm"
            fs="italic"
            td={checked ? "line-through" : ""}
          >
            Due: {dueDate}
          </Text>
        </Stack>
        <Text
          visibleFrom="xs"
          size="sm"
          fs="italic"
          ml="auto"
          mr="auto"
          td={checked ? "line-through" : ""}
        >
          Due: {dueDate}
        </Text>
        <Group gap={5} ml="auto">
          <ExpandTodoModal
            title={title}
            description={description}
            dueDate={dueDate}
            priority={priority}
            category={category}
          />
          <EditTodoModal
            id={id}
            title={title}
            description={description}
            dueDate={dueDate}
            priority={priority}
            category={category}
            categoryList={categoryList}
            handleEditTodo={handleEditTodo}
          />{" "}
          <DeleteTodoModal id={id} handleDeleteTodo={handleDeleteTodo} />
        </Group>
      </Group>
    </Paper>
  )
}

export default Todo
