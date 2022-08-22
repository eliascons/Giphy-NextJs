import Head from "next/head";
import Router from "next/router";
import fetch from "isomorphic-unfetch";
import { useState } from "react";
import axios from "axios";
import styles from "../../styles/saved.module.css";

Save.getInitialProps = async (ctx) => {
  const cookie = ctx.req?.headers.cookie;

  const response = await fetch("http://localhost:3000/api/gifs", {
    headers: { cookie: cookie },
  });

  if (response.status === 401 && !ctx.req) {
    Router.replace("/containers/login");
    return {};
  }

  if (response.status === 401 && ctx.req) {
    ctx.res.writeHead(302, {
      Location: "http://localhost:3000/containers/login",
    });

    ctx.res?.end();
    return;
  }

  const data = await response.json();
  return { gifs: { data } };
};

function Save({ gifs }) {
  const [myGifs, setMyGifs] = useState(gifs.data);

  const handleRemove = async (id) => {
    const deletedGif = await axios.delete(`/api/gifs/${id}`);
    console.log(deletedGif.data);
    const updatedGifs = await axios.get("/api/gifs");

    setMyGifs(updatedGifs.data);
  };

  return (
    <div>
      <Head>
        <title>Saved</title>
      </Head>
      <h1>Saved</h1>
      <div className={styles.container}>
        {myGifs.map((gif, i) => {
          return (
            <div key={i} className={styles.imgContainer}>
              <div className={styles.imgItems}>
                <div className={styles.image}>
                  <img src={gif.url} alt={gif}></img>
                </div>
                <button onClick={() => handleRemove(gif._id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Save;
