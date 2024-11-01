import styles from "./Home.module.scss";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

function HomePage() {
  return (
    <>
      <Header />
      <main className={styles.app}>
        <div className="container">
          <div className="row">
            <div className="col col-lg-3 col-md-4 col-sm-0">
              <Sidebar />
            </div>
            <div
              className="col col-lg-9 col-md-8 col-sm-12"
              style={{ background: "green" }}
            >
              Click on a user to start chatting
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default HomePage;
