import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { FormattedMessage, injectIntl } from 'react-intl';

import { withRouter } from 'react-router-dom';

import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import debounce from 'lodash/debounce';

import { expandFollowedHashtags, fetchFollowedHashtags } from 'mastodon/actions/tags';
import ButtonScrollList from 'mastodon/components/button_scroll_list';
import { Hashtag } from 'mastodon/components/hashtag';

const mapStateToProps = state => ({
  hashtags: state.getIn(['followed_tags', 'items']),
  isLoading: state.getIn(['followed_tags', 'isLoading'], true),
  hasMore: !!state.getIn(['followed_tags', 'next']),
});

class FollowedTagsList extends PureComponent {
  static propTypes = {
    hashtags: ImmutablePropTypes.list.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.dispatch(fetchFollowedHashtags());
  }

  handleLoadMore = debounce(() => {
    this.props.dispatch(expandFollowedHashtags());
  }, 300, { leading: true });

  render() {
    const { hashtags, isLoading } = this.props;

    const emptyMessage = <FormattedMessage id='empty_column.followed_tags' defaultMessage='You have not followed any hashtags yet. When you do, they will show up here.' />;

    return (
      <div className='followed-tags-list' >
        <ButtonScrollList
          scrollKey='followed_tags'
          emptyMessage={emptyMessage}
          isLoading={isLoading}
          onLoadMore={this.handleLoadMore}
        >
          {hashtags.map((hashtag) => (
            <div className='hashtag-wrapper' key={hashtag.get('name')}>
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

export default connect(mapStateToProps)(injectIntl(FollowedTagsList));
