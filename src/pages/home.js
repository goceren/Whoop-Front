

// ----------> ANASAYFA <-------------


import React, { Component } from 'react'
import PropTypes from 'prop-types';

// MATERİAL UI
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

// COMPONENTLER
import Whoop from '../components/whoop/Whoop';
import Profile from '../components/profil/Profile';

// REDUX
import { connect } from 'react-redux';
import { getWhoops } from '../redux/actions/dataActions';


class Home extends Component {

    componentDidMount() {
        this.props.getWhoops();
    }

    render() {
        const { whoops, loading } = this.props.data;
        let recentWhoopsMarkup = !loading ? (
            whoops.map((whoop) => (
                <Whoop key={whoop.whoopId} whoop={whoop} />
            ))
        ) : (
            <LinearProgress color="primary"/>
            );
        return (
            <Grid container spacing={5}>
                <Grid item sm={8} xs={12}>
                    {recentWhoopsMarkup}
                </Grid>

                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>

            </Grid>
        );
    }
}

Home.propTypes = {
    getWhoops: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})
export default connect(mapStateToProps, { getWhoops })(Home);
