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
    this.childRefs = [];
    this.state = {
      currentIndex: 0,
      childWidth: 0,
    };
    this.slide = 0;
    this.setChildRef = this.setChildRef.bind(this);
  }

  componentDidMount() {
    this.updateChildWidth();
    window.addEventListener('resize', this.updateChildWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateChildWidth);
  }

  updateChildWidth = () => {
    if (this.childRefs.length > 0 && this.childRefs[this.state.currentIndex]) {
      const { offsetWidth } = this.childRefs[this.state.currentIndex];
      this.setState({ childWidth: offsetWidth });
    }
  };

  scrollLeft = () => {
    const { currentIndex } = this.state;
    const newIdx = currentIndex - 1;
    if (currentIndex > 0) {
      this.setState({ currentIndex: newIdx });
      this.updateChildWidth();
      this.slide -= this.state.childWidth;
      this.scrollRef.current.scrollTo({ left: this.slide, behavior: 'smooth' });
    }
  };

  scrollRight = () => {
    this.updateChildWidth();
    const { children } = this.props;
    const { currentIndex } = this.state;
    if (currentIndex < React.Children.count(children) - 1) {
      const newIdx = currentIndex + 1;
      this.setState({ currentIndex: newIdx });
      this.slide += this.state.childWidth;
      this.scrollRef.current.scrollTo({ left: this.slide, behavior: 'smooth' });
    }
  };

  setChildRef(ref, index) {
    this.childRefs[index] = ref;
  }

  render() {
    const { children } = this.props;

    return (
      <div className='button-scroll-list-container'>
        <button
          className='icon-button column-header__setting-btn'
          onClick={this.scrollLeft}
          disabled={this.state.currentIndex === 0}
        >
          <Icon id='chevron-left' icon={ChevronLeftIcon} />
        </button>
        <div className='button-scroll-list' ref={this.scrollRef}>
          {React.Children.map(children, (child, index) => (
            <div key={index} ref={(ref) => this.setChildRef(ref, index)}>
              {child}
            </div>
          ))}
        </div>
        <button
          className='icon-button column-header__setting-btn'
          onClick={this.scrollRight}
          disabled={this.state.currentIndex === React.Children.count(children) - 1}
        >
          <Icon id='chevron-right' icon={ChevronRightIcon} />
        </button>
      </div>
    );
  }
}

export default ButtonScrollList;
