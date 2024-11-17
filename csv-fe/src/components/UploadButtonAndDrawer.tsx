import { InboxOutlined } from "@ant-design/icons"
import { useBoolean } from "ahooks"
import { Button, message, Modal, Upload, UploadProps } from "antd"
import React, { useState } from "react"
import { Errors } from "./Errors"
import { Layout } from "./Layout"

interface Props {}

const { Dragger } = Upload

export const UploadButtonAndDrawer: React.FC<Props> = () => {
  const [isModalOpen, { setTrue: openModal, setFalse: closeModal }] =
    useBoolean()

  const [error, setError] = useState<File | undefined>()

  const props: UploadProps = {
    name: "file",
    multiple: false,
    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file
      if (status !== "uploading") {
        console.log(info.file, info.fileList)
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log("e: ", typeof e.dataTransfer.files[0])
      console.log("Dropped files", e.dataTransfer.files[0])
      setError(e.dataTransfer.files[0])
    },
    onRemove: () => {
      setError(undefined)
    },
  }
  return (
    <Layout grow horizontal justifyContent="flex-end">
      <Layout>
        <Button type="primary" onClick={openModal}>
          Upload CSV
        </Button>
        <Modal centered open={isModalOpen} onCancel={closeModal} destroyOnClose>
          <Layout padding="medium" grow>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
              </p>
            </Dragger>
            {error && (
              <Layout paddingTop="small">
                <Errors file={error} />
              </Layout>
            )}
          </Layout>
        </Modal>
      </Layout>
    </Layout>
  )
}
