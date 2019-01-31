import * as Enzyme from 'enzyme'

import sinon from 'sinon'
import { shallow } from 'enzyme'
import React from 'react'

import { AdvancedSearch } from '../../../components/Products/AdvancedSearch'

import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('AdvancedSearch', () => {
    it('renders', () => {
        const shallow = Enzyme.mount(React.createElement(AdvancedSearch, { show: true, onSearch: () => null, onClose: () => null }))
        expect(shallow.exists()).toBe(true)
    })

    it('updates state', () => {
        const shallow = Enzyme.mount(React.createElement(AdvancedSearch, { show: true, onSearch: () => null, onClose: () => null }))
        shallow.instance().updateProduct({ description: "something" })
        expect(shallow.state('product').description).toBe("something")
    })

    it('calls onSearch and onClose', () => {
        const searchSpy = sinon.mock()
        const closeSpy = sinon.mock()
        const shallow = Enzyme.mount(React.createElement(AdvancedSearch, {
            show: true,
            onSearch: searchSpy,
            onClose: closeSpy
        }))
        shallow.instance().onSubmit()
        sinon.assert.calledOnce(searchSpy)
        sinon.assert.calledOnce(closeSpy)
    })
})
