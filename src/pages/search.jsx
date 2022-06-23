/* eslint react-hooks/exhaustive-deps: 0 */
import { useEffect } from "react";
//Components
import SearchAndFilter from "../components/searchAndFilter/searchAndFilter";
import Result from "../components/result/result";
import Header from "../components/header/header";
import Cart from "../components/cart/cart";

//CSS
import styles from "../styles/Search.module.scss";
//Redux
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setFilter, searchProducts } from "../app/reducers/searchSlice";
import { addItemsToCart } from "../app/reducers/cartSlice";

const Search = () => {
    const dispatch = useAppDispatch();
    const { search } = useAppSelector((state) => state.app);

    useEffect(() => {
        const data = localStorage.getItem('cart');

        if(data && data.length) {
            dispatch(addItemsToCart(JSON.parse(data)));
        }
    }, []);

    //useEffect that check if user finish
    useEffect(() => {
        const timeFn = setTimeout(() => {
            handleRequestToApi();
        }, 300)
        
        return () =>  clearTimeout(timeFn);
    }, [search.filter.search])

    const handleRequestToApi = async () => {
        if (search.filter.search !== "") {
            await dispatch(searchProducts());
        }
    }

    const handleOnChange = (value) => {
        dispatch(setFilter(value));
    }

    return (
        <div>
            <div className={styles.navbar}>
                <Header />
            </div>
            <div className={`${search.filter.search !== "" ? styles.transformContainer : styles.container}`}>
                <div className={styles.main}>
                    <SearchAndFilter
                        handleOnChange={handleOnChange}
                    />
                </div>
                <div className={styles.result}>
                    <Result />
                </div>
            </div>
            <div>
                <Cart /> 
            </div>
        </div>
    );
};

export default Search;
