import {
  Modal,
  ScrollArea,
  ActionIcon,
  TextInput,
  Group,
  Button,
  Text,
} from "@mantine/core"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import { IconX, IconPlus } from "@tabler/icons-react"
import { useState } from "react"

export default function AddCategoryModal({
  handleAddCategory,
}: {
  handleAddCategory: (category: string) => void
}) {
  const [categoryVal, setCategoryVal] = useState("")
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
            Add Category
          </Text>
        }
      >
        <TextInput
          label="Category"
          withAsterisk
          value={categoryVal}
          onChange={(e) => setCategoryVal(e.target.value)}
        />

        <Group mt={20}>
          <Button variant="default" onClick={close} ml="auto">
            Cancel
          </Button>
          <Button
            variant="filled"
            color="green"
            onClick={() => {
              handleAddCategory(categoryVal)
              setCategoryVal("")
              close()
            }}
          >
            Submit
          </Button>
        </Group>
      </Modal>

      <Button onClick={open} rightSection={<IconPlus stroke={1.5} size={20} />}>
        Category
      </Button>
    </>
  )
}
