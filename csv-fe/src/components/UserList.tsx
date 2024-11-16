import { Table } from "antd"
import React from "react"
import { Layout } from "./Layout"

interface Props {}

export const UserList: React.FC<Props> = () => {
  return (
    <Layout grow>
      <Table bordered columns={[]} dataSource={[]} />
    </Layout>
  )
}
