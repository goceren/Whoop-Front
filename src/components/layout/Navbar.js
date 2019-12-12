// ---------->  NAVBAR COMPONENTİ <-------------

import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostWhoop from '../whoop/PostWhoop';
import Bildirimler from './Bildirimler';

// MATERİAL UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// ICONLAR
import HomeIcon from '@material-ui/icons/Home';


class Navbar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar className="navbar-background">
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                              <PostWhoop />
                            <Link to="/">
                                <MyButton tip="Anasayfa">
                                    <HomeIcon />
                                </MyButton>
                            </Link>
                            <Bildirimler />
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Button color="inherit" component={Link} to="/login">
                                    Giriş Yap
                                </Button>
                                <Button color="inherit" component={Link} to="/">
                                    Anasayfa
                                </Button>
                                <Button color="inherit" component={Link} to="/signup">
                                    Üye Ol
                                </Button>
                            </Fragment>
                        )}
                </Toolbar>
            </AppBar>
        );
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);