import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash/debounce';

import { expandFollowedHashtags, fetchFollowedHashtags } from 'mastodon/actions/tags';
import { withIdentity } from 'mastodon/identity_context';
import { WithRouterPropTypes } from 'mastodon/utils/react_router';
import { Hashtag } from 'mastodon/components/hashtag';
import ButtonScrollList from 'mastodon/components/button_scroll_list';

const mapStateToProps = state => ({
  hashtags: state.getIn(['followed_tags', 'items']),
  isLoading: state.getIn(['followed_tags', 'isLoading'], true),
  hasMore: !!state.getIn(['followed_tags', 'next']),
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
            <div className="hashtag-wrapper" key={hashtag.get('name')}>
              <Hashtag
                name={hashtag.get('name')}
                showSkeleton={false}
                to={`/tags/${hashtag.get('name')}`}
                withGraph={false}
              />
            </div>
          ))}
        </ButtonScrollList>
      </div>
    );
  }
}

export default connect(mapStateToProps)(
  injectIntl(withIdentity(withRouter(FollowedTagsList)))
);
