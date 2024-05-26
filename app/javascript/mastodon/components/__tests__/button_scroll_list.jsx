import renderer from 'react-test-renderer';

//import { render, fireEvent } from 'mastodon/test_helpers';

import ButtonScrollList from '../button_scroll_list';

jest.mock('mastodon/components/icon', () => 'Icon');

describe('<ButtonScrollList />', () => {
  it('renders an empty button scroll list element', () => {
    const children = [];
    const component = renderer.create(
      <ButtonScrollList>{children}</ButtonScrollList>,
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders the children', () => {
    const children = Array.from({ length: 5 }, (_, i) => (
      <div key={i} ref={jest.fn()} />
    ));
    const component = renderer.create(
      <ButtonScrollList>{children}</ButtonScrollList>,
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('scrolls left', () => {
    const children = Array.from({ length: 5 }, (_, i) => (
      <div key={i} ref={jest.fn()} />
    ));
    const component = renderer.create(
      <ButtonScrollList>{children}</ButtonScrollList>,
    );
    const instance = component.getInstance();
    instance.scrollLeft();
  });

  it('scrolls right', () => {
    const children = Array.from({ length: 5 }, (_, i) => (
      <div key={i} ref={jest.fn()} />
    ));
    const component = renderer.create(
      <ButtonScrollList>{children}</ButtonScrollList>,
    );
    const instance = component.getInstance();
    instance.scrollRight();
  });
});