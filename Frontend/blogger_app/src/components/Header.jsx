import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import TagsCard from './Tags';

//Header Component, which handles the Search Bar Query
function Header({FilterTags,refreshTags}){
    const nav =  useNavigate();
    const user = localStorage.getItem("Name");
    const [isHovered, setIsHovered] = useState(false);
    const [searchText,setSearchText] = useState('');
    const [searchTags,setSearchTags] = useState([]);
    const DeleteTags = (index) => {
        setSearchTags((tag) => tag.filter((val, ind) => ind !== index));
    }
    const EnterTags = (e) => {

        if (e.key === 'Enter' && searchText.trim() !== '' && !searchTags.includes(searchText.trim())) {
            e.preventDefault();
            setSearchTags((prevTags) => [...prevTags, searchText.trim()]);
            setSearchText('');
        }

    };
    return (
        <div style={{ padding: "30px", zIndex: "1000", position: "fixed", display: "flex", justifyContent: "space-between", backgroundColor: "white", width: "100%", boxSizing: "border-box" }}>
            {/* Blogger title */}
            <div style={{ fontWeight: "bold", fontSize: "24px", cursor: "pointer" }} onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); refreshTags(); setSearchTags([]); }}>
                Blogger
            </div>

           {/* Search Bar With Tag Logic */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    
                    <TagsCard tags={searchTags} onclick={DeleteTags} readonly={false} />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={EnterTags}
                        style={{
                            border: 'none',
                            outline: 'none',
                            flexGrow: 1,
                            fontSize: '16px',
                            padding: '10px', 
                            margin: '0',
                            color: '#555',
                            height: '30px',
                        }}
                    />
                    <FontAwesomeIcon style={{ padding: "5px 10px" }} onClick={()=>FilterTags(searchTags)} icon={faSearch} />
                </div>

               {/* Home */}
                <div style={{ cursor: "pointer" }} onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); refreshTags(); setSearchTags([]); }}>
                    Home
                </div>
            </div>

           {/* Profile with Profile Screen and Logout logic if logged in, else prompt to login */}
            {user !== null ? (
                <div onClick={() => setIsHovered(!isHovered)} style={{ position: "relative" }}>
                    <FontAwesomeIcon icon={faUser} style={{ fontSize: "24px", cursor: "pointer" }} />

                    {isHovered && (
                        <div style={{
                            position: "absolute",
                            top: "30px",
                            right: "0",
                            backgroundColor: "#fff",
                            border: "1px solid #ddd",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            padding: "10px",
                            borderRadius: "4px",
                            width: "150px",
                            transition: "opacity 0.3s ease", 
                        }}>
                            <div onClick={() => { nav("/profile"); }}>Profile</div>
                            <div>Settings</div>
                            <div onClick={() => {
                                localStorage.removeItem("Name");
                                window.location.reload();
                            }}>Logout</div>
                        </div>
                    )}
                </div>
            ) : (
                <div onClick={() => { nav('/login'); }}>Login</div>
            )}
        </div>
    );

}

export default Header;