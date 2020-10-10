import React, { Component } from 'react'
import { storeProducts, detailProduct} from "./data"


//Important to note that once the context is created, it need provider and consumer

//create context object
const ProductContext = React.createContext();

class ProductProvider extends Component {

    state = {
        products: [],
        detailProduct,
    }
    componentDidMount() 
    {
        this.setProduct();
    }
    //This method will fix the reference problem
    setProduct = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];

        })
        this.setState(() => {
            return { products: tempProducts }
        })
    }

    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id)
        return product;
    }
    handleDetail = (id) => {
        //console.log("hello from details");
        const product = this.getItem(id);
        this.setState(() => {
            return {detailProduct:product}
        })
    }

    addToCart = (id) => {
        console.log(`Item has been added to cart, id is: ${id}`);
    }

    render() {
        return (
            <ProductContext.Provider value={{
                //products: this.state.products
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
            }}>
                {this.props.children} {/**Must handle children in here */}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer};

//The context API should live in the highest point of the component. 
    //Only place is Index.js because it wrapp in APP.js


//ProductProvider wrap around all component in the highest point

// ProductConsumer is being used by each individual component