import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  const {user} = state;
  return {user: user};
};

// const mapDispatchToProps = () => {

// };

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
    };
  }

  render() {
    return (
      <View>
        <Text>This is Dashboard</Text>
        <Text>User: {JSON.stringify(this.state.user)} </Text>
      </View>
    );
  }
}

const DashboardContainer = connect(
  mapStateToProps,
  // mapDispatchToProps,
)(Dashboard);

export default DashboardContainer;
