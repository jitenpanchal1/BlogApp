import React, { useEffect, useState } from 'react'
import { PostCard, Container } from '../Index'
import services from '../../auth/config'
import "../../App.css"

function Allpost() {

    const [posts, setPosts] = useState([])
    const [loader, setloader] = useState(true)

    useEffect(() => {
        services.getposts([]).then((item) => {
            if (item) {
                setPosts(item.documents)
                setloader("")
            }
        })
    }, [])

    return loader ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border text-primary" role="status">
                <div className="loader"></div>
            </div>
        </div>
    ) : (
        <Container>
            <div className='home-color px-5 pt-3 '>
                {posts.map((item) =>
                (
                    <div key={item.$id} >
                        <PostCard  {...item} fileId={item.featuredImg} name={item.name} id={item.$id} className="all-post-card" />
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default Allpost
