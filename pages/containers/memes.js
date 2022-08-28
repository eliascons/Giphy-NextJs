import axios from "axios";
import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../../styles/memes.module.css";
function Memes() {
  const [memes, setMemes] = useState([]);

  useEffect(async () => {
    try {
      const response = await axios.get("https://www.reddit.com/r/memes/.json");
      setMemes(response.data.data.children);
      console.log(response.data.data.children);
    } catch (err) {
      console.log(err);
    }
  }, []);
  //   console.log(memes)
  return (
    <div>
      <Head>
        <title>Giphy-App - Memes</title>
      </Head>
      <h1 className={styles.title}>Memes</h1>
      <div className={styles.container}>
        {memes
          .filter((meme) => {
            return meme.data.post_hint === "image";
          })
          .map((meme, index) => {
            return (
              <section
                key={index}
                className={styles.galleryContainer}
                //   onClick={() => handleSave(meme.images.fixed_width.url)}
              >
                <div className={styles.galleryItem}>
                  <div className={styles.image}>
                    <img
                      src={meme.data.url_overridden_by_dest}
                      alt="meme"
                      className={styles.cardImg}
                    ></img>
                    
                  </div>
                  
                </div>
                
              </section>
              
            );
          })}
      </div>
    </div>
  );
}

export default Memes;
