import { useState } from "react";
import Navbar from "./components/navbar";


import NewsBoard from "./components/NewsBoard";

const App = () => {
    const [category, setCategory] = useState("technology");
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div>
            <Navbar
                setCategory={setCategory}
                onSearch={(query) => setSearchQuery(query)}
            />
            <NewsBoard category={category} searchQuery={searchQuery} />
        </div>
    );
};

export default App;
