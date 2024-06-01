import { Stack } from "@mantine/core"
import Todo from "./Todo"
import type { TodoType, NoteType } from "../appLocalStorage/Controller"
import Note from "./Note"

function Main({
  page,
  noteList,
  todos,
  categoryList,
  handleEditTodo,
  handleDeleteTodo,
  handleEditNote,
  handleDeleteNote,
}: {
  page: string
  noteList: NoteType[]
  todos: TodoType[]
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
  handleEditNote: (id: string, title: string, description: string) => void
  handleDeleteNote: (id: string) => void
}) {
  return (
    <main>
      <Stack p="lg">
        {page === "notes"
          ? noteList.map((note) => (
              <Note
                key={note.id}
                id={note.id}
                title={note.title}
                description={note.description}
                handleEditNote={handleEditNote}
                handleDeleteNote={handleDeleteNote}
              />
            ))
          : todos.map((todo) => (
              <Todo
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                dueDate={todo.dueDate}
                priority={todo.priority}
                category={todo.category}
                categoryList={categoryList}
                handleEditTodo={handleEditTodo}
                handleDeleteTodo={handleDeleteTodo}
              />
            ))}
      </Stack>
    </main>
  )
}

export default Main
