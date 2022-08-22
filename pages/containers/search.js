import Head from "next/head";
import Router from "next/router";
import { useState } from "react";
import axios from "axios";

// import styles from '../styles/home.module.css';

export async function getServerSideProps(ctx) {
  const cookie = ctx.req?.headers.cookie;
  if (!cookie) return { props: {} };

  return {
    props: { cookie: cookie },
  };
}

function Search({ cookie }) {
  const [input, setInput] = useState("");
  const [gifs, setGifs] = useState([]);

  const verify = () => {
    if (!cookie) {
      Router.push("/containers/login");
    }
  };

  const handleSave = async (url) => {
    verify();
    try{
      const resp = await axios.post('/api/gifs', {url});
    }catch(error){
      console.log(error);
    }
    

  };

  const handleSearch = async () => {
    if (!input) return console.log("No input found");

    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=Z8DTlGW5al5HYivAGm88KL6ov2MtCgbf&q=${input}&limit=25&offset=0&rating=g&lang=en`,
        { method: "GET" }
      );
      const data = await response.json();

      setGifs(data.data);
      setInput("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>Search</title>
      </Head>

      <h1>Search</h1>

      <input type="text" value={input} onChange={(e) => setInput(e.target.value)}></input>
      <button onClick={handleSearch}>Search</button>
      <div className="">
        {gifs.map((gif, index) => {
          return (
            <section key={index} className="">
              <img src={gif.images.fixed_width.url} alt="gif"></img>
              <button onClick={() => handleSave(gif.images.fixed_width.url)}>
                Save
              </button>
            </section>
          );
        })}
      </div>
    </>
  );
}

export default Search;
