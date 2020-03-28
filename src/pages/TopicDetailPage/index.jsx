import React from 'react';
// import './index.less';
import styles from  './index.less';
import {Typography,Card,Avatar,Comment, Tooltip, List,Divider,Form,Input,Button} from 'antd';
import moment from 'moment';

const {Title,Paragraph,Text} = Typography;

const { TextArea } = Input;
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          评论
      </Button>
    </Form.Item>
  </div>
);
class UserListPage extends React.Component {

  state = {
    comments: [],
    submitting: false,
    value: '',
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      });
    }, 1000);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type:'',
  //     payload:{
  //       id:this.props.location.state.item.id,
  //     }
  //   })
  // };

  render() {
    const getDetail = this.props.location.state.item;
    const data = [
      {
        actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure), to help people create their product prototypes beautifully and
            efficiently.
          </p>
        ),
        datetime: (
          <Tooltip
            title={moment()
              .subtract(1, 'days')
              .format('YYYY-MM-DD HH:mm:ss')}
          >
        <span>
          {moment()
            .subtract(1, 'days')
            .fromNow()}
        </span>
          </Tooltip>
        ),
      },
      {
        actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure), to help people create their product prototypes beautifully and
            efficiently.
          </p>
        ),
        datetime: (
          <Tooltip
            title={moment()
              .subtract(2, 'days')
              .format('YYYY-MM-DD HH:mm:ss')}
          >
        <span>
          {moment()
            .subtract(2, 'days')
            .fromNow()}
        </span>
          </Tooltip>
        ),
      },
    ];
    // 评论框
    const { comments, submitting, value } = this.state;
    return (
      <div>
          <Card>
            <Typography>
              <Title>
                {getDetail.title}
              </Title>
              <Divider/>
              <Paragraph ellipsis={{ rows: 8, expandable: true }}  className={styles.text_align}>
                <Text strong>
                  {getDetail.content}
                </Text>
              </Paragraph>
              <div>
                <Avatar size={25} src={getDetail.avatar} className={styles.usePosition}/><a >{getDetail.owner}</a><span>发布于</span><span><a href="">板块</a></span>
                <span className={styles.usePosition}>{ moment(getDetail.updatedAt).format(`YYYY-MM-DD HH:mm:ss`)}</span>
              </div>
              <Divider/>
              <div>
                评论组件
                <List
                  className="comment-list"
                  header={`${data.length} 个回复`}
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={item => (
                    <li className={styles.styleClear}>
                      <Comment
                        actions={item.actions}
                        author={item.author}
                        avatar={item.avatar}
                        content={item.content}
                        datetime={item.datetime}
                      />
                    </li>
                  )}
                />
              </div>
              回复框
              <div>
                <div>
                  {comments.length > 0 && <CommentList comments={comments} />}
                  <Comment
                    avatar={
                      <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                      />
                    }
                    content={
                      <Editor
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                        submitting={submitting}
                        value={value}
                      />
                    }
                  />
                </div>
              </div>
            </Typography>
          </Card>
      </div>
    );
  }
}

export default UserListPage;
