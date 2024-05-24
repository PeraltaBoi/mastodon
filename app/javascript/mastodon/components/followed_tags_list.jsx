import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash/debounce';

import AddIcon from '@/material-icons/400-24px/add.svg?react';
import ArrowBackIcon from '@/material-icons/400-24px/arrow_back.svg?react';
import ChevronLeftIcon from '@/material-icons/400-24px/chevron_left.svg?react';
import ChevronRightIcon from '@/material-icons/400-24px/chevron_right.svg?react';
import CloseIcon from '@/material-icons/400-24px/close.svg?react';
import SettingsIcon from '@/material-icons/400-24px/settings.svg?react';
import { expandFollowedHashtags, fetchFollowedHashtags } from 'mastodon/actions/tags';
import { Icon } from 'mastodon/components/icon';
import { ButtonInTabsBar } from 'mastodon/features/ui/util/columns_context';
import { identityContextPropShape, withIdentity } from 'mastodon/identity_context';
import { WithRouterPropTypes } from 'mastodon/utils/react_router';
import { Hashtag } from 'mastodon/components/hashtag';
import ButtonScrollList from 'mastodon/components/button_scroll_list';

const mapStateToProps = state => ({
  hashtags: state.getIn(['followed_tags', 'items']),
  isLoading: state.getIn(['followed_tags', 'isLoading'], true),
  hasMore: !!state.getIn(['followed_tags', 'next']),
});

const messages = defineMessages({
  show: { id: 'column_header.show_settings', defaultMessage: 'Show settings' },
  hide: { id: 'column_header.hide_settings', defaultMessage: 'Hide settings' },
  moveLeft: { id: 'column_header.moveLeft_settings', defaultMessage: 'Move column to the left' },
  moveRight: { id: 'column_header.moveRight_settings', defaultMessage: 'Move column to the right' },
  back: { id: 'column_back_button.label', defaultMessage: 'Back' },
});

class FollowedTagsList extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    hashtags: ImmutablePropTypes.list.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
    ...WithRouterPropTypes,
  };

  componentDidMount() {
    this.props.dispatch(fetchFollowedHashtags());
  }

  handleLoadMore = debounce(() => {
    this.props.dispatch(expandFollowedHashtags());
  }, 300, { leading: true });

  handleMoveLeft = () => {
    // Implement the logic to move the column to the left
  };

  handleMoveRight = () => {
    // Implement the logic to move the column to the right
  };

  render() {
    const {
      intl: { formatMessage },
      hashtags,
      isLoading,
    } = this.props;

    const emptyMessage = (
      <FormattedMessage
        id='empty_column.followed_tags'
        defaultMessage='You have not followed any hashtags yet. When you do, they will show up here.'
      />
    );

    return (
      <div className='followed-tags-list' >
               <ButtonScrollList
                 scrollKey='followed_tags'
                 emptyMessage={emptyMessage}
                 isLoading={isLoading}
                 onLoadMore={this.handleLoadMore}
               >
                {hashtags.map((hashtag) => (
                  <Hashtag
                  key={hashtag.get('name')}
                  name={hashtag.get('name')}
                  show-skeleton={false}
                  to={`/tags/${hashtag.get('name')}`}
                  withGraph={false}
                  />
                ))}
        </ButtonScrollList>
      </div>
    );
  }
}

export default connect(mapStateToProps)(
  injectIntl(withIdentity(withRouter(FollowedTagsList)))
);
