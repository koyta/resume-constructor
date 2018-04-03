import React from 'react'
import { Upload, Icon, message } from 'antd'
import PropTypes from 'prop-types'


const Dragger = Upload.Dragger

export default class DragDrop extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    multiple: PropTypes.bool.isRequired,
    action: PropTypes.string.isRequired,
    onChange: PropTypes.func
  }

  static defaultTypes = {
    name: `Photo_${Math.random()}`,
    multiple: false
  }

  render () {
    return (
      <Dragger>
        <p className="upload-drag-icon">
          <Icon type="inbox"/>
        </p>
        <p className="upload-text">Click or drag file to this area to upload</p>
        <p className="upload-hint">Support for a single upload. Better if photo
          size is rectangle, like 500x500</p>
      </Dragger>
    )
  }
}
