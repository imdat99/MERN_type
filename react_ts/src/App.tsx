import './App.less'
import { FC } from "react"
import { Layout, Space, Typography } from 'antd'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { ListTodo } from './components/ListTodo'
import { InputTodo } from './components/InputTodo'
import { bindActionCreators } from 'redux'
import * as actionCreators from './redux/action/todoActions';
import { RootState } from './redux'
const { Content } = Layout
const { Text, Title } = Typography

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { addTodo } = bindActionCreators(actionCreators, dispatch)
  console.log('App render');
  return (

    <Layout>
      <Content className='container_center'>
        <Space direction='vertical' align='center' className='content_center'>
          <Title level={1} >ahihi</Title>
          <ListTodo />
          <InputTodo addData={addTodo} />
        </Space>
      </Content>
    </Layout>

  )
}


export default App
