import React from 'react';
import BlogCard from './BlogCard';

//Handles when User Clicks on a Blog To see More Details about it, and interact with it
//Liking it, bookmarking it, or leaving a comment
function BlogPopUp({blog,CloseBlog}){
    
    return (
        <div
            onClick={CloseBlog}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                color: "white",
                zIndex: 1000,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",

            }}>
            <div onClick={(e) => e.stopPropagation()}>
                <BlogCard

                    blog={blog}
                    selected={true}
                />
               
                   
            </div>
            <div onClick={CloseBlog}>
                x
            </div>
        </div>
    );

}

export default BlogPopUp