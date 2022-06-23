import { useState, useEffect } from "react";
//Ant
import { 
    Input,
} from "antd";
//CSS
import styles from "./SearchAndFilter.module.scss";


const SearchAndFilter = ({ handleOnChange }) => {
    const [mobile, setMobile] = useState(true);

    useEffect(() => {
        const isMobile = typeof window === "undefined";
        
        if (!isMobile) {
            setMobile(false);
        }
    }, []);

    return (
        <>
            <div className={styles.container}>
                <Input 
                    placeholder="Enter product"
                    size={mobile ? "small" : "large"}
                    className={styles.inputSearch}
                    onChange={(e) => handleOnChange(e.target.value)}
                />
            </div>
        </>
    );
};

export default SearchAndFilter;
