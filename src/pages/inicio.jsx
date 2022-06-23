import styles from "../styles/Home.module.scss";

const Inicio = () => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Bienvenido a{" "}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://mercat.cl"
                    >
                        Mercat
                    </a>
                </h1>
                <a href="/search" className={styles.primaryBtn}>
                    Buscar productos
                </a>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://www.linkedin.com/in/francomanzanares/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Created by Franco Manzanares
                </a>
            </footer>
        </div>
    );
};

export default Inicio;
