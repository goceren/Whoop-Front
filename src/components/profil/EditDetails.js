// ----------> PROFİL RESMİ VE DETAYLARI DEĞİŞTİRME COMPONENTİ <-------------

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';

// REDUX 
import { connect } from 'react-redux';
import MyButton from '../../util/MyButton';

// COMPONENTS
import { editUserDetails } from '../../redux/actions/userActions';

// MATERİAL UI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from "@date-io/dayjs";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

// ICONS
import EditIcon from '@material-ui/icons/Edit';


const styles = (theme) => ({
    ...theme.styleExport,
    button: {
        float: 'right'
    }
})

class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        birthday: new Date().toString(),
        open: false
    };
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            birthday: credentials.birthday ? credentials.birthday : '',
            location: credentials.location ? credentials.location : '',
        });
    }
    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserDetailsToState(this.props.credentials);
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleDateChange = (event) => {
        this.setState({
            birthday: event
        });
    };
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            location: this.state.location,
            website: this.state.website,
            birthday: this.state.birthday

        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <MyButton tip="Profilinizi Güncelleyin" onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color="primary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <DialogTitle> Profilinizi Güncelleyin</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name="bio"
                                type="text"
                                label="Hakkımda"
                                multiline
                                rews="3"
                                placeholder="Kısaca Kendinizden Bahsedin"
                                className={classes.TextField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <br /> <br />
                            <TextField
                                name="website"
                                type="text"
                                label="Web Sitem"
                                placeholder="Kişisel Webiteniz"
                                className={classes.TextField}
                                value={this.state.website}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <br /> <br />
                            <TextField
                                name="location"
                                type="text"
                                label="Konumum"
                                placeholder="Nerede Yaşıyosunuz ?"
                                className={classes.TextField}
                                value={this.state.location}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <br /> <br />
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    disableFuture
                                    openTo="year"
                                    format="DD-MM-YYYY"
                                    label="Doğum Gününüz"
                                    views={["year", "month", "date"]}
                                    value={this.state.birthday}
                                    onChange={this.handleDateChange}
                                />

                            </MuiPickersUtilsProvider>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" >
                            Vazgeç
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Kaydet
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})
export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
