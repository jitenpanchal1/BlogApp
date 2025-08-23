import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import services from '../auth/config'
import "../App.css"

function PostCard({ id, title, fileId, className, name }) {

    const [imgUrl, setimgUrl] = useState("")

    useEffect(() => {
        async function getimg() {
            try {
                const get = await services.getfilepreview(fileId)
                if (get) {
                    setimgUrl(get)
                } else {
                    console.log("file not found")
                }
            } catch (error) {
                console.log("not found img", error)
            }
        }
        if (fileId) {
            getimg()
        }
    }, [fileId])
    return (
        <div>
            <Link to={`/post/${id}`}>
                <div className='text-center py-2'>
                    <div>
                        {imgUrl && <img src={imgUrl} alt={title} className={className} />}
                    </div>
                    <div>
                        <h3> post by : {name}</h3>
                    </div>
                    <div className='fs-3'>
                        {title}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default PostCard
