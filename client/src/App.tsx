import './App.css'
import { useAppDispatch, useAppSelector } from './store'
import { bindActionCreators } from '@reduxjs/toolkit'
import { counterSlice } from './store/count/countSlide'
import { Button, Card, Col, Layout, Row, Space, Typography } from 'antd'
import * as thunkAction from './store/todo/todoReducer'
import ListTodo from './components/ListTodo'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Content } from 'antd/lib/layout/layout'
import TodoCtrl from './components/todoCtrl'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
function App() {

  // const count = useAppSelector((state) => state.counter.value)
  const todoLoadding = useAppSelector((state) => state.todo.loadding)
  const dispatch = useAppDispatch()

  const { getTodos } = bindActionCreators(thunkAction, dispatch)

  // const handledInputChange = (e: React.ChangeEvent<{ value: unknown }>) => {
  //   console.log(e.target.value as string);
  //   incrementByAmount(Number(e.target.value))
  // }

  return (

    // <Layout>
    //   <Content style={{ margin: "auto" }}>

    //     <Space align="center" direction="vertical" >
    //       <ListTodo />
    //       {/* <Button size='large' type={'default'} className='custom_btn' onClick={() => getTodos()}>
    //         {todoLoadding === true ? <Spin indicator={antIcon} /> : 'Get todo'}
    //       </Button> */}
    //       <TodoCtrl />
    //     </Space>
    //   </Content>
    // </Layout>
    <Layout>
      <Content>

        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Card title" bordered={false}>
                <p>Card content</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" bordered={false}>
                <p>Card content</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" bordered={false}>
                <p>Card content</p>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>

  )
}

export default App
