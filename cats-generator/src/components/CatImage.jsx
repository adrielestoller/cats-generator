import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function CatImage({ url, trigger }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingDots, setLoadingDots] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);

      return () => clearInterval(interval);
    }
  }, [loading]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data[0]?.url);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [url, trigger]);

  function handleImageLoad() {
    setLoading(false);
  }

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div id="catImage">
      {loading && <p>Loading {loadingDots}</p>}
      {data && (
        <img
          src={data}
          alt="Cat"
          onLoad={handleImageLoad}
          style={{ display: loading ? "none" : "block" }}
        />
      )}
    </div>
  );
}

CatImage.propTypes = {
  url: PropTypes.string.isRequired,
  trigger: PropTypes.number.isRequired,
};

export default CatImage;
