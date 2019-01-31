import * as React from 'react'
import * as ReactDOM from 'react-dom'

import moment from 'moment'

import Button from 'react-bootstrap/Button'

import { observer, inject } from 'mobx-react'

import ReactTable, { Column, RowInfo } from 'react-table'
import "react-table/react-table.css";

import { BuddyStore, Product } from '../../stores'

import { ProductDetail } from './Detail'
import { AdvancedSearch } from './AdvancedSearch'

import { keys } from 'ts-transformer-keys'

export interface ProductListProps {
    buddyStore?: BuddyStore
}

export interface ProductListState {
    showModal: boolean
}

@inject('buddyStore')
@observer
export class ProductList extends React.Component<ProductListProps, ProductListState> {
    constructor(props: any, context: any) {
        super(props, context)
        this.state = {
            showModal: false
        }
    }

    componentWillMount() {
        if (this.props.buddyStore) {
            this.props.buddyStore.getInventory()
        }
    }

    openAdvanced = () => {
        this.setState({
            showModal: true
        })
    }

    resetSearch = () => {
        if (this.props.buddyStore) {
            this.props.buddyStore.getInventory()
        }
    }

    searchWith = (params: any) => {
        if (this.props.buddyStore) {
            this.props.buddyStore.getInventory(params)
        }
    }

    columns = () => {
        return [
            {
                Header: 'Product ID',
                accessor: 'product_id',
                filterMethod: (filter: any, row: any) => {
                    // partial matching
                    return row[filter.id].toString().indexOf(filter.value) !== -1
                }
            },
            {
                Header: 'Description',
                accessor: 'description',
                filterMethod: (filter: any, row: any) => {
                    // partial and case-insensitive matching
                    const objValue = row[filter.id].toLowerCase()
                    const filterValue = filter.value.toLowerCase()
                    return objValue.indexOf(filterValue) !== -1
                }
            },
            {
                Header: 'Cost',
                accessor: 'cost',
                Cell: (props: any) => props.value.toFixed(2),
                filterMethod: (filter: any, row: any) => {
                    return row[filter.id] == filter.value
                }
            },
            {
                Header: 'Price',
                accessor: 'price',
                Cell: (props: any) => props.value.toFixed(2),
                filterMethod: (filter: any, row: any) => {
                    return row[filter.id] == filter.value
                }
            },
            {
                Header: 'Department',
                accessor: 'department',
                filterMethod: (filter: any, row: any) => {
                    if (filter.value == "all") {
                        return true
                    }
                    return row[filter.id] == filter.value
                },
                // @ts-ignore
                Filter: ({ filter, onChange }) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={filter ? filter.value : "all"}
                    >
                        <option value="all">Show All</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Produce">Produce</option>
                        <option value="Pharmacy">Pharmacy</option>
                    </select>
            },
            {
                Header: 'Shelf Life',
                accessor: 'shelf_life',
                Cell: (props: any) => `${props.value} days`
            },
            {
                Header: 'Last Sold',
                accessor: 'last_sold',
                Cell: (props: any) => moment(props.value, "YYYY-MM-DD").format("M/D/YYYY"),
                filterMethod: (filter: any, row: any) => {
                    const formatted = moment(row[filter.id], "YYYY-MM-DD").format("M/D/YYYY")
                    return formatted == filter.value
                }
            },
        ]
    }

    render() {
        return (
            <div>
                <div>
                    <div className='left'>
                        <h2>Inventory</h2>
                    </div>
                    <div>
                        <Button variant="primary" onClick={this.openAdvanced}>Advanced Search</Button>
                        <Button variant="primary" onClick={this.resetSearch}>Reset Search</Button>
                    </div>
                </div>
                <ReactTable
                    filterable
                    columns={this.columns()}
                    data={this.props.buddyStore!.inventory}
                    noDataText="No Products to Display"
                    showPagination={true}
                    SubComponent={row => {
                        return <ProductDetail product={row.original} />
                    }}
                />
                <AdvancedSearch
                    show={this.state.showModal}
                    onSearch={(params) => this.searchWith(params)}
                    onClose={() => this.setState({ showModal: false })}
                />
            </div>
        )
    }
}
