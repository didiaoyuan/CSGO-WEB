import React from 'react';
import { List, Avatar, Button, Skeleton } from 'antd';
import {connect} from 'dva'

class LoadMoreList extends React.Component {
  // state = {
  //   initLoading: true,
  //   loading: false,
  //   data: [],
  //   list: [],
  // };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type:'userListPage1/getUserTable',
    })
  }


  onLoadMore = () => {
    const { dispatch } = this.props;
    dispatch({
      type:'userListPage1/getUserTable',
    })
  };

  render() {
    const { initLoading, loading, list } = this.props;
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
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={this.props.userListPage1.list}
        renderItem={item => (
          <List.Item
            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
          >
            <Skeleton avatar title={false} loading={false} active>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.userName}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <div>content</div>
            </Skeleton>
          </List.Item>
        )}
      />
    );
  }
}

export default connect(({userListPage1, loading}) => ({
  userListPage1,
  loading: loading.models.userListPage1,
}))(LoadMoreList);

