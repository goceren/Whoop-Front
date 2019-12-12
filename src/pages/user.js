
// ----------> KULLANICI PROFİLİ SAYFASI <-------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Whoop from '../components/whoop/Whoop';
import StaticProfile from '../components/profil/StaticProfile';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    whoopIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const whoopId = this.props.match.params.whoopId;

    if (whoopId) this.setState({ whoopIdParam: whoopId });
    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { whoops, loading } = this.props.data;
    const { whoopIdParam } = this.state;
    const whoopsMarkup = loading ? (
      <LinearProgress color="primary"/>
    ) : whoops === null ? (
      <p>Burada Hiç Whoop Yok</p>
      ) : !whoopIdParam ? (
      whoops.map((whoop) => <Whoop key={whoop.whoopId} whoop={whoop} />)
      ) : (
        whoops.map((whoop) => {
          if (whoop.whoopId !== whoopIdParam)
            return <Whoop key={whoop.whoopId} whoop={whoop} />;
          else return <Whoop key={whoop.whoopId} whoop={whoop} openDialog />;
        })
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {whoopsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
           <LinearProgress color="secondary"/>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);