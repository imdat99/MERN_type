import { Button, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

import React, { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../store';
import * as thunkAction from '../store/todo/todoReducer'
import { AsyncThunk, bindActionCreators } from '@reduxjs/toolkit';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


const TodoCtrl: FC = () => {
    const dispatch = useAppDispatch()

    const { getTodos } = bindActionCreators(thunkAction, dispatch)
    const todoLoadding = useAppSelector((state) => state.todo.loadding)
    return (
        <Button size='large' type={'default'} className='custom_btn' onClick={() => getTodos()}>
            {todoLoadding === true ? <Spin indicator={antIcon} /> : 'Get todo'}
        </Button>
    )
}

export default TodoCtrl