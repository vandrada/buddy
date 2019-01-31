import * as Enzyme from 'enzyme'

import sinon from 'sinon'
import { shallow } from 'enzyme'
import React from 'react'

import { SearchBox } from '../../components/SearchBox'

import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('SearchBox', () => {
    it('renders', () => {
        const shallow = Enzyme.mount(React.createElement(SearchBox, {
            labelText: '',
            onChange: () => null,
        }))
        expect(shallow.exists()).toBe(true)
    })
    it('calls onChange', () => {
        const spy = sinon.spy()
        const shallow = Enzyme.mount(React.createElement(SearchBox, {
            labelText: '',
            onChange: spy,
        }))
        shallow.instance().onChange({ event: { target: { value: "" } } })
        sinon.assert.calledOnce(spy)
    })
})
