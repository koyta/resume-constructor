import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import { inject, observer } from "mobx-react";

@inject("fetch")
@observer
class Charts extends React.Component {
  static propTypes = {
    fetch: PropTypes.shape({
      github: PropTypes.object,
      followers: PropTypes.number,
      getRepos: PropTypes.func,
      repos: PropTypes.array,
      languagesPerRepo: PropTypes.array
    }).isRequired
  };

  static colors = [
    "#5cbae6",
    "#b6d957",
    "#fac364",
    "#8cd3ff",
    "#d998cb",
    "#f2d249",
    "#93b9c6",
    "#ccc5a8",
    "#52bacc",
    "#dbdb46",
    "#98aafb"
  ];

  state = {
    pieData: {}
  };

  async componentWillMount() {
    const { fetch } = this.props;
    console.log(fetch.github);
    await fetch.getRepos();
    if (fetch.github) {
      await fetch.getLanguagesPerRepo();
      this.buildDataset();
    }
  }

  buildDataset = () => {
    const { fetch } = this.props;
    console.log(fetch.following());
    const data = {
      datasets: [
        {
          backgroundColor: Charts.colors,
          data: [1, 2, 3]
        }
      ],
      labels: ["ты", "хороший", "человек"]
    };
    this.setState({ pieData: data });
  };

  render() {
    // const dataset = [];
    // const legend = [];
    return (
      <Fragment>
        <Pie data={this.state.pieData} />
        {/* <Polar /> */}
      </Fragment>
    );
  }
}

export default Charts;
