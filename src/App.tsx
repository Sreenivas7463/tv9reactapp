import * as React from "react";
import parse from "html-react-parser";
import "./styles.css";

export default function App() {
  const [users, setUsers] = React.useState([]);
  const f = async () => {
    const res = await fetch(
      "https://tv9telugu.com/wp-json/wp/v2/posts?_embed&per_page=100&page=1",
      {
        mode: "cors"
      }
    );
    const json = await res.json();
    setUsers(json);
  };
  React.useEffect(() => {
    f();
  }, []);
  return (
    <div className="App">
      <h1>TV9 News</h1>
      <div className="flex">
        {users.length &&
          users.map((user) => {
            return (
              <div key={user.id}>
                <p>
                  <strong>{parse(user.title.rendered)}</strong>
                </p>

                <img
                  key={user.id}
                  alt={user.title.rendered}
                  src={user["_embedded"]["wp:featuredmedia"][0]["source_url"]}
                />
                <p className="right">
                  Author: {user["_embedded"]["author"][0]["name"]}
                </p>

                {parse(user.excerpt.rendered)}
                <p className="center">
                  <a href={user.link} target="_blank" rel="noreferrer">
                    Source Url
                  </a>
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
