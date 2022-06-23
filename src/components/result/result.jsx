import { HddOutlined } from "@ant-design/icons"
//Componets
import Item from "../item/item";
import Loading from "../loading/loading";
//Redux
import { useAppSelector } from "../../app/hooks";
//CSS
import styles from "./Result.module.scss";

const Result = () => {
    const { search } = useAppSelector((state) => state.app);

    const handleRender = () => {
        if (search.loading) {
            return <Loading />;   
        } else if (!search.data.length && search.filter.search !== "") {
            return (
                <div className={styles.message}>
                    <HddOutlined style={{ fontSize: 40}} />
                    <p>Don't found products.<br />
                    Try with another word (Ex: mario).</p>
                </div>
            )
        }
    }

    return (
        <div className={styles.main}>
            {handleRender()}
            {search.data.map((x) => (
                <Item key={x._id} item={x} />
            ))}
        </div>
    );
};

export default Result;
