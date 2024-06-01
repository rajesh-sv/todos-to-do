import {
  Modal,
  ScrollArea,
  ActionIcon,
  Group,
  Tooltip,
  Badge,
  Text,
} from "@mantine/core"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import { IconX, IconWindowMaximize } from "@tabler/icons-react"

export function ExpandTodoModal({
  title,
  description,
  dueDate,
  priority,
  category,
}: {
  title: string
  description: string
  dueDate: string
  priority: string
  category: string
}) {
  const [opened, { open, close }] = useDisclosure(false)
  const isMobile = useMediaQuery("(max-width: 50em)")

  return (
    <>
      <Modal
        centered
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
            {title}
          </Text>
        }
      >
        <Text fs="italic">Due: {dueDate}</Text>
        <Text size="sm" mt="md">
          {description}
        </Text>
        <Group mt="md">
          <Tooltip label="Priority" openDelay={500}>
            <Badge
              size="lg"
              radius="md"
              variant="light"
              color={
                priority === "low"
                  ? "green"
                  : priority === "medium"
                    ? "orange"
                    : "red"
              }
            >
              {priority}
            </Badge>
          </Tooltip>
          <Tooltip label="Category" openDelay={500}>
            <Badge size="lg" radius="md" ml="auto" variant="light">
              {category}
            </Badge>
          </Tooltip>
        </Group>
      </Modal>

      <Tooltip
        label="Expand"
        transitionProps={{ transition: "fade", duration: 300 }}
        openDelay={300}
      >
        <ActionIcon color="gray" variant="subtle" onClick={open}>
          <IconWindowMaximize color="gray" size={16} stroke={1.5} />
        </ActionIcon>
      </Tooltip>
    </>
  )
}
