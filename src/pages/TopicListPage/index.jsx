import React from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {List, Avatar, Button, Skeleton,Card,Modal} from 'antd';
import {connect} from 'dva'
import history from "@/pages/.umi/history";
import {ExclamationCircleOutlined} from '@ant-design/icons';

const { confirm } = Modal;

class LoadMoreList extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  };

  // 删除对话框函数

  showDeleteConfirm = (record) => {
    const {dispatch} = this.props;

    confirm({
      title: '确定删除此话题?',
      icon: <ExclamationCircleOutlined/>,
      content: '删除后可能造成所有评论无法找到当前帖子',
      okType: 'danger',
      cancelText: '在考虑一下',
      okText: '删除此话题',

      onOk() {
        console.log(record)
        dispatch({
          type: 'topicListModel/removeTopic',
          payload: {
            topicId: String(record.id),
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'topicListModel/getTopicList',
    })
  }


  onLoadMore = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'topicListModel/getTopicList',
    })
  };

  render() {
    const {initLoading, loading, list} = this.props;
    console.log(this.props.topicListModel.list)
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={this.onLoadMore}>loading more</Button>
        </div>
      ) : null;
    return (
      <div>
        <PageHeaderWrapper>
          <Card
            style={{
              marginTop: 24,
            }}
            bordered={false}
            bodyStyle={{
              padding: '8px 32px 32px 32px',
            }}
          >
            <List
              size="large"
              className="demo-loadmore-list"
              loading={initLoading}
              itemLayout="horizontal"
              loadMore={loadMore}
              dataSource={this.props.topicListModel.list}
              renderItem={item => (
                <List.Item
                  actions={[<a key="list-loadmore-edit">more</a>,
                    <Button  onClick={() => {
                      this.showDeleteConfirm(item)
                    }} danger>
                      删除
                    </Button>
                  ]}
                >
                  <Skeleton avatar title={false} loading={false} active>
                    <List.Item.Meta
                      avatar={
                        <Avatar src={item.avatar}/>
                      }
                      title={<a href="" onClick={()=>
                      {
                        history.replace({
                          pathname:'/TopicDetailPage',
                          state:{
                            item,
                          }
                        })
                      }} >{item.title}</a>}
                      description={item.description}
                    />

                  </Skeleton>
                </List.Item>
              )}
            />
          </Card>
        </PageHeaderWrapper>
      </div>

    );
  }
}

export default connect(({topicListModel, loading}) => ({
  topicListModel,
  loading: loading.models.topicListModel,
}))(LoadMoreList);

