import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';

import styles from './CartPage.module.scss';
import { updateQuantity, deleteProductInCart, getProductsByCartId } from '../../../service/cartApiService';
import { getListProductsSuccess } from '../../../redux/action/cartAction';
import CartContent from './CartContent/CartContent';
import CartPayment from './CartPayment/CartPayment';
import images from '../../../assets/images';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function CartPage(props) {
    const dispatch = useDispatch();
    const listProducts = useSelector((state) => state.cart.cart.products);
    const cartId = useSelector((State) => State.cart.cartId);

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalPriceOriginal, setTotalPriceOriginal] = useState(0);
    const [quantityBuy, setQuantityBuy] = useState(0);
    const [listProductChecked, setListProductChecked] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});

    useEffect(() => {
        // Tính toán totalPrice và totalPriceOriginal mỗi khi danh sách sản phẩm hoặc trạng thái checkbox thay đổi
        const newTotalPrice = listProductChecked.reduce((total, item) => {
            return total + (selectedItems[item.id] ? (item.price_current || item.price) * item.Product_Cart.quantity : 0);
        }, 0);

        const newTotalPriceOriginal = listProductChecked.reduce((total, item) => {
            return total + (selectedItems[item.id] ? item.price * item.Product_Cart.quantity : 0);
        }, 0);

        const newQuantityBuy = listProductChecked.reduce((total, item) => {
            return total + (selectedItems[item.id] ? 1 : 0);
        }, 0);

        setQuantityBuy(newQuantityBuy);
        setTotalPrice(newTotalPrice);
        setTotalPriceOriginal(newTotalPriceOriginal);
    }, [listProductChecked, selectedItems]);

    useEffect(() => {
        fetchListProductChecked();
    }, [listProducts]);

    const fetchListProductChecked = async () => {
        let data = await getProductsByCartId(cartId);
        if (data && data.EC === 0) {
            setListProductChecked(data.DT[0].Products);
            setSelectedItems(
                data.DT[0].Products.reduce((acc, item) => {
                    acc[item.id] = item.Product_Cart.isChecked;
                    return acc;
                }, {}),
            );
        }
    };

    const formatPrice = (price) => {
        if (typeof price !== 'number') {
            return '0';
        }
        return price.toLocaleString('vi-VN');
    };

    const handleIncreaseProduct = async (item) => {
        const newQuantity = (item.Product_Cart.quantity || 1) + 1;

        try {
            let data = await updateQuantity(cartId, item.id, newQuantity);
            if (data.EC !== 0) {
                toast.error(data.EM);
            }
            let res = await getProductsByCartId(cartId);
            dispatch(getListProductsSuccess(res.DT[0].Products));
        } catch (error) {
            console.error('Lỗi khi cập nhật số lượng:', error);
        }
    };

    const handleDecreaseProduct = async (item) => {
        let newQuantity = Math.max((item.Product_Cart.quantity || 1) - 1, 0);

        if (newQuantity === 0) {
            let cof = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');
            if (cof) {
                await deleteProductInCart(cartId, item.id);
                let res = await getProductsByCartId(cartId);
                dispatch(getListProductsSuccess(res.DT[0].Products));
                return;
            } else {
                newQuantity = 1;
            }
        }

        try {
            await updateQuantity(cartId, item.id, newQuantity);
            let res = await getProductsByCartId(cartId);
            dispatch(getListProductsSuccess(res.DT[0].Products));
        } catch (error) {
            console.error('Lỗi khi cập nhật số lượng:', error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Giỏ Hàng</div>
            {listProductChecked && listProductChecked.length > 0 ? (
                <div className={cx('container')}>
                    <div className={cx('cart_container')}>
                        <div className={cx('cart_left')}>
                            <CartContent
                                handleIncreaseProduct={handleIncreaseProduct}
                                handleDecreaseProduct={handleDecreaseProduct}
                                setSelectedItems={setSelectedItems}
                                selectedItems={selectedItems}
                                formatPrice={formatPrice}
                                cartId={cartId}
                                listProductChecked={listProductChecked}
                                setListProductChecked={setListProductChecked}
                            />
                        </div>
                        <div className={cx('cart_right')}>
                            <CartPayment
                                formatPrice={formatPrice}
                                totalPrice={totalPrice}
                                selectedItems={selectedItems}
                                totalPriceOriginal={totalPriceOriginal}
                                quantityBuy={quantityBuy}
                            />
                        </div>
                    </div>
                    <div className={cx('product_interest')}></div>
                </div>
            ) : (
                <div className={cx('container')}>
                    <div className={cx('empty')}>
                        <img src={images.emptyCart} alt="empty cart" className={cx('empty_img')} />
                        <p className={cx('empty_message1')}>Giỏ hàng trống</p>
                        <p className={cx('empty_message2')}>Bạn có thể quay lại trang chủ để tiếp tục mua sắm!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;
