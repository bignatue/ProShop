import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col}  from  'react-bootstrap'
import Product from '../Components/Product'
import {ListProducts} from '../Actions/ProductActions'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.ProductList)
    const { loading, error, products } = productList
    
    useEffect(() => {
        dispatch(ListProducts())
    }, [dispatch])
 

    return (
        <>
            <h2>Latest Products</h2>
            {loading ? <h3>Loading...</h3> : error ? <h3>{error}</h3> : 
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
