import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { List,Modal,Form,Input,Checkbox,Button } from 'antd';

const passwordStrength = {
  strong: (
    <span className="strong">
      <FormattedMessage id="accountsettings.security.strong" defaultMessage="Strong" />
    </span>
  ),
  medium: (
    <span className="medium">
      <FormattedMessage id="accountsettings.security.medium" defaultMessage="Medium" />
    </span>
  ),
  weak: (
    <span className="weak">
      <FormattedMessage id="accountsettings.security.weak" defaultMessage="Weak" />
      Weak
    </span>
  ),
};


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


class SecurityView extends Component {

  state = {
    visible: false
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  changePassword=()=>{

  };

  onFinish=()=>{

  }

  getData = () => [
    {
      title: formatMessage(
        {
          id: 'accountsettings.security.password',
        },
        {},
      ),
      description: (
        <>
          {formatMessage({
            id: 'accountsettings.security.password-description',
          })}
          ：{passwordStrength.strong}
        </>
      ),
      actions: [
        <a key="Modify" onClick={this.showModal}>
          <FormattedMessage id="accountsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountsettings.security.phone',
        },
        {},
      ),
      description: `${formatMessage(
        {
          id: 'accountsettings.security.phone-description',
        },
        {},
      )}：138****8293`,
      actions: [
        <a key="Modify">
          <FormattedMessage id="accountsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountsettings.security.question',
        },
        {},
      ),
      description: formatMessage(
        {
          id: 'accountsettings.security.question-description',
        },
        {},
      ),
      actions: [
        <a key="Set">
          <FormattedMessage id="accountsettings.security.set" defaultMessage="Set" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountsettings.security.email',
        },
        {},
      ),
      description: `${formatMessage(
        {
          id: 'accountsettings.security.email-description',
        },
        {},
      )}：ant***sign.com`,
      actions: [
        <a key="Modify">
          <FormattedMessage id="accountsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountsettings.security.mfa',
        },
        {},
      ),
      description: formatMessage(
        {
          id: 'accountsettings.security.mfa-description',
        },
        {},
      ),
      actions: [
        <a key="bind">
          <FormattedMessage id="accountsettings.security.bind" defaultMessage="Bind" />
        </a>,
      ],
    },
  ];

  render() {

    const data = this.getData();
    return (
      <>
        <div>
          <Modal
            title="修改密码"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer
          >
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="PasswordAgain"
                name="passwordAgain"
                rules={[{ required: true, message: 'Please input your password agin!' }]}
              >
                <Input.Password />
              </Form.Item>


              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </>
    );
  }
}

export default SecurityView;
