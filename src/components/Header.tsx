import { Drawer, ActionIcon, Group, Text, Tooltip, Stack } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconChecklist, IconMenu, IconX } from "@tabler/icons-react"
import NavBar from "./NavBar"
import ThemeToggle from "./ThemeToggle"
import AddTodoModal from "./AddTodoModal"
import AddNoteModal from "./AddNoteModal"
import AddCategoryModal from "./AddCategoryModal"

function Header({
  page,
  categoryList,
  handleAddCategory,
  handleDeleteCategory,
  handleAddTodo,
  handleAddNote,
}: {
  page: string
  categoryList: string[]
  handleAddCategory: (category: string) => void
  handleDeleteCategory: (category: string) => void
  handleAddTodo: (
    title: string,
    description: string,
    dueDate: string,
    priority: string,
    category: string,
  ) => void
  handleAddNote: (title: string, description: string) => void
}) {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <header>
      <Group
        p={{ base: "md", sm: "lg" }}
        style={{
          borderBottom: "1px solid var(--mantine-color-default-border)",
        }}
        miw={350}
      >
        <Drawer
          hiddenFrom="sm"
          opened={opened}
          onClose={close}
          size="xs"
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
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
        >
          <NavBar
            page={page}
            categoryList={categoryList}
            handleDeleteCategory={handleDeleteCategory}
          />
          <Stack pos="absolute" bottom={20} left={20} right={20}>
            <AddCategoryModal handleAddCategory={handleAddCategory} />
            <AddTodoModal
              handleAddTodo={handleAddTodo}
              categoryList={categoryList}
            />
            <AddNoteModal handleAddNote={handleAddNote} />
          </Stack>
        </Drawer>
        <Tooltip
          label="Menu"
          transitionProps={{ transition: "fade", duration: 300 }}
          openDelay={300}
        >
          <ActionIcon
            hiddenFrom="sm"
            variant="light"
            size="xl"
            aria-label="Open Navigation Menu"
            onClick={open}
          >
            <IconMenu />
          </ActionIcon>
        </Tooltip>
        <Group gap={8}>
          <IconChecklist size={32} stroke={2} color="violet" />
          <Text size="xl" fw={700} variant="gradient">
            Todos-to-Do
          </Text>
        </Group>
        <Group ml="auto" visibleFrom="sm">
          <AddCategoryModal handleAddCategory={handleAddCategory} />
          <AddTodoModal
            handleAddTodo={handleAddTodo}
            categoryList={categoryList}
          />
          <AddNoteModal handleAddNote={handleAddNote} />
        </Group>
        <Group ml={{ base: "auto", sm: "sm" }}>
          <ThemeToggle />
        </Group>
      </Group>
    </header>
  )
}

export default Header
