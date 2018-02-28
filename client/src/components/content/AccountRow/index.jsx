import React from 'react'
import { Row, Col, Button, Input, Icon } from 'antd'

const AccountRow = props => {
    return (
        <Row type="flex" align="center" justify="space-between" className="panel__body-row">
            <Col xs={16} md={20} xl={22}>
                <Input
                    size="large"
                    addonBefore={<Icon type={props.icon} style={{ fontSize: 22 }} />}
                    placeholder={props.placeholder}
                />
            </Col>
            <Button type='danger' icon='delete' shape='circle' size='large' style={{ display: 'inline-block' }} onClick={(e) => props.removeRow(e)} />
        </Row>
    )
}

export default AccountRow