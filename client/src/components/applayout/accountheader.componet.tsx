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
                    <Button key="3">Operation</Button>,
                    <Button key="2">Operation</Button>,
                    <Button key="1" type="primary">
                        Primary
                    </Button>,
                ]}
            >
            </PageHeader>
        </div>
    )
}

export default AcountHeader