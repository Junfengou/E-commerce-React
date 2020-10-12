import React, { Component } from 'react'
import { storeProducts, detailProduct} from "./data"


//Important to note that once the context is created, it need provider and consumer

//create context object
const ProductContext = React.createContext();

class ProductProvider extends Component {

    state = {
        products: [],
        detailProduct,
        cart: [], 
        modalOpen: false,
        modalProduct: detailProduct, 
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


    //This target the id of the selected item
    getItem = (id) => {
        //If the id that's passed in matches the current item id
        const product = this.state.products.find(item => item.id === id)
        return product;
    }
    handleDetail = (id) => {
        //console.log("hello from details");
        const product = this.getItem(id);
        this.setState(() => {
            return {detailProduct:product,}
        })
    }

    //2:47:00 Watch this again for more details [https://www.youtube.com/watch?v=wPQ1-33teR4&t=4903s]
    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        //console.log("What is this state: ", product );
        this.setState(() => {
            return {
                products: tempProducts, cart: [...this.state.cart, product]};
        }, () => {console.log("this state: ",this.state)})
        
    };


    //Modal component will be a pop up when user click on add in cart
    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return { modalProduct: product, modalOpen: true }
        })
    }

    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false }
        })
    }

    render() {
        return (
            <ProductContext.Provider value={{
                //products: this.state.products,
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal
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