import React, { Component } from 'react'
import { Upload, message, Button, Icon } from 'antd'
import { faceMerge } from "../api";
import './FaceMerge.scss'

const uploadProps = {
  accept: 'image/*',
  action: '',
  showUploadList: false,
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }
}

export default class FaceMerge extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sourceImg: '',
      previewImg: ''
    }
  }
  handleUpload = (info) => {
    console.log(info.file);
    const file = info.file
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      this.setState({
        sourceImg: reader.result
      })
      console.log(reader.result);

      faceMerge(reader.result.replace('data:image/jpg;base64', ''))
    }
  }
  render() {
    const { sourceImg, previewImg } = this.state
    return (
      <div className="face-merge-container">
        <Upload {...uploadProps} customRequest={this.handleUpload}>
          <Button>
            <Icon type="upload" /> Click to Upload
          </Button>
        </Upload>
        <div className="box source">
          <img src={sourceImg} alt="" />
        </div>
        <div className="box preview">
          <img src={previewImg} alt="" />
        </div>
      </div>
    )
  }
}
