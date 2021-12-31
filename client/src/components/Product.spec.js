import React from 'react';
import { shallow } from 'enzyme';
import Product from './Product';

describe('Product', () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(<Product />));

  it('should render a <div />', () => {
    expect(wrapper.find('Box').length).toEqual(2);
  });
  
});