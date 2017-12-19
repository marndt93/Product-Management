import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ImportModal extends Component {
    render(){
        return(
            <div>
                <form action="/load/" method="POST" enctype="multipart/form-data" id="upload_form"> 
                    <label for="name">File: </label>
                    <input type="file" name="csv_file" id="csv_file" required="True"/>
                    <button type="submit" form="upload_form">Upload</button>
                </form>

            </div>
        )
    }
}

export default ImportModal