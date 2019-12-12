
// ----------> LİKE-UNLİKE BUTTONU COMPONENTİ <-------------

import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { likeWhoop, unlikeWhoop } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
  likedWhoop = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.whoopId === this.props.whoopId
      )
    )
      return true;
    else return false;
  };
  likeWhoop = () => {
    this.props.likeWhoop(this.props.whoopId);
  };
  unlikeWhoop = () => {
    this.props.unlikeWhoop(this.props.whoopId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Beğen">
          <FavoriteBorder color="secondary" />
        </MyButton>
      </Link>
    ) : this.likedWhoop() ? (
      <MyButton tip="Geri Al" onClick={this.unlikeWhoop}>
        <FavoriteIcon color="secondary" />
      </MyButton>
    ) : (
      <MyButton tip="Beğen" onClick={this.likeWhoop}>
        <FavoriteBorder color="secondary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  whoopId: PropTypes.string.isRequired,
  likeWhoop: PropTypes.func.isRequired,
  unlikeWhoop: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likeWhoop,
  unlikeWhoop
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);