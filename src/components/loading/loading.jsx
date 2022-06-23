//Ant
import { Card } from "antd";
//CSS
import styles from "./Loading.module.scss";

const Loading = () => {
    return (
        <>
            {[...Array(3)].map(x => (
                <Card key={x} className={styles.itemCard} loading={true}>
                </Card>
            ))}
        </>
    );
};

export default Loading;
