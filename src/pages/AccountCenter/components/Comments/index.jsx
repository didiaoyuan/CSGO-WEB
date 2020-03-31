import { Comment, List,Divider,Button  } from 'antd';
import React from 'react';
import { connect } from 'dva';


const Comments = props => {

  const { dispatch} = props;

  const handleDelete = (target)=>{
    dispatch({
      type: 'accountCenter/removeComments',
      payload: {
        postId: target,
      }
    })
  };

  const {CommentsList} = props;
  return (
    <List
      className="comment-list"
      header={`${CommentsList.length} replies`}
      itemLayout="horizontal"
      dataSource={CommentsList}
      renderItem={item => (
        <li>
          <Comment
            actions={item.actions}
            author={item.author}
            avatar={item.avatar}
            content={item.content}
            datetime={item.datetime}
          />
          <div>
            <Button danger onClick={()=>{
              handleDelete(item.postId)
            }}>删除</Button>
          </div>
          <Divider/>
        </li>
      )}
    />
  );
};

export default connect(({ accountCenter }) => ({
  CommentsList: accountCenter.CommentsList,
}))(Comments);
