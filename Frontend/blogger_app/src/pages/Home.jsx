import Header from '../components/Header';
import BlogCard from '../components/BlogCard';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddBlog from '../components/AddBlog';
import BlogPopUp from '../components/BlogPopUp';

//Home Screen, which handles the core interactions of the website

function Home(){

    //Blog Selected for Expanded View
    const [SelectedBlog, isSelectedBlog] = useState(null);

    //If User Creates New Blog
    const [NewBlog, SetNewBlog] = useState(false);

    //All Blogs fetched from Django server
    const [blogs, setBlogs] = useState([]);

    //Blogs filtered by Search Query
    const [FilteredBlogs,setFilteredBlogs]=useState([]);

    const [loading, setLoading] = useState(true);

    //Persistence and Navigation
    const user = localStorage.getItem("Name");

    //Error Handling
    const [Error,setError] = useState(false);

    
    const CloseAddNewBlog = () => {
        SetNewBlog(false);
    }
    const AddNewBlog = () => {
        SetNewBlog(true);
    }
    const OpenBlog = (index) => {
        isSelectedBlog(index);
    }
    const CloseBlog = () => {
        isSelectedBlog(null);
    }
    const FilterTags = (queryTags)=>{
        //Filter Queries
        const queryTagsSet = new Set(queryTags.map(tag => tag.toLowerCase()));
        const filtered = blogs.filter(blog =>
            blog.Tags.some(tag => queryTagsSet.has(tag.Tag_Name.toLowerCase()))
        );
        
        setFilteredBlogs(filtered);
        
    }
    const refreshFilters = () =>{
        //Remove Filter to Display All blogs
        setFilteredBlogs(blogs);
    }

    //Fetch All Blogs
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/Server/blogs/')
            .then(response => {
                setBlogs(response.data);
                setFilteredBlogs(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching blogs:', error);
                setLoading(false);
                setError(true)
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (Error) {
        return <div style={{fontSize:"100px",color:"red"}}>
            Error Occured. Kindly Reload
        </div>
    }
    return (
        <div className='App'>
            <Header FilterTags={FilterTags} refreshTags={refreshFilters} />
            {FilteredBlogs.length>0?
            <div style={{ display: "flex", flexWrap: "wrap" ,paddingTop:"100px"}}>
                {FilteredBlogs.map((blog, index) => (

                    <div key={index} onClick={() => OpenBlog(index)} >
                        <BlogCard
                            key={index}
                            blog={blog}
                            selected={false}
                        />
                    </div>
                ))}

            </div>
            :
            <div style={{color:"black",fontSize:"50px",paddingTop:"100px"}}>
            No Blogs!!!
            </div>

            }
            {SelectedBlog !== null &&
                <BlogPopUp blog={FilteredBlogs[SelectedBlog]} CloseBlog={CloseBlog} />

            }
            {
                NewBlog &&
                <AddBlog CloseBlog={CloseAddNewBlog} Title={""} Tags={[]} Description={""} Update={false} Image={null} Id={"-1"} />
            }
            <button onClick={user===null?()=>{alert("You need to Log in")}:AddNewBlog} style={{
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                zIndex: '500'
            }}>
                Create new Blog
            </button>

        </div>
    );
}

export default Home;