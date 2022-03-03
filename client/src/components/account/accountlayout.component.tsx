import { Button, DatePicker, Space, Typography } from 'antd'
import './account.css'
import moment from 'moment';
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import EditableText from '../../common/ultils/editableText';
import { useEffect, useState } from 'react';
import iprofile from '../../common/interface/profile.interface';
const dateFormat = 'DD/MM/YYYY';
const AccountLayout = () => {
    const [isChange, setisChange] = useState(true)
    const [inputData, setInputData] = useState<iprofile>({
        fullName: 'Lê Thành Đạt',
        phoneNumber: '0965687209',
        dob: '09/02/1999',
        email: 'imdat2999@gmail.com',
    })

    useEffect(() => {
        return () => {
            setisChange(false)
        }
    }, [inputData])



    const onDateChange = (e: moment.Moment | any) => {
        setInputData(
            prevState => ({
                ...prevState,
                dob: moment(e).format(dateFormat).toString()
            }))
    }


    return (
        <Space align={'start'} direction="vertical">
            <div className="accountdetail">
                <Space align='baseline' className='account_content'>
                    <Typography.Title level={5} className="account_content_title">Personal name: </Typography.Title>
                    <EditableText
                        name='fullName'
                        mod='input'
                        value={inputData.fullName}
                        editClassName="form-control"
                        oChange={setInputData}
                    />
                </Space>
                <Space align='baseline' className='account_content'>
                    <Typography.Title level={5} className="account_content_title">Date of birth: </Typography.Title>
                    <DatePicker
                        name='dob'
                        defaultValue={moment('2015/01/01', dateFormat)}
                        format={dateFormat}
                        onChange={
                            (e) => onDateChange(e)} />
                </Space>

                <Space align='baseline' className='account_content'>
                    <Typography.Title level={5} className="account_content_title">Email: </Typography.Title>
                    <EditableText
                        name='email'
                        mod='input'
                        value={inputData.email}
                        editClassName="form-control"
                        oChange={setInputData}
                    />
                </Space>

                <Space align='baseline' className='account_content'>
                    <Typography.Title level={5} className="account_content_title">Phone Number: </Typography.Title>
                    <EditableText
                        name='phoneNumber'
                        type='number'
                        mod='input'
                        value={inputData.phoneNumber}
                        editClassName="form-control"
                        oChange={setInputData}
                    />
                </Space>

                <Space align='baseline' className='account_content' style={{ marginTop: '10px' }}>
                    <div className="account_content_title"></div>
                    <Button disabled={isChange} type="primary">Primary Button</Button>
                </Space>

            </div>
        </Space>
    )
}

export default AccountLayout