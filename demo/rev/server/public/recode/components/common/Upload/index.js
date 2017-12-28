'use strict';

var _antd = require('antd');

var props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text'
  },
  text: '上传简历',
  onChange: function onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      _antd.message.success(info.file.name + ' file uploaded successfully');
    } else if (info.file.status === 'error') {
      _antd.message.error(info.file.name + ' file upload failed.');
    }
  }
};

ReactDOM.render(React.createElement(
  _antd.Upload,
  props,
  React.createElement(
    _antd.Button,
    null,
    React.createElement(_antd.Icon, { type: 'upload' }),
    props.text
  )
), mountNode);