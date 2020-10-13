import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col}  from  'react-bootstrap'
import Product from '../Components/Product'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {ListProducts} from '../Actions/ProductActions'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const ProductList = useSelector(state => state.ProductList)
    const { loading, error, products } = ProductList
    
    useEffect(() => {
        dispatch(ListProducts())
    }, [dispatch])
 

    return (
        <>
            <h2>Latest Products</h2>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} xl={3}>
                            <Product product={product}/>
                        </Col>
                    ))}
                </Row>
            }
        </>
    )
}

export default HomeScreen
