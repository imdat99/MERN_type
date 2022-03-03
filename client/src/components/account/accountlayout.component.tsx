import { Button, DatePicker, Space, Typography } from 'antd'
import './account.css'
import moment from 'moment';
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import EditableText from '../testedit';
const dateFormat = 'DD/MM/YYYY';
const AccountLayout = () => {
    const formatPrice = (val: string) => val;
    return (
        <Space size={25} align={'start'} direction="vertical">
            <div className="accountdetail">
                {/* <Space align='baseline' className='account_content'>
                    <Typography.Title level={5} className="account_content_title">Personal name: </Typography.Title>
                    <EdiText
                        type="text"
                        saveButtonContent={<CheckOutlined style={{ color: '#bababa' }} />}
                        cancelButtonContent={<CloseOutlined style={{ color: '#bababa' }} />}
                        editButtonContent={<EditOutlined style={{ color: '#bababa' }} />}
                        saveButtonClassName="custom-button"
                        editButtonClassName="custom-button"
                        cancelButtonClassName="custom-button"
                        value="Lê Thành Đạt"
                        onSave={() => { }}
                        hideIcons={true}
                    />
                </Space>
                <Space align='baseline' className='account_content'>
                    <Typography.Title level={5} className="account_content_title">Date of birth: </Typography.Title>
                    <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
                </Space>

                <Space align='baseline' className='account_content'>
                    <Typography.Title level={5} className="account_content_title">Email: </Typography.Title>
                    <EdiText
                        type="email"
                        saveButtonContent={<CheckOutlined style={{ color: '#bababa' }} />}
                        cancelButtonContent={<CloseOutlined style={{ color: '#bababa' }} />}
                        editButtonContent={<EditOutlined style={{ color: '#bababa' }} />}
                        saveButtonClassName="custom-button"
                        editButtonClassName="custom-button"
                        cancelButtonClassName="custom-button"
                        value="imdat2999@gmail.com"
                        onSave={() => { }}
                        hideIcons={true}
                    />
                </Space>
                <Space align='start' className='account_content'>
                    <Typography.Title level={5} className="account_content_title">Description: </Typography.Title>
                    <EdiText
                        type="text"
                        saveButtonContent={<CheckOutlined style={{ color: '#bababa' }} />}
                        cancelButtonContent={<CloseOutlined style={{ color: '#bababa' }} />}
                        editButtonContent={<EditOutlined style={{ color: '#bababa' }} />}
                        saveButtonClassName="custom-button"
                        editButtonClassName="custom-button"
                        cancelButtonClassName="custom-button"
                        value="Why, Mr. Anderson? Why? Why do you persist?"
                        onSave={() => { }}
                        hideIcons={true}
                    />
                </Space>
                <Space align='baseline' className='account_content'>

                    <Button type="primary">Primary Button</Button>
                </Space> */}
                <EditableText mod='textarea' value="Hello word!" editClassName="form-control" />
            </div>
        </Space>
    )
}

export default AccountLayout