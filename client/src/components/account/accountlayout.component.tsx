import { useEffect, useState } from 'react';
import { Button, DatePicker, Space, Typography } from 'antd'
//lib

import moment from 'moment';
import EditableText from '../../common/ultils/editableText';
import iprofile from '../../common/interface/profile.interface';
import { useAppSelector } from '../../store';
import { updateProfile } from './account.handle';
import './account.css'


const dateFormat = 'DD/MM/YYYY';
const AccountLayout = () => {
    const profile = useAppSelector(s => s.user.profile)
    const [isChange, setisChange] = useState(false)
    const [isLoadding, setLoading] = useState(false)
    const [inputData, setInputData] = useState<iprofile>({
        fullName: '',
        phoneNumber: '',
        dob: '',
        email: '',
    })

    useEffect(() => {
        setInputData(prev => ({
            ...prev,
            fullName: profile.fullName,
            phoneNumber: profile.phoneNumber,
            dob: profile.dob,
            email: profile.email,
        }))
        return () => {
        }
    }, [profile])
    useEffect(() => {
        setisChange((
            inputData.fullName === profile.fullName &&
            inputData.phoneNumber === profile.phoneNumber &&
            inputData.dob === profile.dob &&
            inputData.email === profile.email
        ))

    }, [inputData])


    const onDateChange = (e: moment.Moment | any) => {
        setInputData(
            prevState => ({
                ...prevState,
                dob: moment(e).format(dateFormat).toString()
            }))
    }

    const handleUpdate = async () => {
        setLoading(true)
        await updateProfile(inputData).finally(() => { setLoading(false) })
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
                        type='email'
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
                    <Button
                        disabled={isChange}
                        type="primary"
                        onClick={handleUpdate}
                        loading={isLoadding}
                    >
                        Update
                    </Button>
                </Space>

            </div>
        </Space>
    )
}

export default AccountLayout