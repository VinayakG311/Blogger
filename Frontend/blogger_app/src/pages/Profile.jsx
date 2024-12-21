
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import BlogPopUp from '../components/BlogPopUp';
import AddBlog from '../components/AddBlog';


//Profile Screen of the User, used for Viewing,Update and Deletion of Blogs posted by them
function Profile(){
    const user = localStorage.getItem("Name");
    const [SelectedBlog, isSelectedBlog] = useState(null);
    const [NewBlog, SetNewBlog] = useState(null);
    
    const [blogs,setBlogs] = useState([]);
    const [Error,setError] = useState(false);
    const nav = useNavigate();
    const CloseAddNewBlog = () => {
        SetNewBlog(null);
    }
    const AddNewBlog = (e) => {
        SetNewBlog(e);
    }
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/Server/blogs_user/${user}/get/`)
            .then(response => {
                setBlogs(response.data);
               
            })
            .catch(error => {
                console.error('Error fetching blogs:', error);
                
            });
    }, [user]);
    const OpenBlog = (index) => {
        isSelectedBlog(index);
    }
    const CloseBlog = () => {
        isSelectedBlog(null);
    }
    const handleDelete = (e)=>{
        axios.delete(`http://127.0.0.1:8000/Server/blogs_delete/${e}/delete/`).then(response=>{
            console.log(response);
            window.location.reload(); 
        }).catch(err=>{
            console.log(err);
            setError(true);
        });
       
    }
    if(Error){
        return <div style={{color:"red"}}>
            Error Occured. Try again
        </div>
    }
    
    return (
        <div style={{padding:"50px"}}>
            <div onClick={()=>{nav("/");}} style={{ textAlign: 'left', color: 'black', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>
                <h1>Blogger</h1>
            </div>
            
            <div style={{ marginBottom: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                  
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <FontAwesomeIcon
                        icon={faUser}
                        style={{
                            fontSize: "100px",
                            cursor: "pointer",
                        }}
                    />
                    <h2 style={{
                        marginLeft: "25px",
                        fontSize: "50px",
                        cursor: "pointer",
                    }}>{user}</h2>


                </div>
                    
                
            </div>
            {blogs.length > 0?
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {blogs.map((blog, index) => (

                    <div key={index} style={{ position: 'relative' }}>
                        
                        <button
                            onClick={() => handleDelete(blog["id"])}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                backgroundColor: 'red',
                                color: 'white',
                                border: 'none',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Delete
                        </button>

                        
                        <button
                            onClick={() => AddNewBlog(index)}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '90px',
                                backgroundColor: 'blue',
                                color: 'white',
                                border: 'none',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Update
                        </button>

                        <div onClick={()=>OpenBlog(index)}>
                        <BlogCard
                            key={index}
                            blog={blog}
                            selected={false}

                        />
                        </div>
                        {SelectedBlog !== null &&
                            <BlogPopUp blog={blogs[SelectedBlog]} CloseBlog={CloseBlog} />

                        }
                        {
                            NewBlog!==null &&
                            <AddBlog CloseBlog={CloseAddNewBlog} Title={blogs[NewBlog]["Title"]} Description={blogs[NewBlog]["Description"]} Tags={blogs[NewBlog]["Tags"]} Update={true} Image={blogs[NewBlog]["Image"]} Id={blogs[NewBlog]["id"]}  />
                        }
                    </div>

                ))}

            </div>
            : <div>
                No Blogs Yet! Make New
            </div>
            }
        </div>
    );
}

export default Profile;