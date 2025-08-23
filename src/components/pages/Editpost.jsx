import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import services from '../../auth/config'
import { Container, Postform } from '../Index'

function Editpost() {

    const [post, setpost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            services.Getpost(slug).then((item) => {
                if (item) {
                    setpost(item)
                } else {
                    console.log("failed to Edit at EditPost")
                    navigate("/")
                }
            })
        }
    }, [slug, navigate])

    return post ? (
        <div>
            <Container>
                <Postform post={post} />
            </Container>
        </div>
    ) : null
}

export default Editpost
