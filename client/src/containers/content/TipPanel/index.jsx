import React, { Component } from "react";
import TipPanel from "../../../components/content/TipPanel";
import PropTypes from "prop-types";

export default class TipPanelContainer extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  };

  render() {
    const { icon, heading, label, title } = this.props;
    return <TipPanel icon heading label title />;
  }
}
