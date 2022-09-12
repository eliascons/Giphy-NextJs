
import axios from "axios";
import styles from "../styles/home.module.css";
import { useContext, useEffect, useState } from "react";
import { LogContext } from "../context/context.js";
import Router from "next/router";


export default function Home({ gifs }) {
  const [trendingGifs, setTrendingGifs] = useState([]);
  const { isLogged } = useContext(LogContext);

  useEffect(async () => {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=Z8DTlGW5al5HYivAGm88KL6ov2MtCgbf&limit=12&rating=g`
    );
      let data = await response.json();
     
    setTrendingGifs(data.data);
  }, []);

  const verify = () => {
    if (!isLogged) {
      Router.push("/containers/login");
    } else {
      return;
    }
  };

  const handleSave = async (url) => {
    verify();
    try {
      const resp = await axios.post("/api/gifs", { url });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>


      <h1 className={styles.title}>Trending</h1>

      <div className={styles.container}>
        {trendingGifs.map((gif, index) => {
          return (
            <div
              className={styles.galleryContainer}
              key={index}
              onClick={() => handleSave(gif.images.fixed_width.url)}
            >
              <div className={styles.galleryItem}>
                <div key={index} className={styles.image}>
                  <img
                    src={gif.images.fixed_width.url}
                    alt="gif"
                    className={styles.cardImg}
                  ></img>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className={styles.info}>Contact: eliasconsalvo@gmail.com</div>
    </div>
  );
}
