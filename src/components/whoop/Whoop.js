
// ----------> WHOOP COMPONENTİ <-------------

import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteWhoop from './DeleteWhoop';
import WhoopDialog from './WhoopDialog';
import LikeButton from './LikeButton';
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { connect } from 'react-redux';
const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
};

class Whoop extends Component {

    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            whoop: {
                body,
                createdAt,
                userImage,
                userHandle,
                whoopId,
                likeCount,
                commentCount
            },
            user: {
                authenticated,
                credentials: { handle }
            }
        } = this.props;

        const deleteButton =
            authenticated && userHandle === handle ? (
                <DeleteWhoop whoopId={whoopId} />
            ) : null;
        return (

            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title="Profile image"
                    className={classes.image}
                />
                <CardContent className={classes.content}>
                    <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary"
                    >
                        {userHandle}
                    </Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton whoopId={whoopId} />
                    <span className="span-like">{likeCount} Beğeni</span>
                    <MyButton tip="Yorumlar">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span className="span-like">{commentCount} Yorum</span>
                    <WhoopDialog
                        whoopId={whoopId}
                        userHandle={userHandle}
                        openDialog={this.props.openDialog}
                    />
                </CardContent>
            </Card>
        );
    }
}

Whoop.propTypes = {
    likeWhoop: PropTypes.func.isRequired,
    unlikeWhoop: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    whoop: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool

};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Whoop));