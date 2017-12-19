import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProductRow from './ProductRow'

class ProductTable extends Component {

    render(){
        let products = this.props.products
        return(
            <div>
                <table>
                {products.map(product => 
                    <tr>
                        <ProductRow 
                        key={product.id} 
                        product={product} 
                        onDeleteProduct={this.props.onDeleteProduct}
                        onUpdateProduct={this.props.onUpdateProduct}
                        />
                    </tr>)}
                </table>
            </div>
        )
    }
}

ProductTable.PropTypes = {
    products: [],
    isLoading: false,
    onDeleteProduct: PropTypes.func.isRequired,
    onUpdateProduct: PropTypes.func.isRequired
}

export default ProductTable