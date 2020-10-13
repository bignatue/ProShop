import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../Components/Message'
import {addToCart} from '../Actions/CartActions'

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const {cartItems} = cart
 

    useEffect(() => {
        if (productId) {
          dispatch(addToCart(productId, qty))
        }
      }, [dispatch, productId, qty])

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            <Row>
                <Col>Cart</Col>
            </Row>
        </>
    )
}

export default CartScreen
