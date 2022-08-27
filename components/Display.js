

function Display({ arr, func, styles }) {
  return (
    <div className={styles.container}>
      {arr.map((gif, i) => {
        return (
          <section
            key={i}
            className={styles.galleryContainer}
            onClick={() => func(gif._id)}
          >
            <div className={styles.galleryItem}>
              <div className={styles.image}>
                <img src={gif.url} alt={gif} className={styles.cardImg}></img>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default Display;
