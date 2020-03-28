import { LoadingOutlined, PlusOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Card, List, Typography,Modal,Form, Input,Upload, message } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';

const { Paragraph } = Typography;

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
// 删除对话框
const { confirm } = Modal;
function showDeleteConfirm() {
  confirm({
    title: '确定删除此项目?',
    icon: <ExclamationCircleOutlined />,
    content: '删除后可能造成当下板块的帖子无法正常显示',
    okText: '是的',
    okType: 'danger',
    cancelText: '在考虑一下',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

// 组件
class ListCardList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'listCardList/fetch',
      payload: {
        count: 8,
      },
    });
  }
  state = {
    visible: false,
    loading: false,
  };

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

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    // todo 添加板块
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


  render() {
    const {
      listCardList: { list },
      loading,
    } = this.props;



    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    const onFinish = values => {
      console.log(values);
    };

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          ：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
          提供跨越设计与开发的体验解决方案。
        </p>
        <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
            快速开始
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
            产品简介
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
            产品文档
          </a>
        </div>
      </div>
    );
    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="这是一个标题"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );
    const nullData = {};
    const { imageUrl } = this.state; // 上传图片
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );


    return (
      <div>

        <div>
          <Modal
            centered={true}
            title="添加板块"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Form {...layout} name="nest-messages" onFinish={onFinish} >
              <Form.Item name={['board', 'website']} label="板块图片">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                >
                  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
              </Form.Item>
              <Form.Item name={['board', 'name']} label="板块名称" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name={['board', 'description']} label="板块描述">
                <Input.TextArea />
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <PageHeaderWrapper content={content} extraContent={extraContent}>

          <div className={styles.cardList}>
            <List
              rowKey="id"
              loading={loading}
              grid={{
                gutter: 24,
                lg: 3,
                md: 2,
                sm: 1,
                xs: 1,
              }}
              dataSource={[nullData, ...list]}
              renderItem={item => {
                if (item && item.id) {
                  return (
                    <List.Item key={item.id}>
                      <Card
                        hoverable
                        className={styles.card}
                        actions={[<a key="option1" onClick={this.showModal}>更新</a>, <a key="option2" onClick={showDeleteConfirm}>删除</a>]}

                      >
                        <Card.Meta
                          avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                          title={<a>{item.title}</a>}
                          description={
                            <Paragraph
                              className={styles.item}
                              ellipsis={{
                                rows: 3,
                              }}
                            >
                              {item.description}
                            </Paragraph>
                          }
                        />
                      </Card>
                    </List.Item>
                  );
                }

                return (
                  <List.Item>
                    <Button type="dashed" className={styles.newButton} onClick={this.showModal}>
                      <PlusOutlined /> 新增板块
                    </Button>
                  </List.Item>
                );
              }}
            />
          </div>
        </PageHeaderWrapper>
      </div>
    );
  }
}

export default connect(({ listCardList, loading }) => ({
  listCardList,
  loading: loading.models.listCardList,
}))(ListCardList);
