import { useState } from "react";
//Ant
import { Card, Popover } from "antd";
import { CheckCircleTwoTone } from '@ant-design/icons';
//CSS
import styles from "./Item.module.scss";
//redux
import { useAppDispatch } from "../../app/hooks";
import { handleCart } from "../../app/reducers/cartSlice";
import { setItem } from "../../app/reducers/searchSlice";

const Item = ({item}) => {
    const dispatch = useAppDispatch();
    const [visible, setVisible] = useState(false);

    const { Meta } = Card;
    const image = item.image != null ? item.image : null;

    const hide = () => {
        setVisible(false);
    };

    const handleVisibleChange = (newVisible) => {
        setVisible(newVisible);
    };

    const handleActionCart = (action) => {
        hide();
        dispatch(setItem({action, _id: item._id}));
        dispatch(handleCart({action, item}));
    }

    const handleRenderAction = () => {
        if (!item.added) {
            return (
                <a onClick={() => handleActionCart(true)}>Add to cart</a>
            )
        } else {
            return (
                <a onClick={() => handleActionCart(false)}>Remove to cart</a>
            )
        }
    }

    return (
        <Popover
            content={handleRenderAction()}
            title={`${item.name}`} 
            trigger="hover"
            visible={visible}
            onVisibleChange={handleVisibleChange}
        >
            <Card 
                hoverable
                key={item._id} 
                className={styles.itemCard}
                cover={<img alt={`${item.name}`} src={image} />}
            >
                <Meta
                    avatar={item.added ? (<CheckCircleTwoTone twoToneColor="green" style={{ fontSize: 28 }} />) : null}
                    title={item.name}
                    description={`$ ${item.price}`}
                />
            </Card>
        </Popover>
    );
};

export default Item;
