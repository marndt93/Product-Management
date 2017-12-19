import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AddProductModal extends Component {

    state = {
        'product': {
            'product_id': '',
            'description': '',
            'datetime': '',
            'longitude': '',
            'latitude': '',
            'elevation': '',    
        }
    }

    onChange = () => {
        this.setState({
            'product': {
                'product_id': document.getElementById('product_id').value,
                'description': document.getElementById('description2').value,
                'datetime': document.getElementById('datetime2').value,
                'longitude': document.getElementById('longitude').value,
                'latitude': document.getElementById('latitude').value,
                'elevation': document.getElementById('elevation').value,
            }
        })
    }

    onSaveProduct = () => {
        this.props.onAddProduct(this.state.product)
    }

    render(){
        return(
            <div>
                Product id: <input type="text" id="product_id" onChange={this.onChange}/><br/>
                Description: <input type="text" id="description2" onChange={this.onChange}/><br/>
                Datetime: <input type="text" id="datetime2" onChange={this.onChange}/><br/>
                Longitude: <input type="text" id="longitude" onChange={this.onChange}/><br/>
                Latitude: <input type="text" id="latitude" onChange={this.onChange}/><br/>
                Elevation: <input type="text" id="elevation" onChange={this.onChange}/><br/>
                <button id='save' onClick={this.onSaveProduct}>Add Product</button>
            </div>
        )
    }
}

AddProductModal.PropTypes = {
    onAddProduct: PropTypes.func.isRequired

}

export default AddProductModal