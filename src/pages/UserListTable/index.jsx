import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import React from 'react';
import styles from './index.less';
import {connect} from 'dva';
import {Table, Tag, Modal, Button} from 'antd';

const { confirm } = Modal;

class UserListTable extends React.Component {


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

  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  };

  showModal = (e) => {
    this.setState({
      visible: true,
    });
    console.log("显示对话框信息", e)
  };

  handleOk = () => {
    this.setState({
      ModalText: '正在删除ing...',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
    // const {dispatch} = this.props;
    // dispatch({
    //   type: 'userListTable/',
    //   payload: {
    //     userId: 37,
    //   }
    // });
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };



  render() {
    const {visible, confirmLoading, ModalText} = this.state;
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
        render: (text,record) => (
          <span>
        <Button type="primary" onClick={()=>{
          this.showModal(record)
        }} style={{marginRight: 16}} >
          更新
        </Button>
        <Button type="primary" onClick={()=>{
          this.showDeleteConfirm(record)
        }} danger>
          删除
        </Button>
      </span>
        ),
      },
    ];

    // console.log("===", this.props.userListTable.data)
    return (
      <div>
        <Modal
          title="Title"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
        </Modal>
        <PageHeaderWrapper content="" className={styles.main}>
          <div>
            <Table columns={columns} dataSource={this.props.userListTable.data}
                   pagination
            />
          </div>
        </PageHeaderWrapper>
      </div>
    );
  }
}

export default connect(({userListTable, loading}) => ({
  userListTable,
  loading: loading.models.userListTable,
}))(UserListTable);

