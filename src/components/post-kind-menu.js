import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import { selectPostKind } from '../actions';


const styles = theme => ({
  paperAnchorDockedLeft: {
    overflow: 'visible',
    background: theme.palette.shades.dark.background.appBar,
  },
  icon: {
    color: theme.palette.shades.dark.text.icon,
    '&:hover': {
      color: theme.palette.secondary['200'],
    }
  },
  iconSelected: {
    color: theme.palette.secondary['500'],
    '&:hover': {
      color: theme.palette.secondary['500'],
    }
  }
});

class PostKindMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(postKind) {
    if (!postKind.selected) {
      this.props.selectPostKind(postKind.id);
    }
  }

  render() {
    return (
      <Drawer
        type="permanent"
        classes={{
          paperAnchorDockedLeft: this.props.classes.paperAnchorDockedLeft,
        }}
      >
        {this.props.postKinds.map((postKind) => {
          const Icon = postKind.icon;
          return (
            <Tooltip title={postKind.name} key={'post-kind-menu-' + postKind.id} placement="right">
              <IconButton
                className={this.props.classes.icon + ' ' + (postKind.selected ? this.props.classes.iconSelected : '')}
                onClick={() => this.handleClick(postKind)}
              >
                <Icon />
              </IconButton>
            </Tooltip>
          );
        })}
      </Drawer>
    );
  }
}

PostKindMenu.defaultProps = {};

PostKindMenu.propTypes = {
  postKinds: PropTypes.array.isRequired,
};

function mapStateToProps(state, props) {
  return {
      postKinds: state.postKinds.toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectPostKind: selectPostKind,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostKindMenu));
