import React, { Component } from 'react'
import AccountRow from '../../../components/content/AccountRow/'

export default class AccountRowContainer extends Component {

    removeRow = (e) => {
        const rows = document.querySelectorAll(".panel__body-row")
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let buttonInRow = row.getElementsByTagName("button")
            if (buttonInRow[0] === e.target) {
                rows[i].remove()
                return;
            }
        }
    }

    render() {
        return (
            <AccountRow
                icon={this.props.icon}
                placeholder={this.props.placeholder}
                removeRow={this.removeRow}
            />
        )
    }
}
