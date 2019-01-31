import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { observer, inject } from 'mobx-react'
import { Product } from '../../stores'

export interface ProductDetailProps {
    product: Product
}

export class ProductDetail extends React.Component<ProductDetailProps, any> {
    render() {
        console.log(this.props)
        return (
            <div>
                <h2>{this.props.product.description}</h2>
            </div>
        )
    }
}
