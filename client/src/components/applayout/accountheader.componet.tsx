import { PoweroffOutlined } from "@ant-design/icons"
import { Button, PageHeader } from "antd"

const AcountHeader = () => {
    return (
        <div className="site-page-header-ghost-wrapper">
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title="Account"
                subTitle="Account detail"
                extra={[
                    <Button key="2">Change Password</Button>,
                    <Button
                        key="1"
                        type="primary"
                        danger
                        icon={<PoweroffOutlined />}
                    // loading={true}
                    >
                        Logout
                    </Button>,
                ]}
            >
            </PageHeader>
        </div>
    )
}

export default AcountHeader