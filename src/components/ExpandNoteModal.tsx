import { Modal, ScrollArea, ActionIcon, Tooltip, Text } from "@mantine/core"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import { IconX, IconWindowMaximize } from "@tabler/icons-react"

export function ExpandNoteModal({
  title,
  description,
}: {
  title: string
  description: string
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
        title="Note"
      >
        <Text size="xl" fw={500}>
          {title}
        </Text>
        <Text size="sm" mt="md">
          {description}
        </Text>
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
