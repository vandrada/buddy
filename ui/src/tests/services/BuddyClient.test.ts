import sinon from 'sinon';

import { BuddyClient, BuddyEndpoint } from '../../services/BuddyClient'

describe('BuddyClient', () => {
    it('it works', () => {
        expect(true).toBe(true)
    })

    it('can be created', () => {
        const buddy = new BuddyClient()
        expect(buddy).not.toBe(null)
    })

    it('delegates to endointFor', () => {
        const buddy = new BuddyClient()
        const mock = sinon.mock(buddy)
        buddy.getInventory()
        mock.expects("endpointFor").once()
    })

    it('uses Inventory', () => {
        const buddy = new BuddyClient()
        const mock = sinon.mock(buddy)
        const spy = sinon.spy(buddy, "endpointFor")
        buddy.getInventory()
        sinon.assert.calledWith(spy, BuddyEndpoint.Inventory)
    })

    it('can accept args', () => {
        const buddy = new BuddyClient()
        const spy = sinon.spy(buddy, "paramsFor")
        buddy.getInventory({ hello: "world" })
        sinon.assert.calledOnce(spy)
    })

    it('only calls paramsFor when needed', () => {
        const buddy = new BuddyClient()
        const spy = sinon.spy(buddy, "paramsFor")
        sinon.assert.notCalled(spy)
    })

    it('calls with appropriate object', () => {
        const buddy = new BuddyClient()
        const spy = sinon.spy(buddy, "paramsFor")
        buddy.getInventory({ hello: "world" })
        sinon.assert.calledWith(spy, { hello: "world" })
    })
})
