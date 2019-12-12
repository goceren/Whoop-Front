
// ----------> WHOOP SİL BUTTONU COMPONENTİ <-------------

import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';

// MATERİAL UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deleteWhoop } from '../../redux/actions/dataActions';

const styles = {
    deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '10%',
    }
};

class DeleteWhoop extends Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    deleteWhoop = () => {
        this.props.deleteWhoop(this.props.whoopId);
        this.setState({ open: false });
    };
    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <MyButton
                    tip="Whoop'u Sil"
                    onClick={this.handleOpen}
                    btnClassName={classes.deleteButton}

                >
                    <DeleteOutline color="secondary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>
                        Silmek istediğinizden emin misiniz ?
          </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} variant="contained" color="primary">
                            Vazgeç
            </Button>
                        <Button onClick={this.deleteWhoop} variant="contained" color="secondary">
                            Sil
            </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

DeleteWhoop.propTypes = {
    deleteWhoop: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    whoopId: PropTypes.string.isRequired
};

export default connect(
    null,
    { deleteWhoop }
)(withStyles(styles)(DeleteWhoop));