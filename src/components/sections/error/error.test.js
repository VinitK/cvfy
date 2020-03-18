import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ErrorComp from './error.component.jsx';

it('expect to shallow render ErrorComp', () => {
    expect(shallow(<ErrorComp />).length).toEqual(1);
})