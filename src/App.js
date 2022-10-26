import { useState } from "react";
import axios from "axios";
import "./App.css";
import API_KEY from "./config";
import { useEffect } from "react";

function App() {
  const [image, setImage] = useState("");
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(1);
  // const [resulotion, setResolution] = useState("");

  // const fetchResolution = (resulotion) => {
  //   setResolution(() => resulotion)
  // } 

  const handleChange = (event) => {
    setImage(event.target.value);
    event.preventDefault();
  };

  const handleSubmit = () => {
    const url = "https://api.unsplash.com/search/photos?page=1&per_page=30&query=" + image + "&client_id=" + API_KEY;

    axios.get(url).then((response) => {
      setResult(response.data.results);
    });
  };

  const moreImages = () => {
    const url = "https://api.unsplash.com/search/photos?page=" + count + "&per_page=30&query=" + image + "&client_id=" + API_KEY;

    axios.get(url).then((response) => {
      setCount(yesCount => yesCount + 1)
      setResult(response.data.results);
    });
  };

  useEffect(() => {
    handleSubmit();
    moreImages();
    // setResolution();
  }, []);

  return (
    <div className="app">
      <div className="heading">
        <h1>Search And Use Millions Of Non-Copyrighted Images From Unsplash API</h1>
      </div>

      {/* <button onClick={() => fetchResolution("regular")}>Lower</button>
      <button onClick={() => fetchResolution("small")}>High</button>
      <button onClick={() => fetchResolution("thumb")}>Highest</button> */}

      <div className="input">
        <input onChange={handleChange} type="text" name="image" placeholder="Search by image name" />

        <button onClick={handleSubmit} type="submit"
          title="Click To Search Images"><span class="material-icons">image_search</span></button>
      </div>


      <div className="result">
        {result.map((image) => (
          <>
            <div className="card">
              <img src={image?.urls?.regular} />

              <p className="username">
                Photo by {image?.user?.name}</p>

              <p className="like"><span class="material-icons-round yoda">thumb_up_off_alt</span> {image?.likes}</p>

              {!!image?.user?.location && <p className="like"><span class="material-icons yoda">location_on</span> {image?.user?.location}</p>}

              {!!image?.user?.name && <p className="like"><span class="material-icons-round yoda">drive_file_rename_outline</span> {image?.user?.name}</p>}

            </div>
          </>
        ))}
      </div>

      {!!image && <button className="btn" onClick={moreImages} type="submit"
        title="Click To Search More Images...">More Images...<span class="material-icons">  queue_play_next</span></button>}

      <p>Built With 💝 By <a href="https://greenojegwo.netlify.app/">Green</a></p>
    </div>
  );
}
export default App;