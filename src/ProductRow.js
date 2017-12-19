import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ProductRow extends Component {

    render(){
        let product = this.props.product
        return(
            <div>
                <td>{product.product_id}</td>
                <td id='description'>{product.description}</td>
                <td id= 'datetime'>{product.datetime}</td>
                <td id='position'>{product.longitude}</td>
                <td id='position'>{product.latitude}</td>
                <td>{product.elevation}</td>
                <td id='button'><button id='update' onClick={this.props.onUpdateProduct.bind(this, product.id)}>Edit</button></td>
                <td id='button'><button id='delete' onClick={this.props.onDeleteProduct.bind(this, product.id)}>Delete</button></td>
            </div>
        )
    }
}

ProductRow.PropTypes = {
    product: [],
    isLoading: false,
    onDeleteProduct: PropTypes.func.isRequired,
    onUpdateProduct: PropTypes.func.isRequired
}

export default ProductRow