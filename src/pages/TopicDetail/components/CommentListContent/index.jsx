import React,{Component} from 'react';
import { Comment, List } from 'antd';
import { connect } from 'dva';

class MySelfComment extends Component{


  componentDidMount() {
    const { dispatch} = this.props;
    dispatch({
      type: 'mySelfModel/fetch',
    });
  }

  render() {
    return (
      <List
        className="comment-list"
        header={`${this.state.list.length} replies`}
        itemLayout="horizontal"
        dataSource={this.state.list}
        renderItem={item => (
          <li>
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
    );
  }
}

export default connect(({mySelfModel,loading})=>({
  mySelfModel,
  loading: loading.models.mySelfModel,
}))(MySelfComment);
