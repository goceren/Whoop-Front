
// ----------> ANASAYFA PROFİL COMPONENTİ <-------------

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import MyButton from '../../util/MyButton';


//REDUX
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';

// MATERİAL UI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

// ICONLAR
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import CakeIcon from '@material-ui/icons/Cake';

const styles = (theme) => ({
    ...theme.styleExport
});

class Profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    };
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };
    handleLogout = () => {
        this.props.logoutUser();
    };
    render() {
        const {
            classes,
            user: {
                credentials: { handle, createdAt, imageUrl, bio, website, location, birthday },
                loading,
                authenticated
            }
        } = this.props;

        let profileMarkup = !loading ? (
            authenticated ? (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className="image-wrapper">
                            <img src={imageUrl} alt="profile" className="profile-image" />
                            <input
                                type="file"
                                id="imageInput"
                                hidden="hidden"
                                onChange={this.handleImageChange}
                            />
                            <MyButton
                                tip="Profil Resmini Değiştir"
                                onClick={this.handleEditPicture}
                                btnClassName="button"
                            >
                                <EditIcon color="primary" />
                            </MyButton>
                        </div>
                        <hr />
                        <div className="profile-details">
                            <MuiLink
                                component={Link}
                                to={`/users/${handle}`}
                                color="primary"
                                variant="h5"
                            >
                                @{handle}
                            </MuiLink>
                            <hr />
                            {bio && <Typography variant="body2">{bio}</Typography>}
                            <hr />
                            {birthday && (
                                <Fragment>
                                    <CakeIcon color="primary" /> <span>{dayjs(birthday).format('DD MMM YYYY')}</span>
                                </Fragment>
                            )}
                            <hr />
                            {location && (
                                <Fragment>
                                    <LocationOn color="primary" /> <span>{location}</span>
                                    <hr />
                                </Fragment>
                            )}
                            {website && (
                                <Fragment>
                                    <LinkIcon color="primary" />
                                    <a href={website} target="_blank" rel="noopener noreferrer">
                                        {' '}
                                        {website}
                                    </a>
                                    <hr />
                                </Fragment>
                            )}
                            <CalendarToday color="primary" />{' '}
                            <span>{dayjs(createdAt).format('MMM YYYY')} Katıldı</span>
                        </div>
                        <MyButton tip="Çıkış Yap" onClick={this.handleLogout}>
                            <KeyboardReturn color="secondary" />
                        </MyButton>
                        <EditDetails />
                    </div>
                </Paper>
            ) : (
                    <Paper className={classes.paper}>
                        <br />
                        <Typography variant="h6" align="center">
                            Profil bulunamadı.. Lütfen tekrar giriş yapmayı deneyin...
                        </Typography>
                        <br /><br />
                        <div className={classes.buttons}>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/login"
                            >
                                Giriş Yap
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/signup"
                            >
                                Üye Ol
                            </Button>
                        </div>
                    </Paper>
                )
        ) : (

            <LinearProgress color="secondary"/>


            );

        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Profile));