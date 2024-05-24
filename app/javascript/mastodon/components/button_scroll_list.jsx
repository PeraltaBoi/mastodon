import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ChevronLeftIcon from '@/material-icons/400-24px/chevron_left.svg?react';
import ChevronRightIcon from '@/material-icons/400-24px/chevron_right.svg?react';
import { Icon } from 'mastodon/components/icon';

class ButtonScrollList extends Component {
  static propTypes = {
    scrollKey: PropTypes.string.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
  }

  componentDidMount() {
    this.scrollRef.current.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.scrollRef.current.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { onLoadMore } = this.props;
    const { scrollLeft, scrollWidth, clientWidth } = this.scrollRef.current;

    if (scrollLeft + clientWidth >= scrollWidth - 50) {
      onLoadMore();
    }
  };

  scrollLeft = () => {
    this.scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  scrollRight = () => {
    this.scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  render() {
    const { children } = this.props;

    return (
      <div className='button-scroll-list-container'>
        <button
          className='icon-button column-header__setting-btn'
          onClick={this.scrollLeft}
        >
          <Icon id='chevron-left' icon={ChevronLeftIcon} />
        </button>
        <div className='button-scroll-list' ref={this.scrollRef}>
          {children}
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
