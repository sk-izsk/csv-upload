import "antd/dist/antd.css"
import styled from "styled-components"
import { Layout, UploadButtonAndDrawer, UserList } from "./components"

const App = () => {
  return (
    <StyledLayout padding="large" gap="medium" grow>
      <UploadButtonAndDrawer />
      <UserList />
    </StyledLayout>
  )
}

const StyledLayout = styled(Layout)`
  background-color: white;
`

export default App
