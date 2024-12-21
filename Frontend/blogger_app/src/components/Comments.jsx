

//Component for All Comments Under a Blog Post
function Comments({comments}){
    return (
        <div
            style={{
                overflowY: "auto",
                maxHeight: "100px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                padding: "10px",
                backgroundColor: "#f9f9f9",
                marginBottom: "10px",
            }}
        >
            {comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                    <div
                        key={index}
                        style={{
                            padding: "8px",
                            borderRadius: "5px",
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <p
                            style={{
                                marginRight: "5px",
                                fontWeight: "bold",
                                color: "#333",
                                fontSize: "14px",
                            }}
                        >
                            {comment.Author}
                        </p>
                        <p
                            style={{

                                color: "#666",
                                fontSize: "13px",
                            }}
                        >
                            {comment.Description}
                        </p>
                    </div>
                ))
            ) : (
                <p style={{ color: "#999", fontStyle: "italic" }}>No comments available</p>
            )}
        </div>
    );


}
export default Comments;