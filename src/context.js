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
        //cart: storeProducts,
        modalOpen: false,
        modalProduct: detailProduct, 
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
    }
    componentDidMount() 
    {
        this.setProduct();
        
    }

    componentWillUpdate() {
        localStorage.setItem("Item", JSON.stringify(this.state.cart));
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
        }, () => this.addTotals()) //run the add total method when the item is added to the cart

        localStorage.getItem('Item') && this.setState({
            Item: JSON.parse(localStorage.getItem('Item')), 
            isLoading: false
        })
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

    // This section is for cart component -------------

    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selected = tempCart.find(item => item.id === id);

        const index = tempCart.indexOf(selected);
        const product = tempCart[index];

        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(() => {
            return {
                cart:[...tempCart]
            }
        }, () => {
            this.addTotals();

        })
    }

    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selected = tempCart.find(item => item.id === id);

        const index = tempCart.indexOf(selected);
        const product = tempCart[index];

        product.count = product.count - 1;
        
        if(product.count === 0)
        {
            this.removeItem(id);
        }
        else {
            product.total = product.count * product.price;
            this.setState(() => {
                return {
                    cart:[...tempCart]
                }
            }, () => {
                this.addTotals();
            })
        }

        
    }

    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id); // check product in cart

        const index =  tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(() => {
            return {
                cart: [...tempCart], 
                products:[...tempProducts]
            }
        }, () => {
            this.addTotals();
        })
    }

    clearCart = () => {
        this.setState(() => {
            return{ cart: [] }
        }, () => {
            this.setProduct();
            this.addTotals();
        })//call back function
    }

    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => {
            (subTotal += item.total);
        })

        const tempTax = subTotal * 0.1;
        // get it down to 2 digits
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total,
            }
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
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart,
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