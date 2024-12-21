import React, { useState } from 'react';
import { faHeart, faBookmark,faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons"; 
import { faBookmark as faBookmarkOutline } from "@fortawesome/free-regular-svg-icons"; 
import axios from 'axios';
import TagsCard from './Tags';
import Comments from './Comments';

//Component to Display Blog either Selected or Not
//Input: Blog Details, and whether it is selected or not
function BlogCard({ blog,selected}) {
    const [newLikes, setnewLikes] = useState(blog["Likes"]);
    const [newBookmarks, setnewBookmarks] = useState(blog["Bookmarks"]);
    const [isLiked,setisLiked] = useState(false);
    const [isBookmarked, setisBookmarked] = useState(false);
    const [Comment, setComment] = useState('');
    const user = localStorage.getItem("Name");

    //POST request, for creating a new comment under the Blog
    const AddComment = () =>{
        const data = { "Name": user, "Description": Comment, "BlogId": blog["id"] };
        axios.post('http://127.0.0.1:8000/Server/comments_post/', data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response);
            window.location.reload();

        });
    }
    function ToggleLikes(){
        setnewLikes(isLiked?newLikes-1:newLikes+1);
        setisLiked(!isLiked);
    }
    function ToggleBookmarks() {
        setnewBookmarks(isBookmarked?newBookmarks-1:newBookmarks+1)
        setisBookmarked(!isBookmarked);

    }
    //If the card is selected, then  a more expanded view with more details
    if(selected){
        return (
        
        <div
            style={{
                backgroundColor: "#2c2c2c", 
                maxHeight: "600px",
                maxWidth: "1000px",
                borderRadius: "10px",
                padding: "20px",
                overflowY: "auto", 
                display: "flex",
                alignItems: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                flexDirection: "row",
                
            }}
        >
        {/* Image of the Blog */}
            <img
                    src={"http://127.0.0.1:8000" + blog["Image"]}
                    alt={blog["Title"]}
                style={{
                    width: "600px",
                    height: "600px",
                    objectFit: "cover",
                    minWidth: "600px"
                }}
            />
            <div style=
            {{
                backgroundColor: "white",
                height: "600px",
                width: "750px",
                color: "black",
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column"
            }}
            >
            {/* Author of the Blog */}
                <div style={{ padding: "15px",textAlign:"left",height: "250px" }}>
                        <h3 style={{ margin: "0 0 10px 0", fontSize: "32px" }}>{blog["Title"]}</h3>
                        <h5> Author: {blog["Author"]}</h5>
                        <p> {blog["Description"]}</p>
                </div>
                {/* Tags related to the Blog */}
                <div style={{ padding: "15px", marginTop: "75px", textAlign: "left" }}>
                        tags:  <TagsCard tags={blog["Tags"]} onclick={() => { }} readonly={true} />
                 </div>

                 {/* Likes and Bookmarks for the Blog */}
                <div style={{ padding: "15px", textAlign: "right", display: "flex",justifyContent: "flex-end" }}>
                    <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
                            {/* Increment/Decrement Like Logic */}
                        <FontAwesomeIcon style={{ marginRight: '10px' }} icon={isLiked? faHeart : faHeartOutline} onClick={()=>{ToggleLikes()}} />
                        <p style={{ fontSize: "10px", margin: 0 }}>{newLikes}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                    {/* Increment/Decrement Bookmark Logic */}
                        <FontAwesomeIcon style={{ marginRight: '10px' }} icon={isBookmarked? faBookmark: faBookmarkOutline} onClick={() => { ToggleBookmarks() }} />
                        <p style={{ fontSize: "10px", margin: 0 }}>{newBookmarks}</p>
                    </div>
                </div>
                {/* Comments for the Blog */}
                <div>
                    <h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>Comments</h3>
                        <Comments comments={blog["comments"]}/>

                    <div style={{display:"flex", flexDirection:"row"}}>
                        <input
                            value={Comment}
                            onChange={(e) => setComment(e.target.value)}
                            style={{
                                padding: "8px",
                                border: "1px solid #ddd",
                                borderRadius: "5px",
                                width: "90%",
                                marginTop: "10px",
                                boxSizing: "border-box",
                            }}
                            placeholder="Add a comment"
                        />
                        <FontAwesomeIcon icon={faPaperPlane} style={{ padding: "8px", marginTop: "10px", }} onClick={user===null?()=>{alert("Login to Comment!")}:AddComment}/>

                    </div>
                    
                </div>


            </div>
            
        </div>);
    }

    //Basic Top view of the Blog Card
    return (
        <div
            
            style={{
                border: "1px solid #ddd", 
                borderRadius: "8px",    
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
                overflow: "hidden",      
                width: "500px",
                height: "500px",     
                margin: "10px",          
                display: "flex",         
                flexDirection: "column", 
                backgroundColor: "#fff", 
                textAlign: "left"
            }}
        >
            <img
                src={"http://127.0.0.1:8000" + blog["Image"]}
                alt={blog["Title"]}
                style={{
                    width: "100%",
                    height: "350px",
                    objectFit: "cover", 
                }}
            />
            <div style={{ padding: "15px" }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "38px" ,textOverflow:"ellipsis"}}>{blog["Title"]}</h3>
               
            </div>
        </div>
    );
}

export default BlogCard;
