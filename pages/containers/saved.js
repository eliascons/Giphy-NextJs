import Head from "next/head";
import Router from "next/router";
import fetch from "isomorphic-unfetch";
import { useState } from "react";
import axios from "axios";
import styles from "../../styles/saved.module.css";
import Display from "../../components/Display.js";

Save.getInitialProps = async (ctx) => {
  const cookie = ctx.req?.headers.cookie;
  
  const response = await fetch("/api/gifs", {
    headers: { cookie: cookie },
  });

  if (response.status === 401 && !ctx.req) {
    Router.replace("/containers/login");
    return {};
  }

  if (response.status === 401 && ctx.req) {
    ctx.res.writeHead(302, {
      Location: "/containers/login",
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
        <title>Giphy-App - Saved</title>
      </Head>
      <h1 className={styles.title}>Saved</h1>
      <Display arr={myGifs} func={handleRemove} text="Delete" styles={styles} />
    </div>
  );
}

export default Save;
