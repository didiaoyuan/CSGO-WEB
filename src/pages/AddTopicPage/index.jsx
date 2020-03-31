import { Button, Card, Input, Form, Radio,Select,Upload,message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';

const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 7,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
    md: {
      span: 10,
    },
  },
};
const submitFormLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 10,
      offset: 7,
    },
  },
};

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class AddTopicPage extends React.Component {

    state = {
      loading: false,
    };

    componentDidMount() {
      const { dispatch} = this.props;
      dispatch({
        type: 'addTopicPage/getBoards',
      });
    }

  onFinish = values => {
    console.log("onFinish", values)
    values.userId=Number(JSON.parse(localStorage.getItem('userId')));
    const { dispatch } = this.props;
    dispatch({
      type: 'addTopicPage/submitRegularForm',
      payload: values,
    });
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  onValuesChange = changedValues => {
      console.log(changedValues)
  };

  // 图片
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {

    const { imageUrl } = this.state; // 上传图片
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (<PageHeaderWrapper content={<FormattedMessage id="addtopicpage.basic.description" />}>
    <Card bordered={false}>
      <Form
        hideRequiredMark
        style={{
          marginTop: 8,
        }}
        name="basic"
        initialValues={{
          public: '1',
        }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        onValuesChange={this.onValuesChange}
      >
        <Form.Item
          {...formItemLayout}
          label={<FormattedMessage id="addtopicpage.title.label" />}
          name="topicTitle"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'addtopicpage.title.required',
              }),
            },
          ]}
        >
          <Input
            placeholder={formatMessage({
              id: 'addtopicpage.title.placeholder',
            })}
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={<FormattedMessage id="addtopicpage.goal.label" />}
          name="content"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'addtopicpage.goal.required',
              }),
            },
          ]}
        >
          <TextArea
            style={{
              minHeight: 32,
            }}
            placeholder={formatMessage({
              id: 'addtopicpage.goal.placeholder',
            })}
            rows={10}
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={<FormattedMessage id="addtopicpage.select.board" />}
          name="boardId"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'addtopicpage.goal.required',
              }),
            },
          ]}
        >
          <Select
            // mode="multiple"
            placeholder="选择发布的板块"
            style={{ width: '100%' }}
          >
            {this.props.addTopicPage.list.map(item => (
              <Select.Option key={item.id} value={item.id}>
                {item.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={<FormattedMessage id="addtopicpage.image.topicImg" />}
          // name="topicImg"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'addtopicpage.goal.required',
              }),
            },
          ]}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
            value="http://ww1.sinaimg.cn/large/006rAlqhgy1gdd9t5u3alj30b40b4js3.jpg"
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={<FormattedMessage id="addtopicpage.public.label" />}
          help={<FormattedMessage id="addtopicpage.label.help" />}
          name="publicType"
        >
          <div>
            <Radio.Group>
              <Radio value="1" checked>
                <FormattedMessage id="addtopicpage.radio.public" />
              </Radio>
              <Radio value="2">
                <FormattedMessage id="addtopicpage.radio.partially-public" />
              </Radio>
              <Radio value="3">
                <FormattedMessage id="addtopicpage.radio.private" />
              </Radio>
            </Radio.Group>

          </div>
        </Form.Item>
        <Form.Item
          {...submitFormLayout}
          style={{
            marginTop: 32,
          }}
        >
          <Button type="primary" htmlType="submit" >
            <FormattedMessage id="addtopicpage.form.submit" />
          </Button>
          <Button
            style={{
              marginLeft: 8,
            }}
          >
            <FormattedMessage id="addtopicpage.form.save" />
          </Button>
        </Form.Item>
      </Form>
    </Card>
  </PageHeaderWrapper>);
  }
}

export default connect(({ addTopicPage, loading }) => ({
  addTopicPage,
  loading: loading.models.addTopicPage,
}))(AddTopicPage);
