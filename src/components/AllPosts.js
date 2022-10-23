import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import { Container } from "../containers/Container"

export default function AllPosts() {
    const [allPostsData, setAllPosts] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "post"]{
                    title,
                    slug,
                    mainImage{
                        asset->{
                            _id,
                            url
                        }
                    }
                }`
            )
            .then((data) => setAllPosts(data))
            .catch(console.error);
        }, []);

    return (
        <Container>
            <h2 className="text-gray-100 font-publicb text-9xl mb-5">Blog Posts</h2>
            <div className="grid grid-cols-4 mx-auto gap-x-5">
            {allPostsData &&
                allPostsData.map((post, index) => (
                    <Link to={"/" + post.slug.current + "/"} key={post.slug.current}>
                        <div key={index}>
                            <img 
                                className="h-48 w-full object-cover rounded-md"
                                src={post.mainImage.asset.url} 
                                alt={post.title} 
                            />
                            <div className="flex rounded-b-md bg-gray-100 p-4 h-20 my-auto items-center">
                                <h2 className="text-xl font-publicb tracking-wide bg-gray-100">
                                    {post.title}
                                </h2>
                            </div>
                        </div>
                    </Link>
                )
            )}
            </div>
        </Container>
    );
}