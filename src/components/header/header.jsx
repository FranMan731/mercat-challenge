import { PageHeader, Button, Tooltip } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

//Redux
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { openCart } from '../../app/reducers/cartSlice';

const Header = () => {
    const dispatch = useAppDispatch();
    const { cart } = useAppSelector((state) => state.app);

    return (
        <PageHeader
            className="site-page-header"
            title="M E R C A T"
            extra={[
                <Tooltip title="Cart">
                    <Button 
                        size="large" 
                        shape="circle" 
                        key="1" 
                        type={cart.data.length ? "primary" : "dashed"}
                        icon={<ShoppingCartOutlined />} 
                        onClick={() => dispatch(openCart())}
                    />
                </Tooltip>,
            ]}
        />
    )
};

export default Header;