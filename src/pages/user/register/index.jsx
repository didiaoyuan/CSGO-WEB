import { Form, Button, Col, Input, Popover, Progress, Row, Select, message } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { useState, useEffect } from 'react';
import { Link, router } from 'umi';
import { connect } from 'dva';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
// 密码强度状态提示
const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="userandregister.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="userandregister.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="userandregister.strength.short" />
    </div>
  ),
};
const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};
// userAndregister 是 service 对象返回属性
const Register = ({ submitting, dispatch, userAndregister }) => {
  const [count, setcount] = useState(0);
  const [visible, setvisible] = useState(false);
  const [prefix, setprefix] = useState('86');
  const [popover, setpopover] = useState(false);
  const confirmDirty = false;
  let interval;
  const [form] = Form.useForm();// antd Form 组件对象
  useEffect(() => {
    if (!userAndregister) {
      return;
    }

    const account = form.getFieldValue('mail');

    if (userAndregister.status === 'ok') {
      userAndregister.status="";
      message.success('注册成功！'); // antd  message 提示组件
      // umi router 路由跳转
      router.push({
        pathname: '/user/register-result',
        state: {
          account,
        },
      });
    }else{
      message.destroy('注册失败！'); // antd  message 提示组件
      // // umi router 路由跳转
      // router.push({
      //   pathname: '/user/register-result',
      //   state: {
      //     account,
      //   },
      // });
    }
  }, [userAndregister]);
  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [],
  );
// 验证码
  const onGetCaptcha = () => {
    let counts = 59;
    setcount(counts);
    interval = window.setInterval(() => {
      counts -= 1;
      setcount(counts);

      if (counts === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };
  // 获取密码强度状态
  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');

    if (value && value.length > 9) {
      return 'ok';
    }

    if (value && value.length > 5) {
      return 'pass';
    }

    return 'poor';
  };
  // 提交的 action
  const onFinish = values => {
    dispatch({
      type: 'userAndregister/submit',
      payload: { ...values, prefix },
    });
  };
// 检查密码是否相同
  const checkConfirm = (_, value) => {
    const promise = Promise;

    if (value && value !== form.getFieldValue('password')) {
      return promise.reject(
        formatMessage({
          id: 'userandregister.password.twice',
        }),
      );
    }

    return promise.resolve();
  };

  const checkPassword = (_, value) => {
    const promise = Promise; // 没有值的情况

    if (!value) {
      setvisible(!!value);
      return promise.reject(
        formatMessage({
          id: 'userandregister.password.required',
        }),
      );
    } // 有值的情况

    if (!visible) {
      setvisible(!!value);
    }

    setpopover(!popover);

    if (value.length < 6) {
      return promise.reject('');
    }

    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }

    return promise.resolve();
  };
  // 检查前缀
  const changePrefix = value => {
    setprefix(value);
  };
 // 渲染密码长度特效
  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };
  // jsx 渲染整个注册页面
  return (
    <div className={styles.main}>
      <h3>
        <FormattedMessage id="userandregister.register.register" />
      </h3>
      <Form form={form} name="UserRegister" onFinish={onFinish}>
        <FormItem
          name="userEmail"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'userandregister.email.required',
              }),
            },
            {
              type: 'email',
              message: formatMessage({
                id: 'userandregister.email.wrong-format',
              }),
            },
          ]}
        >
          <Input
            size="large"
            placeholder={formatMessage({
              id: 'userandregister.email.placeholder',
            })}
          />
        </FormItem>
        <Popover
          getPopupContainer={node => {
            if (node && node.parentNode) {
              return node.parentNode;
            }

            return node;
          }}
          content={
            visible && (
              <div
                style={{
                  padding: '4px 0',
                }}
              >
                {passwordStatusMap[getPasswordStatus()]}
                {renderPasswordProgress()}
                <div
                  style={{
                    marginTop: 10,
                  }}
                >
                  <FormattedMessage id="userandregister.strength.msg" />
                </div>
              </div>
            )
          }
          overlayStyle={{
            width: 240,
          }}
          placement="right"
          visible={visible}
        >
          <FormItem
            name="password"
            className={
              form.getFieldValue('password') &&
              form.getFieldValue('password').length > 0 &&
              styles.password
            }
            rules={[
              {
                validator: checkPassword,
              },
            ]}
          >
            <Input
              size="large"
              type="password"
              placeholder={formatMessage({
                id: 'userandregister.password.placeholder',
              })}
            />
          </FormItem>
        </Popover>
        <FormItem
          name="confirm"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'userandregister.confirm-password.required',
              }),
            },
            {
              validator: checkConfirm,
            },
          ]}
        >
          <Input
            size="large"
            type="password"
            placeholder={formatMessage({
              id: 'userandregister.confirm-password.placeholder',
            })}
          />
        </FormItem>
        <InputGroup compact>
          <Select
            size="large"
            value={prefix}
            onChange={changePrefix}
            style={{
              width: '20%',
            }}
          >
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
          </Select>
          <FormItem
            style={{
              width: '80%',
            }}
            name="mobile"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'userandregister.phone-number.required',
                }),
              },
              {
                pattern: /^\d{11}$/,
                message: formatMessage({
                  id: 'userandregister.phone-number.wrong-format',
                }),
              },
            ]}
          >
            <Input
              size="large"
              placeholder={formatMessage({
                id: 'userandregister.phone-number.placeholder',
              })}
            />
          </FormItem>
        </InputGroup>
        <Row gutter={8}>
          <Col span={16}>
            <FormItem
              name="captcha"
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: 'userandregister.verification-code.required',
                  }),
                },
              ]}
            >
              <Input
                size="large"
                placeholder={formatMessage({
                  id: 'userandregister.verification-code.placeholder',
                })}
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <Button
              size="large"
              disabled={!!count}
              className={styles.getCaptcha}
              onClick={onGetCaptcha}
            >
              {count
                ? `${count} s`
                : formatMessage({
                    id: 'userandregister.register.get-verification-code',
                  })}
            </Button>
          </Col>
        </Row>
        <FormItem>
          <Button
            size="large"
            loading={submitting}
            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            <FormattedMessage id="userandregister.register.register" />
          </Button>
          <Link className={styles.login} to="/user/login">
            <FormattedMessage id="userandregister.register.sign-in" />
          </Link>
        </FormItem>
      </Form>
    </div>
  );
};

export default connect(({ userAndregister, loading }) => ({
  userAndregister,
  submitting: loading.effects['userAndregister/submit'],
}))(Register);