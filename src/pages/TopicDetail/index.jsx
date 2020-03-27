
import React from 'react';
import { List, Avatar,Button, Skeleton } from 'antd';
// import reqwest from 'reqwest'; //类似 axios request 请求组件


const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

class hello extends React.Component{
  // 有状态
  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  };
  // 加载后生命周期

  componentDidMount() {
    this.getData(res => {
      this.setState({
        initLoading: false,
        data: res.results,
        list: res.results,
      });
    });
  }

  // 请求
  getData = callback => {
    // reqwest({
    //   url: fakeDataUrl,
    //   type: 'json',
    //   method: 'get',
    //   contentType: 'application/json',
    //   success: res => {
    //     callback(res);
    //   },
    // });
  };
  // 加载更多的函数

  onLoadMore = () => {
    this.setState({
      loading: true,
      list: this.state.data.concat(
        [...new Array(count)].map(() =>
          ({
            loading: true,
            name: {}
          })
        )),
    });
    this.getData(res => {
      const data = this.state.data.concat(res.results);
      this.setState(
        {
          data,
          list: data,
          loading: false,
        },
        () => {
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event('resize'));
        },
      );
    });
  };

  render() {
    // render 里面创建 state 状态变量
    const { initLoading, loading, list } = this.state;
    // 加载更多的一个显示组件
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
    return (<List
      className="demo-loadmore-list"  // class
      loading={initLoading}
      itemLayout="horizontal" // item 布局
      loadMore={loadMore}     // 加载更多显示
      dataSource={list}     // 数据源
      renderItem={item => (   // 渲染Item
        <List.Item
          actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}  // 后面的操作
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href="https://ant.design">{item.name.last}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
            <div>content</div>
          </Skeleton>
        </List.Item>
      )}
    />);
  };
}

export default hello;
