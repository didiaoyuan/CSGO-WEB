import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import React from 'react';
import styles from './index.less';
import {connect} from 'dva';
import {Table, Tag, Modal, Button, Form, Input, InputNumber, Card} from 'antd';

const {confirm} = Modal;


class UserListTable extends React.Component {

  state = {
    visible: false,
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'userListTable/getUserTable',
    });
  }

  // 删除对话框函数

  showDeleteConfirm = (record) => {
    const {dispatch} = this.props;
    confirm({
      title: '确定删除此用户?',
      icon: <ExclamationCircleOutlined/>,
      content: '删除后可能造成用户无法正常登陆',
      okType: 'danger',
      cancelText: '在考虑一下',
      okText: '删除此用户',

      onOk() {
        dispatch({
          type: 'userListTable/removeUser',
          payload: {
            userId: record.key,
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // 更新对话框


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });

  };

  handleCancel = () => {
    console.log('Clicked cancel');
    this.setState({
      visible: false,
    });
  };

  aMethod=(param)=>{
    console.log(param);

    this.setState({
      visible: false,
      confirmLoading: false,
      requestParam:param,
    });
    const {dispatch} = this.props;
    dispatch({
      type: 'userListTable/updateUser',
      payload: param
    });
  };

  submitUpdate=()=>{
    console.log(this.props.requestParam)
  }


  render() {
    const {
      visible,
      confirmLoading,userInfo,requestParam
    } = this.state;

    const {data} = this.props;
    const columns = [
      {
        title: '姓名',
        dataIndex: 'userName',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: '积分',
        dataIndex: 'credit',
        key: 'credit',
      },
      {
        title: '邮箱',
        dataIndex: 'userEmail',
        key: 'address',
      }, {
        title: '电话',
        dataIndex: 'mobile',
        key: 'mobile',
      },
      {
        title: '标签',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
        <Button type="primary" onClick={() => {
          this.setState({
            userInfo: record,
          });
          this.showModal(record)
        }} style={{marginRight: 16}}>
          更新
        </Button>
        <Button type="primary" onClick={() => {
          this.showDeleteConfirm(record)
        }} danger>
          删除
        </Button>
      </span>
        ),
      },
    ];
    const layout = {
      labelCol: {span: 8},
      wrapperCol: {span: 16},
    };
    const validateMessages = {
      required: 'This field is required!',
      types: {
        email: '不是邮箱格式!',
      },
      // number: {
      //   range: 'Must be between ${min} and ${max}',
      // },
    };

    return (
      <div>
        <PageHeaderWrapper>
          <Modal
            title="更新用户信息"
            visible={visible}
            onOk={()=>{
              this.handleOk()
            }}
            confirmLoading={confirmLoading}
            onCancel={()=>{
              this.handleCancel()
            }}
            footer={null}
            destroyOnClose
          >
            <div>
              <Form {...layout} name="nest-messages" validateMessages={validateMessages} onFinish={this.aMethod}>
                <Form.Item name={['user', 'key']} label="key" >
                  <Input placeholder={userInfo  && userInfo.key} />
                </Form.Item>
                <Form.Item name={['user', 'userName']} label="用户名称" rules={[{required: true}]}>
                  <Input placeholder={userInfo  && userInfo.userName}/>
                </Form.Item>
                <Form.Item name={['user', 'credit']} label="积分">
                  <InputNumber min={0} placeholder={userInfo  && userInfo.credit} rules={[{required: true}]} />
                </Form.Item>
                <Form.Item name={['user', 'userEmail']} label="邮箱" rules={[{type: 'email',required: true}]} >

                  <Input placeholder={userInfo  && userInfo.userEmail}/>
                </Form.Item>
                <Form.Item name={['user', 'mobile']} label="电话" rules={[{required: true}]}>
                  <Input placeholder={userInfo  && userInfo.mobile}/>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit" onClick={()=>{
                    this.submitUpdate(requestParam)
                  }}>
                    确定
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Modal>
          <Card
            style={{
              marginTop: 24,
            }}
            bordered={false}
            bodyStyle={{
              padding: '8px 32px 32px 32px',
            }}
          >
            <Table bordered columns={columns} dataSource={this.props.userListTable.data}
                   style={{marginTop: 15}}
            />
          </Card>
        </PageHeaderWrapper>
      </div>
    );
  }
}

export default connect(({userListTable, loading}) => ({
  userListTable,
  loading: loading.models.userListTable,
}))(UserListTable);

