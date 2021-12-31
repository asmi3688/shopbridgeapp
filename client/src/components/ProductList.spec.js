import React from 'react';
import { shallow } from 'enzyme';
import ProductList from './ProductList';

describe('ProductList', () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(<ProductList />));

  it('should render a <div />', () => {
    expect(wrapper.find('Box').length).toEqual(3);
  });
  
});