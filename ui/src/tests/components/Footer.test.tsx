import * as Enzyme from 'enzyme'

import { shallow } from 'enzyme'
import React from 'react'

import { Footer } from '../../components/Footer'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('Footer', () => {
    it('renders', () => {
        const shallow = Enzyme.mount(React.createElement(Footer, {}))
        expect(shallow.exists()).toBe(true)
    })

    it('renders with message', () => {
        const shallow = Enzyme.mount(React.createElement(Footer, {}))
        expect(shallow.find('footer').exists()).toBe(true)
    })
})
