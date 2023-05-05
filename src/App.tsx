import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import Header from "./component/header";
import Main from "./component/main";

function App() {
  const [fontSyle, setFontStyle] = useState(
    JSON.parse(localStorage.getItem("fontStyle") as string) || "font-serif"
  );
  const [searchText, setSearchText] = useState(
    () => new URLSearchParams(window.location.search).get("keyword") || ""
  );
  const [darkModeToggle, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode") as string) || false
  );
  const [fetchedData, setFetchedData] = useState({});
  const [stillFecthing, setStillFetching] = useState(true);

  function loadingHandler() {
    if (!new URLSearchParams(window.location.search).get("keyword")) {
      return <div className="self-center">Enter Keyword</div>;
    } else if (stillFecthing) {
      return <div className="self-center">Loading please wait..</div>;
    } else {
      return Array.isArray(fetchedData) ? (
        <Main dictionaryResult={fetchedData[0]} />
      ) : (
        <div className="flex w-full justify-center">
          {<p>No match found in the dictionary.</p>}
        </div>
      );
    }
  }

  useEffect(() => {
    async function fetchDictionaryData(query: string) {
      setStillFetching(true);
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
        );
        const result: Response = await response.json();
        if (!response.ok) throw new Error("Something went wrong!");
        setFetchedData(result);
      } catch (err) {
        console.log(err);
      } finally {
        setStillFetching(false);
      }
    }
    if (!searchText) return;
    fetchDictionaryData(searchText);
  }, []);

  return (
    <div className={`${darkModeToggle ? "dark" : ""} `}>
      <div className={"dark:bg-black dark:text-white"}>
        <div className={"max-w-lg container my-0 mx-auto"}>
          <div
            className={`min-h-screen p-4 flex flex-col space-y-6 ${fontSyle}`}
          >
            <Header
              setFontStyle={setFontStyle}
              setDarkMode={setDarkMode}
              darkModeToggle={darkModeToggle}
              currentFontStyle={fontSyle}
            />
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const url = new URL(window.location.href);
                  url.searchParams.set("keyword", searchText.toLowerCase());
                  history.pushState({}, "", url);
                  window.location.href = url.toString();
                }}
              >
                <div className="flex flex-row relative items-center">
                  <input
                    type="text"
                    id="search-input-id"
                    placeholder="type here..."
                    className="bg-gray-200 dark:bg-gray-600 w-full rounded-full px-4 py-1"
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                  />
                  <FiSearch
                    className="absolute right-4 text-purple-500"
                    size={20}
                  />
                </div>
              </form>
            </div>
            {loadingHandler()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
