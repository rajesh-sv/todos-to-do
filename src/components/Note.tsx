import { Checkbox, Group, Paper, Stack, Text, Tooltip } from "@mantine/core"
import { useState } from "react"
import DeleteNoteModal from "./DeleteNoteModal"
import EditNoteModal from "./EditNoteModal"
import { ExpandNoteModal } from "./ExpandNoteModal"

function Note({
  id,
  title,
  description,
  handleEditNote,
  handleDeleteNote,
}: {
  id: string
  title: string
  description: string
  handleEditNote: (id: string, title: string, description: string) => void
  handleDeleteNote: (id: string) => void
}) {
  const [checked, setChecked] = useState(false)

  return (
    <Paper shadow="sm" p="sm" withBorder opacity={checked ? 0.5 : 1}>
      <Group align="center">
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
        <Stack maw={{ base: 350, sm: "100%" }} gap={0}>
          <Text
            truncate="end"
            fw={600}
            td={checked ? "line-through" : ""}
            component="p"
          >
            {title}
          </Text>
          <Text
            lineClamp={5}
            size="sm"
            td={checked ? "line-through" : ""}
            component="p"
          >
            {description}
          </Text>
        </Stack>
        <Group gap={5} ml="auto">
          <ExpandNoteModal title={title} description={description} />
          <EditNoteModal
            id={id}
            title={title}
            description={description}
            handleEditNote={handleEditNote}
          />{" "}
          <DeleteNoteModal id={id} handleDeleteNote={handleDeleteNote} />
        </Group>
      </Group>
    </Paper>
  )
}

export default Note
