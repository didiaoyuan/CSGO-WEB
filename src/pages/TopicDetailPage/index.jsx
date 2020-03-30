import React from 'react';
// import './index.less';
import styles from  './index.less';
import {Typography,Card,Avatar,Comment, List,Divider,Form,Input,Button} from 'antd';
import moment from 'moment';
import {connect} from 'dva';

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
class TopicDetailPage extends React.Component {

  state = {
    comments: [],
    submitting: false,
    value: '',
  };
  
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'commentListModel/getCommentLit',
      payload: {
        topicId: Number(this.props.location.state.item.id),
      }
    });
  };


  handleSubmit = (e) => {
   

    if (!this.state.value) {
      return;
    }
    const {dispatch} = this.props;
    // console.log(!this.state.value)
    
    this.setState({
      submitting: true,
    });
    dispatch({
      type:'commentListModel/addComment',
      payload:{
        content:this.state.value,
        topicId:e.id,
        userId:Number(localStorage.getItem('userId')),
      }
    }).then(res=>{
      console.log(res)
      if(res.status==='ok'){
        dispatch({
          type: 'commentListModel/getCommentLit',
          payload: {
            topicId: Number(this.props.location.state.item.id),
          }
        });
      }
    });
    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            author: JSON.parse(localStorage.getItem('currentUser')).name,
            avatar: JSON.parse(localStorage.getItem('currentUser')).avatar,
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

  render() {
    const getDetail = this.props.location.state.item;
    
    // 评论框
    const { comments, submitting, value } = this.state;
    const list = this.props.commentListModel.list;
    console.log("comments",list);
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
                <div>
                  {list.length > 0 && <CommentList comments={list} />}
                  <Comment
                    avatar={
                      <Avatar
                        src={JSON.parse(localStorage.getItem('currentUser')).avatar}
                        alt="头像"
                      />
                    }
                    content={
                      <Editor
                        onChange={this.handleChange}
                        onSubmit={()=>{
                          this.handleSubmit(getDetail)
                        }}
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

export default connect(({commentListModel,loading})=>({
  commentListModel,
  loading:loading.models.commentListModel,
}))(TopicDetailPage);
