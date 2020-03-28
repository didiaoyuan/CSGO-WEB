import React, {useEffect} from 'react';
import {Button, Card, List, Tag} from 'antd';
import {LoadingOutlined, StarOutlined, LikeOutlined, MessageOutlined} from '@ant-design/icons';
import {connect} from 'dva';
import ArticleListContent from './components/ArticleListContent';
import styles from './style.less';
import history from "@/pages/.umi/history";
const pageSize = 3;
let initNo = 0;
const ListSearchArticles = (
  {
    dispatch, listSearchArticles: {list}, loading}

    ) => {
  useEffect(() => {
    dispatch({
      type: 'listSearchArticles/fetch',
      payload: {
        initCount:initNo, // 初始页码
        count: 3, // 加载条数
      },
    });
  }, []);


  const fetchMore = () => {
    dispatch({
      type: 'listSearchArticles/appendFetch',
      payload: {
        initCount: ++initNo,
        count: pageSize,
      },
    });
  };

  const IconText = ({type, text}) => {
    switch (type) {
      case 'star-o':
        return (
          <span>
            <StarOutlined
              style={{
                marginRight: 8,
              }}
            />
            {text}
          </span>
        );

      case 'like-o':
        return (
          <span>
            <LikeOutlined
              style={{
                marginRight: 8,
              }}
            />
            {text}
          </span>
        );

      case 'message':
        return (
          <span>
            <MessageOutlined
              style={{
                marginRight: 8,
              }}
            />
            {text}
          </span>
        );

      default:
        return null;
    }
  };


  const loadMore = list.length > 0 && (
    <div
      style={{
        textAlign: 'center',
        marginTop: 16,
      }}
    >
      <Button
        onClick={fetchMore}
        style={{
          paddingLeft: 48,
          paddingRight: 48,
        }}
      >
        {loading ? (
          <span>
            <LoadingOutlined/> 加载中...
          </span>
        ) : (
          '加载更多'
        )}
      </Button>
    </div>
  );

  return (
    <>
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
          loading={list.length === 0 ? loading : false}
          rowKey="id"
          itemLayout="vertical"
          loadMore={loadMore}
          dataSource={list}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <IconText key="star" type="star-o"  text={item.star}/>,
                <IconText key="like" type="like-o" text={item.like}/>,
                <IconText key="message" type="message" text={item.message}/>,
              ]}
              extra={
                <div className={styles.listItemExtra}>
                  <img
                    width={272}
                    alt="logo"
                    src={item.titleImg}
                  />
                </div>
              }
            >
              <List.Item.Meta
                title={
                  <a className={styles.listItemMetaTitle} onClick={()=>
                  {
                    console.log(item);
                    history.replace(
                    {
                      pathname: '/TopicDetailPage',
                      state:{
                        item,
                      }
                    }
                  ) }}>
                    {item.title}
                  </a>

                }
                description={
                  <span>
                    <Tag>推荐</Tag>
                    <Tag>React</Tag>
                    <Tag>随笔</Tag>
                  </span>
                }
              />
              <ArticleListContent data={item}/>
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default connect(({listSearchArticles, loading}) => ({
  listSearchArticles,
  loading: loading.models.listSearchArticles,
}))(ListSearchArticles);
