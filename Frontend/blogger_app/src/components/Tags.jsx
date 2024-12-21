


//Handling Tag Display Logic
function TagsCard({tags, onclick, readonly}){
    return (
        <>
        {
            tags.map((tag, index) => (
                <div
                    onClick={() => onclick(index)}
                    key={index}
                    style={{
                        backgroundColor: '#ddd',
                        color: '#555',
                        padding: '5px 10px',
                        borderRadius: '15px',
                        marginRight: '8px',
                        marginBottom: '8px',
                        display: readonly===true?'inline-block':'flex',
                        alignItems: 'center',
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <span>{readonly===true?tag.Tag_Name:tag}</span>
                </div>
            ))
        }
        </>

    );

}

export default TagsCard;