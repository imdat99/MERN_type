import { EditOutlined } from '@ant-design/icons'
import { Input, Typography } from 'antd'
import { FC, useState } from 'react'
import iprofile from '../interface/profile.interface'

interface Props {
    name?: string
    type?: string
    value?: string
    editClassName?: string
    textClassName?: string
    mod?: 'input' | 'textarea'
    oChange?: React.Dispatch<React.SetStateAction<any>>
}

const EditableText: FC<Props> = (props) => {
    const [state, setState] = useState({
        name: props.name,
        type: props.type || 'text',
        mod: props.mod || 'input',
        value: props.value || '',
        editClassName: props.editClassName,
        textClassName: props.textClassName,
        edit: false,
        backup: '',
    })
    const edit = () => {
        setState({ ...state, edit: state.edit !== false })
    }
    return (
        state.edit === true &&
        (state.mod !== 'textarea' ?
            <Input
                size='small'
                name={state.name}
                type={state.type}
                value={state.value}
                className={state.editClassName}
                autoFocus
                onFocus={event => {
                    const value = event.target.value
                    event.target.value = ''
                    event.target.value = value
                    setState({ ...state, backup: state.value })
                }}
                onChange={event => {
                    setState({ ...state, value: event.target.value })
                    if (props.oChange) props.oChange((prevstate: any) => ({ ...prevstate, [event.target.name]: event.target.value }))
                }}
                onBlur={event => {
                    setState({ ...state, edit: false })
                }}
                onKeyUp={event => {
                    if (event.key === 'Escape' || event.key === 'Enter') {
                        setState({ ...state, edit: false, value: state.backup })
                    }
                }}
            />
            :
            <Input.TextArea
                size='small'
                autoSize={true}
                name={state.name}
                value={state.value}
                className={state.editClassName}
                autoFocus
                onFocus={event => {
                    const value = event.target.value
                    event.target.value = ''
                    event.target.value = value
                    setState({ ...state, backup: state.value })
                }}
                onChange={event => {
                    setState({ ...state, value: event.target.value })
                }}
                onBlur={event => {
                    setState({ ...state, edit: false })
                }}
                onKeyUp={event => {
                    if (event.key === 'Escape' || event.key === 'Enter') {
                        setState({ ...state, edit: false, value: state.backup })
                    }
                }}
            />)
        ||
        <Typography.Text className={state.textClassName} onClick={event => {
            setState({ ...state, edit: state.edit !== true })
        }}>
            {state.value}
            <EditOutlined style={{ cursor: 'pointer', color: '#bababa', marginLeft: '10px' }} />
        </Typography.Text>
    )
}

export default EditableText