import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import ProductTable from './ProductTable'
import Modal from 'react-modal'
import AddProductModal from './AddProductModal'
import ImportModal from './ImportModal'
import UpdateModal from './UpdateModal'

class App extends Component {

  constructor(){
    super();
    this.state = {
      products: [],
      isLoading: false,
      showProductModal: false,
      ShowImportModal:false,
      showUpdateModal:false,
    }
  }

  componentDidMount() {
    this.loadProducts()
  }

  loadProducts = () => {
    this.setState({isLoading: true})
    axios.get('/products')
      .then(res => {
              console.log(res)
              this.setState({
                products: res.data.payload,
                isLoading: false,
              })
      })
  }

  onDeleteProduct = (id) => {
    this.setState({isLoading: true})
    axios.delete('/products/'+id)
      .then(res => {
        console.log(res)
        this.loadProducts()
      })
      
  }

  onUpdateProduct = () => {
    
  }

  onAddProduct = (product) => {
    this.hideProductModal()
    this.setState({isLoading: true})
    axios.post('/products/', product)
      .then(res => {
        console.log(res)
        this.loadProducts()
      })
  }

  showProductModal = () => {
    this.setState({
      showProductModal: true
    })
  }

  hideProductModal = () => {
    this.setState({
      showProductModal: false
    })
  }

  ShowImportModal = () => {
    this.setState({
      ShowImportModal: true
    })
  }

  hideImportModal = () => {
    this.setState({
      ShowImportModal: false
    })
  }

  onImportProducts = () => {
    var fileSelector = document.createElement('input')
    fileSelector.setAttribute('type', 'file')
    fileSelector.setAttribute('id', 'file')
    var selectDialogueLink = document.createElement('a')
    selectDialogueLink.setAttribute('href', '')
    
    fileSelector.click()

    var file = document.getElementById('file').files[0];
  }

  onExportProducts = () => {
    window.open('/products/?format=tsv', '_blank')
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Product Management</h1>
        </header>
        <div className="App-intro">
          <button id='showProductModal' onClick={this.showProductModal}>Add</button>
          <button id='import' onClick={this.ShowImportModal.bind(this)}>Import</button>
          <button id='export' onClick={this.onExportProducts}>Export</button>
        </div>
        <ProductTable
          products={this.state.products}
          onDeleteProduct={this.onDeleteProduct}
          onUpdateProduct={this.onUpdateProduct}
        />
        <Modal
          isOpen={this.state.showProductModal}
          onRequestClose={this.hideProductModal}
        >
          <AddProductModal
            onAddProduct={this.onAddProduct}
          />
        </Modal>
        <Modal
          isOpen={this.state.ShowImportModal}
          onRequestClose={this.hideImportModal}
        >
          <ImportModal/>
        </Modal>
      </div>
    );
  }
}

export default App;
