
import React, { useState } from 'react';
import axios from 'axios';
import TagsCard from './Tags';

//Add a Blog if new, or Update an existing Blogs
//Input Props: The Different Fields are set to Null/''/0 for a New Blog 
//and in the case of update, they are set to previous values
function AddBlog({CloseBlog,Title,Description,Tags,Update,Image,Id}){
    const List = Tags.map(tag=>tag.Tag_Name);
    const user = localStorage.getItem("Name");
    const [title, setTitle] = useState(Title);
    const [description, setDescription] = useState(Description);
    const [tags, setTags] = useState(List);
    const [tagInput, setTagInput] = useState('');
    const [image, setImage] = useState(null);
    const [Error,setError] = useState(false);
    //POST request to Django server for Adding/Updating the Blog
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { "Title": title, "Description": description, "Author": user, "Image": Update?Image:image ,"Tags":tags,"id":Id};
        axios.post('http://127.0.0.1:8000/Server/blogs_post/', data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response);
            window.location.reload(); 

        }).catch(error=>{
            console.log(error);
            setError(true);
        });
        
    }
    //Tags display logic handle
    const EnterTags = (e) => {
        if (e.key === 'Enter' && tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
            e.preventDefault();
            setTags((prevTags) => [...prevTags, tagInput.trim()]);
            setTagInput(''); 
        }
        
    };
    const DeleteTags = (index) =>{
        setTags((tag)=>tag.filter((val,ind)=>ind!==index));
    }
    if(Error){
        return <div style={{color:"red"}}>
            Error Occured
        </div>
    }
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
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    height: "500px",
                    width: "500px",
                    backgroundColor: "white",
                    color: "black",
                    textAlign: "left",
                    padding: "30px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    position: "relative",
                    margin: "0 auto"
                }}
            >
                <form onSubmit={handleSubmit}>
                {/* Title of the Blog */}
                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ fontSize: "16px", fontWeight: "bold", color: "#555", marginBottom: "8px", display: "block" }}>
                            Title:
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ddd",
                                borderRadius: "5px",
                                fontSize: "16px",
                                marginTop: "8px",
                                outline: "none"
                            }}
                        />
                    </div>
                    {/* Description of the Blog */}
                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ fontSize: "16px", fontWeight: "bold", color: "#555", marginBottom: "8px", display: "block" }}>
                            Description:
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ddd",
                                borderRadius: "5px",
                                fontSize: "16px",
                                marginTop: "8px",
                                outline: "none",
                                resize: "vertical",
                                height: "150px"
                            }}
                        />
                    </div>
                    {/* Tags List and Tag Input Handling */}
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            fontSize: '16px',
                            marginTop: '8px',
                            outline: 'none',
                            backgroundColor: '#fff',
                            position: 'relative',
                        }}
                    >
                      
                        <TagsCard tags={tags} onclick={DeleteTags} readonly={false}/>
                        <input
                            type="text"
                            value={tagInput} 
                            onChange={(e)=> setTagInput(e.target.value)} 
                            onKeyDown={EnterTags} 
                            placeholder="Enter a tag"
                            style={{
                                border: 'none',
                                outline: 'none',
                                flexGrow: 1,
                                fontSize: '16px',
                                padding: '0px',
                                margin: '0px',
                                color: '#555',
                                height: '30px',
                            }}
                        />
                    </div>

                    {/* Image Update is not allowed */}
                    {Update!==true ?
                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ fontSize: "16px", fontWeight: "bold", color: "#555", marginBottom: "8px", display: "block" }}>
                            Image:
                        </label>
                        <input
                            type="file"
                            onChange={(e)=>setImage(e.target.files[0])}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ddd",
                                borderRadius: "5px",
                                fontSize: "16px",
                                marginTop: "8px",
                                outline: "none"
                            }}
                        />
                    </div>:<div>
                    </div>
                    }
              {/* Submit Button, which Triggers the POST event */}
                    <div style={{ marginBottom: "20px" }}>
                        <button
                            type="submit"
                            style={{
                                padding: "12px 20px",
                                backgroundColor: "#4CAF50",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                fontSize: "16px",
                                cursor: "pointer",
                                width: "100%",
                                transition: "background-color 0.3s ease"
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = "#45a049"}
                            onMouseOut={(e) => e.target.style.backgroundColor = "#4CAF50"}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>

        <div onClick={CloseBlog}>
                x
            </div>
        

    </div>
    );
}

export default AddBlog;