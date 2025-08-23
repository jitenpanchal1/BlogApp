import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import services from '../../auth/config'
import PostCard from '../PostCard'
import { Container } from '../Index'
import "../../App.css"


function Mypost() {
    const user = useSelector((state) => state.auth.userData)
    const [posts, setposts] = useState([])
    const [msg, setmsg] = useState("")

    useEffect(() => {
        async function fetch() {
            if (!user?.$id) {
                setmsg("User Not Found")
                return
            }
            try {
                const response = await services.getuserpost(user.$id)
                if (response.documents.length === 0) {
                    setmsg("you didnt post any thing")
                } else {
                    setposts(response.documents)
                }
            } catch (error) {
                setmsg("Data not found")
                console.error("Error fetching posts:", error)
            }
        }
        fetch()
    }, [user])

    return (
        <Container>
            <div className='home-color ' >
                {posts.length > 0 ? (
                    <div className='row pt-3'>
                        {posts.map((post) => (
                            <div key={post.$id} className="mx-auto col-sm-6 col-md-4 col-lg-4 ">
                                <PostCard {...post} fileId={post.featuredImg} id={post.$id} className="post-card" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className=" text-center fs-5">{msg}</div>
                )}
            </div>
        </Container>
    )
}

export default Mypost