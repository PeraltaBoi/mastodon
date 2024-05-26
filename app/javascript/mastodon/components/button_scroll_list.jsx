import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ChevronLeftIcon from '@/material-icons/400-24px/chevron_left.svg?react';
import ChevronRightIcon from '@/material-icons/400-24px/chevron_right.svg?react';
import { Icon } from 'mastodon/components/icon';

class ButtonScrollList extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    emptyMessage: PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
    this.childRefs = [];
    this.slide = 0;
  }

  scrollLeft = () => {
    this.scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  scrollRight = () => {
    this.scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  render() {
    const { children, emptyMessage } = this.props;

    if (React.Children.count(children) === 0) {
      return null; // Render nothing if children are empty
    }

    return (
      <div className='button-scroll-list-container'>
        <button
          className='icon-button column-header__setting-btn'
          onClick={this.scrollLeft}
        >
          <Icon id='chevron-left' icon={ChevronLeftIcon} />
        </button>
        <div className='button-scroll-list' ref={this.scrollRef}>
          {React.Children.map(children, (child, index) => (
            <div key={index}>{child}</div>
          ))}
        </div>
        <button
          className='icon-button column-header__setting-btn'
          onClick={this.scrollRight}
        >
          <Icon id='chevron-right' icon={ChevronRightIcon} />
        </button>
      </div>
    );
  }
}

export default ButtonScrollList;
