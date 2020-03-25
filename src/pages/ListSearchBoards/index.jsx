import {
  StarOutlined,
  EditOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Col, Dropdown, List, Menu, Row, Select, Tooltip, Form } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'dva';
import numeral from 'numeral';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';

const { Option } = Select;
export function formatWan(val) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';
  let result = val;

  if (val > 10000) {
    result = (
      <span>
        {Math.floor(val / 10000)}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }

  return result;
}
const formItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const CardInfo = ({ activeUser, newUser }) => (
  <div className={styles.cardInfo}>
    <div>
      <p>今日活跃用户</p>
      <p>{activeUser}</p>
    </div>
    <div>
      <p>今日新增用户</p>
      <p>{newUser}</p>
    </div>
    <div>
      <p>总订阅数</p>
      <p>{newUser}</p>
    </div>
  </div>
);

export const ListSearchBoards = props => {
  const {
    dispatch,
    loading,
    listSearchBoards: { list },
  } = props;
  useEffect(() => {
    dispatch({
      type: 'listSearchBoards/fetch',
      payload: {
        count: 8,
      },
    });
  }, [1]);

  const handleValuesChange = () => {
    dispatch({
      type: 'listSearchBoards/fetch',
      payload: {
        count: 8,
      },
    });
  };

  const itemMenu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.alipay.com/">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.taobao.com/">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.tmall.com/">
          3d menu item
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.filterCardList}>
      <br />
      <List
        rowKey="id"
        grid={{
          gutter: 24,
          xl: 4,
          lg: 3,
          md: 3,
          sm: 2,
          xs: 1,
        }}
        loading={loading}
        dataSource={list}
        renderItem={item => (
          <List.Item key={item.id}>
            <Card
              hoverable
              bodyStyle={{
                paddingBottom: 20,
              }}
              actions={[
                <Tooltip key="start" title="关注">
                  <StarOutlined />
                </Tooltip>,
                <Tooltip key="edit" title="编辑">
                  <EditOutlined />
                </Tooltip>,
                <Tooltip title="分享" key="share">
                  <ShareAltOutlined />
                </Tooltip>,
                <Dropdown key="ellipsis" overlay={itemMenu}>
                  <EllipsisOutlined />
                </Dropdown>,
              ]}
            >
              <Card.Meta avatar={<Avatar size="small" src={item.avatar} />} title={item.title} />
              <div className={styles.cardItemContent}>
                <CardInfo
                  activeUser={formatWan(item.activeUser)}
                  newUser={numeral(item.newUser).format('0,0')}
                />
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default connect(({ listSearchBoards, loading }) => ({
  listSearchBoards,
  loading: loading.models.listSearchBoards,
}))(ListSearchBoards);
