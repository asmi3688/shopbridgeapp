import React from 'react';
import { shallow } from 'enzyme';
import ImageBox from './ImageBox';

describe('ImageBox', () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(<ImageBox />));

  it('should render a <div />', () => {
    expect(wrapper.find('Box').length).toEqual(1);
  });
  
});