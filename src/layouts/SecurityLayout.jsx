import React from 'react';
import { connect } from 'dva';
import { setAuthority } from '@/utils/authority';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'umi';
import { stringify } from 'querystring';
class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
        payload:{
          userId: localStorage.getItem('userId')? JSON.parse(localStorage.getItem('userId')):-1,
        },
      });
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props; // You can replace it to your authentication rule (such as check token exists)
    // todo：登陆认证
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const isLogin = currentUser && currentUser.userid;
    const queryString = stringify({
      redirect: window.location.href,
    });

    // if ((!isLogin && loading) || !isReady) {
    //   return <PageLoading />;
    // }
    //
    // if (!isLogin && window.location.pathname !== '/user/login') {
    //   return <Redirect to={`/user/login?${queryString}`} />;
    // }
    // todo: 查看权限,权限如果是 guest
    // 一会首页currentUser 就为 null
    const checkLogin = localStorage.getItem("antd-pro-authority")
    if(!checkLogin){
      setAuthority('guest')
    }
    return children;
  }
}

export default connect(({ login, loading }) => ({
  currentUser: login.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
