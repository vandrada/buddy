import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Modal from 'react-bootstrap/Modal'

import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css'

import { Product, Department, Unit } from '../../stores'

import { SearchBox } from '../SearchBox'
import { SearchDropdown } from '../SearchDropdown'

export interface AdvancedSearchProps {
    show: boolean
    onSearch: (params: any) => void,
    onClose: () => void,
}

export interface AdvancedSearchState {
    product: Product
}


export class AdvancedSearch extends React.Component<AdvancedSearchProps, AdvancedSearchState> {
    constructor(props: any, context: any) {
        super(props, context)
        this.state = {
            product: {} as Product
        }
    }

    onSubmit = () => {
        this.props.onClose()
        this.props.onSearch(this.state.product)
        this.setState({ product: {} as Product })
    }

    updateProduct(obj: Partial<Product>) {
        this.setState((prevState => ({
            product: { ...prevState.product, ...obj }
        })))
    }

    render() {
        return (
            <Modal size="sm" show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>Advanced Search</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.onSubmit}>
                        <div className="row1">
                            <SearchBox
                                labelText="Product ID"
                                onChange={(text) => this.updateProduct({ product_id: Number(text) })}
                            />
                            <SearchBox
                                labelText="Description"
                                onChange={(text) => this.updateProduct({ description: text })}
                            />
                        </div>
                        <div className="row2">
                            <SearchBox
                                labelText="Cost"
                                onChange={(text) => this.updateProduct({ cost: Number(text) })}
                            />
                            <SearchBox
                                labelText="Price"
                                onChange={(text) => this.updateProduct({ price: Number(text) })}
                            />
                        </div>
                        <div className="row3">
                            <SearchDropdown
                                title="Department"
                                onChange={(option) => this.updateProduct({ department: Department[option] })}
                                options={Department}
                                placeholder="Deparment"
                            />
                            <SearchDropdown
                                title="Unit"
                                onChange={(option) => this.updateProduct({ unit: Unit[option] })}
                                options={Unit}
                                placeholder="Unit"
                            />
                        </div>
                    </form>
                    <div>
                        <Button variant="primary" onClick={this.onSubmit} style={{ float: 'left' }}>Search</Button>
                        <Button variant="primary" onClick={() => this.props.onClose()} style={{ float: 'right' }}>Close</Button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        )
    }
}
