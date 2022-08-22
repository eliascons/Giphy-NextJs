import Head from 'next/head';
import axios from 'axios';
import styles from '../styles/home.module.css';


const API_KEY = 'Z8DTlGW5al5HYivAGm88KL6ov2MtCgbf';



export async function getStaticProps() {
  

  const response = await axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=13&rating=g`);
  return {
    props: { gifs: response.data.data }
  }
}

export default function Home({ gifs }) {



  return (
    <div>
      <Head>
        <title>Giphy-App</title>
      </Head>

      <h1 className={styles.title}>Trending</h1>

      <div className={styles.container}>
        {/* move this to another component */}
        {gifs.map((gif, index) => {
          return (
            <section key={index} className={styles.imgContainer}>
              <img src={gif.images.fixed_width.url} alt='gif' ></img>
            </section>)

        })}
      </div>

    </div>
  )
}


