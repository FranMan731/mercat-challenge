import { Button, Drawer, Space, List, Avatar, Divider } from 'antd';
import { CloseCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
//redux
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { clearCart, openCart, handleCart, finish } from '../../app/reducers/cartSlice';
import { resetItems, setItem } from '../../app/reducers/searchSlice';


const Cart = () => {
    const dispatch = useAppDispatch();
    const { cart } = useAppSelector((state) => state.app);

    const onClose = () => {
        dispatch(openCart());
    };

    const handleClearCart = () => {
        onClose();
        dispatch(clearCart());
        dispatch(resetItems());
    }

    const handleActionCart = (action, item) => {
        dispatch(setItem({action, _id: item._id}));
        dispatch(handleCart({action, item}));
    }

    const handlePay = () => {
        dispatch(finish());
        dispatch(resetItems());
    }

    return (
        <>
            <Drawer
                title="Cart"
                placement="right"
                width={366}
                onClose={onClose}
                visible={cart.open}
                extra={
                    <Space>
                        <Button onClick={handleClearCart} disabled={!cart.data.length}>Clear</Button>
                        <Button type="primary" onClick={handlePay} disabled={!cart.data.length}>
                            Pay
                        </Button>
                    </Space>
                }
            >
                <List
                    locale={{emptyText: "Without products added"}}
                    dataSource={cart.data}
                    renderItem={(item) => (
                        <List.Item key={item._id}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.image} />}
                            title={`${item.name} x ${item.cantidad}`}
                        />
                            <div>$ {item.price}</div>
                            <Button 
                                style={{marginLeft: 5}} 
                                type="link" 
                                shape="circle" 
                                danger 
                                icon={<CloseCircleOutlined />}
                                onClick={() => handleActionCart(false, item)}
                            />
                            <Button 
                                type="link" 
                                shape="circle"
                                icon={<PlusCircleOutlined />}
                                onClick={() => handleActionCart(true, item)}
                            />
                        </List.Item>
                    )}
                    footer={(
                        <Divider plain>Total a pagar: $ {cart.total}</Divider>
                    )}
                />
            </Drawer>
        </>
    );
};

export default Cart;