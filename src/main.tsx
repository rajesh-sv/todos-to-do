import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/today" replace={true} />,
  },
  {
    path: "/:page",
    element: <App />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
