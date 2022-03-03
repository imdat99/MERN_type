// import React from "react"
// class EditableText extends React.Component<any, any> {
//     constructor(props: any) {
//         super(props)
//         this.state = {
//             name: props.name,
//             type: props.type || 'text',
//             value: props.value || '',
//             editClassName: props.editClassName,
//             edit: false
//         }
//     }
//     edit() {
//         this.setState({ edit: this.state.edit !== false })
//     }
//     render() {
//         return (
//             this.state.edit === true &&
//             <input
//                 name={this.state.name}
//                 type={this.state.type}
//                 value={this.state.value}
//                 className={this.state.editClassName}
//                 autoFocus
//                 onFocus={event => {
//                     const value = event.target.value
//                     event.target.value = ''
//                     event.target.value = value
//                     this.setState({ backup: this.state.value })
//                 }}
//                 onChange={event => {
//                     this.setState({ value: event.target.value })
//                 }}
//                 onBlur={event => {
//                     this.setState({ edit: false })
//                 }}
//                 onKeyUp={event => {
//                     if (event.key === 'Escape') {
//                         this.setState({ edit: false, value: this.state.backup })
//                     }
//                 }}
//             />
//             ||
//             <span onClick={event => {
//                 this.setState({ edit: this.state.edit !== true })
//             }}>
//                 {this.state.value}
//             </span>
//         )
//     }
// }

// export default EditableText

import { Input, Typography } from 'antd'
import { FC, useState } from 'react'

interface Props {
    name?: string
    type?: string
    value?: string
    editClassName?: string
    textClassName?: string
    mod?: 'input' | 'textarea'
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
        backup: ''
    })
    const edit = () => {
        setState({ ...state, edit: state.edit !== false })
    }
    return (
        state.edit === true &&
        (state.mod !== 'textarea' ?
            <Input
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
                }}
                onBlur={event => {
                    setState({ ...state, edit: false })
                }}
                onKeyUp={event => {
                    if (event.key === 'Escape') {
                        setState({ ...state, edit: false, value: state.backup })
                    }
                }}
            />
            :
            <Input.TextArea
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
                    if (event.key === 'Escape') {
                        setState({ ...state, edit: false, value: state.backup })
                    }
                }}
            />)
        ||
        <Typography.Text className={state.editClassName} onClick={event => {
            setState({ ...state, edit: state.edit !== true })
        }}>
            {state.value}
        </Typography.Text>
    )
}

export default EditableText