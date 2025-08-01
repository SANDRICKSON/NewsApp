import { useState } from "react";

const Navbar = ({ setCategory, onSearch }) => {
    const [activeCategory, setActiveCategory] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const handleCategoryClick = (category) => {
        setCategory(category);
        setActiveCategory(category);
    };

    const handleSearch = (e) => {
        e.preventDefault(); // ფორმის გადატვირთვა რომ არ მოხდეს
        if (searchInput.trim()) {
            onSearch(searchInput.trim());
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <span className="badge bg-light text-dark fs-4">NewsMag</span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {["technology", "business", "health", "entertainment", "sports"].map((category) => (
                            <li className="nav-item" key={category}>
                                <a
                                    className={`nav-link ${activeCategory === category ? "active" : ""}`}
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <form className="d-flex" role="search" onSubmit={handleSearch}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
