import React from 'react'
import { Icon } from 'antd'

const TipPanel = (props) => {
    return (
        <div className="tip-panel">
            <div className="tip-panel__icon"><Icon type="user"/></div>
            <div className="tip-panel__heading"><span>Personal info</span></div>
            <div className="tip-panel__body">
                <div className="tip-panel__body-left-label">
                    <span>Tips</span>
                </div>
                <div className="tip-panel__title">Fill in only the information you would like to show on your resume. Leave other fields empty.</div>
            </div>
        </div>
    );
}

export default TipPanel;