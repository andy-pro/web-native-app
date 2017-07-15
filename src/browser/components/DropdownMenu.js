import React from 'react';

class DropdownMenu extends React.Component {
  componentDidUpdate(prevProps) {
    let prev = prevProps.open,
      { open } = this.props;
    if (open && !prev) {
      setTimeout(() => {
        window.addEventListener('click', this.handleClickOutside);
      }, 0);
    } else if (!open && prev) {
      window.removeEventListener('click', this.handleClickOutside);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside);
    if (this.props.open) {
      this.props.onClose();
    }
  }

  handleClickOutside = e => {
    this.props.onClose();
  };

  render() {
    let { open, content, sideMenuMode } = this.props;
    return open || sideMenuMode ? content : null;
  }
}

export default DropdownMenu;
