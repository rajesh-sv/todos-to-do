type TodoType = {
  id: string
  title: string
  description: string
  dueDate: string
  priority: string
  category: string
}

type NoteType = {
  id: string
  title: string
  description: string
}

class Controller {
  private todoMap: Map<string, TodoType>
  private noteMap: Map<string, NoteType>
  private categories: Set<string>

  constructor() {
    this.todoMap = new Map()
    const todoList = JSON.parse(
      localStorage.getItem(import.meta.env.VITE_TODO_LIST_KEY ?? "todoList") ??
        "[]",
    )
    for (const [key, value] of todoList) {
      this.todoMap.set(key, value)
    }

    this.noteMap = new Map()
    const noteList = JSON.parse(
      localStorage.getItem(import.meta.env.VITE_NOTE_LIST_KEY ?? "noteList") ??
        "[]",
    )
    for (const [key, value] of noteList) {
      this.noteMap.set(key, value)
    }

    this.categories = new Set(
      JSON.parse(
        localStorage.getItem(
          import.meta.env.VITE_CATEGORY_LIST_KEY ?? "categoryList",
        ) ?? "[]",
      ),
    )

    if (this.categories.size === 0) this.addCategory("General")
  }

  getTodoList(): TodoType[] {
    return Array.from(this.todoMap.values())
  }

  modifyTodoLocalStore() {
    const todoList = []
    for (const pair of this.todoMap.entries()) {
      todoList.push(pair)
    }

    localStorage.setItem(
      import.meta.env.VITE_TODO_LIST_KEY ?? "todoList",
      JSON.stringify(todoList),
    )
  }

  addTodo(
    title: string,
    description: string,
    dueDate: string,
    priority: string,
    category: string,
  ) {
    const todo = {
      id: self.crypto.randomUUID(),
      title,
      description,
      dueDate,
      priority,
      category,
    }
    this.todoMap.set(todo.id, todo)
    this.modifyTodoLocalStore()
  }

  editTodo(
    id: string,
    title: string,
    description: string,
    dueDate: string,
    priority: string,
    category: string,
  ) {
    const todo = this.todoMap.get(id)
    if (!todo) return
    todo.title = title
    todo.description = description
    todo.dueDate = dueDate
    todo.priority = priority
    todo.category = category
    this.modifyTodoLocalStore()
  }

  deleteTodo(id: string) {
    this.todoMap.delete(id)
    this.modifyTodoLocalStore()
  }

  getNoteList(): NoteType[] {
    return Array.from(this.noteMap.values())
  }

  modifyNoteLocalStore() {
    const noteList = []
    for (const pair of this.noteMap.entries()) {
      noteList.push(pair)
    }

    localStorage.setItem(
      import.meta.env.VITE_NOTE_LIST_KEY ?? "noteList",
      JSON.stringify(noteList),
    )
  }

  addNote(title: string, description: string) {
    const note = {
      id: self.crypto.randomUUID(),
      title,
      description,
    }
    this.noteMap.set(note.id, note)
    this.modifyNoteLocalStore()
  }

  editNote(id: string, title: string, description: string) {
    const note = this.noteMap.get(id)
    if (!note) return
    note.title = title
    note.description = description
    this.modifyNoteLocalStore()
  }

  deleteNote(id: string) {
    this.noteMap.delete(id)
    this.modifyNoteLocalStore()
  }

  modifyCategoryLocalStore() {
    localStorage.setItem(
      import.meta.env.VITE_CATEGORY_LIST_KEY ?? "categoryList",
      JSON.stringify(Array.from(this.categories)),
    )
  }

  getCategoryList(): string[] {
    return Array.from(this.categories)
  }

  addCategory(category: string) {
    this.categories.add(category)
    this.modifyCategoryLocalStore()
  }

  deleteCategory(category: string) {
    const deleteTodoIds = []
    for (const key of this.todoMap.keys()) {
      const value = this.todoMap.get(key)
      if (value && value.category === category) deleteTodoIds.push(key)
    }

    for (const todoId of deleteTodoIds) this.deleteTodo(todoId)

    this.categories.delete(category)
    this.modifyCategoryLocalStore()
  }
}

export type { TodoType, NoteType }

export default Controller
