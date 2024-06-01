import { NavLink, ScrollArea, Text } from "@mantine/core"
import {
  IconCategory,
  IconHash,
  IconHourglassEmpty,
  IconNote,
} from "@tabler/icons-react"
import { Link } from "react-router-dom"
import DeleteCategoryModal from "./DeleteCategoryModal"

function NavBar({
  page,
  categoryList,
  handleDeleteCategory,
}: {
  page: string
  categoryList: string[]
  handleDeleteCategory: (category: string) => void
}) {
  return (
    <nav>
      <NavLink
        label="Today"
        description="Tasks due today"
        leftSection={<IconHourglassEmpty size={16} stroke={1.5} />}
        variant="light"
        component={Link}
        to="/today"
        active={page === "today"}
      />
      <NavLink
        label="Category"
        leftSection={<IconCategory size={16} stroke={1.5} />}
        variant="light"
        defaultOpened
        active={page !== "today" && page !== "notes"}
      >
        <ScrollArea.Autosize
          mah={300}
          maw={400}
          mx="auto"
          offsetScrollbars
          type="always"
        >
          {categoryList.map((category) => (
            <NavLink
              key={category}
              label={
                <Text
                  size="sm"
                  component={Link}
                  to={`/${category}`}
                  w="100%"
                  display="inline-block"
                >
                  {category}
                </Text>
              }
              leftSection={
                <Link to={`/${category}`}>
                  <IconHash size={16} stroke={1.5} />
                </Link>
              }
              rightSection={
                category === "General" ? null : (
                  <DeleteCategoryModal
                    category={category}
                    handleDeleteCategory={handleDeleteCategory}
                  />
                )
              }
              variant="light"
              active={page === category}
            />
          ))}
        </ScrollArea.Autosize>
      </NavLink>
      <NavLink
        color="yellow"
        label="Notes"
        leftSection={<IconNote size={16} stroke={1.5} />}
        variant="light"
        component={Link}
        to="/notes"
        active={page === "notes"}
      />
    </nav>
  )
}

export default NavBar
