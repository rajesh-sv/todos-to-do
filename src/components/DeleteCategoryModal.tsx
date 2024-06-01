import { Modal, ActionIcon, Group, Button, Tooltip, Text } from "@mantine/core"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import { IconX, IconTrash } from "@tabler/icons-react"

export default function DeleteCategoryModal({
  category,
  handleDeleteCategory,
}: {
  category: string
  handleDeleteCategory: (category: string) => void
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
            Delete Category
          </Text>
        }
      >
        <Text>
          Are you sure you want to delete the category? This will also delete
          all the todos associated with the category. This process is not
          recoverable!
        </Text>
        <Group mt={20}>
          <Button variant="default" onClick={close} ml="auto">
            Cancel
          </Button>
          <Button
            variant="filled"
            color="red"
            onClick={() => {
              close()
              handleDeleteCategory(category)
            }}
          >
            Delete
          </Button>
        </Group>
      </Modal>

      <Tooltip
        label="Delete"
        transitionProps={{ transition: "fade", duration: 300 }}
        openDelay={300}
      >
        <ActionIcon
          color="red"
          className="mantine-rotate-rtl"
          variant="subtle"
          onClick={open}
        >
          <IconTrash color="red" size={16} stroke={1.5} />
        </ActionIcon>
      </Tooltip>
    </>
  )
}
