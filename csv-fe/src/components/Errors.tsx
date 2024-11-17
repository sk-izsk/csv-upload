import { Typography } from "antd"
import React from "react"
import { Layout } from "./Layout"

interface Props {
  file?: File
}

const { Text } = Typography

export const Errors: React.FC<Props> = ({ file }) => {
  return (
    <Layout>
      <Text type="danger">hello</Text>
    </Layout>
  )
}
