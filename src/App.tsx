import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"
import {
  Container,
  Text,
  MantineProvider,
  Overlay,
  ScrollArea,
  Space,
  createTheme,
} from "@mantine/core"
import { useParams } from "react-router-dom"
import Header from "./components/Header"
import NavBar from "./components/NavBar"
import Main from "./components/Main"
import Controller from "./appLocalStorage/Controller"
import { useCallback, useState } from "react"
import type { TodoType, NoteType } from "./appLocalStorage/Controller"

const theme = createTheme({
  primaryColor: "grape",
  defaultRadius: "md",
  defaultGradient: { from: "grape", to: "violet", deg: 90 },
})

const localStore = new Controller()

export default function App() {
  const [todoList, setTodoList] = useState<TodoType[]>(() =>
    localStore.getTodoList(),
  )
  const [categoryList, setCategoryList] = useState<string[]>(() =>
    localStore.getCategoryList(),
  )
  const [noteList, setNoteList] = useState<NoteType[]>(() =>
    localStore.getNoteList(),
  )

  const { page } = useParams()

  const todos: TodoType[] = []
  if (page !== "notes") {
    todoList.forEach((todo) => {
      if (page === "today") {
        const today = new Date()
        if (todo.dueDate === today.toLocaleDateString()) todos.push(todo)
      } else {
        if (todo.category === page) todos.push(todo)
      }
    })
  }

  const handleAddCategory = useCallback((category: string) => {
    localStore.addCategory(category)
    setCategoryList(localStore.getCategoryList())
  }, [])

  const handleDeleteCategory = useCallback((category: string) => {
    localStore.deleteCategory(category)
    setCategoryList(localStore.getCategoryList())
  }, [])

  const handleAddTodo = useCallback(
    (
      title: string,
      description: string,
      dueDate: string,
      priority: string,
      category: string,
    ) => {
      localStore.addTodo(title, description, dueDate, priority, category)
      setTodoList(localStore.getTodoList())
    },
    [],
  )

  const handleEditTodo = useCallback(
    (
      id: string,
      title: string,
      description: string,
      dueDate: string,
      priority: string,
      category: string,
    ) => {
      localStore.editTodo(id, title, description, dueDate, priority, category)
      setTodoList(localStore.getTodoList())
    },
    [],
  )

  const handleDeleteTodo = useCallback((id: string) => {
    localStore.deleteTodo(id)
    setTodoList(localStore.getTodoList())
  }, [])

  const handleAddNote = useCallback((title: string, description: string) => {
    localStore.addNote(title, description)
    setNoteList(localStore.getNoteList())
  }, [])

  const handleEditNote = useCallback(
    (id: string, title: string, description: string) => {
      localStore.editNote(id, title, description)
      setNoteList(localStore.getNoteList())
    },
    [],
  )

  const handleDeleteNote = useCallback((id: string) => {
    localStore.deleteNote(id)
    setNoteList(localStore.getNoteList())
  }, [])

  return (
    <MantineProvider theme={theme}>
      <Overlay fixed h="min-content" backgroundOpacity={0.01} blur={4}>
        <Header
          page={page ?? ""}
          categoryList={categoryList}
          handleAddCategory={handleAddCategory}
          handleDeleteCategory={handleDeleteCategory}
          handleAddTodo={handleAddTodo}
          handleAddNote={handleAddNote}
        />
      </Overlay>
      <Container
        p={0}
        w={300}
        pos="fixed"
        top={100}
        bottom={0}
        visibleFrom="sm"
      >
        <NavBar
          page={page ?? ""}
          categoryList={categoryList}
          handleDeleteCategory={handleDeleteCategory}
        />
      </Container>
      <ScrollArea.Autosize
        mah={800}
        pos="fixed"
        left={{ base: 1, sm: 300 }}
        top={0}
        bottom={0}
        right={0}
        miw={350}
        offsetScrollbars
      >
        <Space h={80} />
        <Text hiddenFrom="sm" mt={20} ml={20}>
          {page === "today" ? "Due Today" : page === "notes" ? "Notes" : page}
        </Text>
        <Main
          page={page ?? ""}
          noteList={noteList}
          todos={todos}
          categoryList={categoryList}
          handleEditTodo={handleEditTodo}
          handleDeleteTodo={handleDeleteTodo}
          handleEditNote={handleEditNote}
          handleDeleteNote={handleDeleteNote}
        />
      </ScrollArea.Autosize>
    </MantineProvider>
  )
}
