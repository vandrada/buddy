import * as Enzyme from 'enzyme'

import sinon from 'sinon'
import { shallow } from 'enzyme'
import React from 'react'

import { ProductList } from '../../../components/Products/List'
import { BuddyStore } from '../../../stores'

import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('List', () => {
    it('renders', () => {
        const buddyStore = new BuddyStore();
        const shallow = Enzyme.mount(React.createElement(ProductList, { buddyStore: buddyStore }))
        expect(shallow.exists()).toBe(true)
    })

    it('calls getInventory on mount', () => {
        const buddyStore = new BuddyStore();
        const mock = sinon.mock(buddyStore)
        const shallow = Enzyme.mount(React.createElement(ProductList, { buddyStore: buddyStore }))
        expect(shallow.exists()).toBe(true)
        mock.expects("getInventory").once()
    })
})
