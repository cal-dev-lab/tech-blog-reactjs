import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import { Container } from "../containers/Container"

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
    return builder.image(source);
}

export default function OnePost() {
    const [postData, setPostData] = useState(null);
    const [categories, setCategory] = useState([])
    const { slug } = useParams();

    useEffect(() => {
        sanityClient
        .fetch(
            `*[slug.current == $slug]{
                title,
                slug,
                publishedAt,
                mainImage{
                    asset->{
                    _id,
                    url
                    }
                },
                body,
                "name": author->name,
                "authorImage": author->image
            }`,
            { slug }
        )
        .then((data) => setPostData(data[0]))
        .catch(console.error);
    }, [slug]);

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "category"] {
                title,
            }`
        )
        .then((data) => setCategory(data))
        .catch(console.error)
    }, [])

    if (!postData) return <div>Loading...</div>;

    return (
        <Container>
            <div>
                <Link to={'/'}>
                    <p className="text-gray-100 my-5">&larr; Back</p>
                </Link>
                <h2 className="font-publicb text-7xl lg:text-9xl text-gray-100 mb-5">
                    {postData.title}
                </h2>
                {categories.map((category) => (
                    <p className="font-public mb-5 tracking-widest p-2 bg-white md:w-1/4 rounded-md text-center" key={category.title}>
                        category &gt; <span className="font-publicb bg-white">{category.title}</span>
                    </p>
                ))}
                <div className="block gap-x-10">
                    <img className="mx-auto w-screen object-cover md:h-[30rem] rounded-md" src={urlFor(postData.mainImage).url()} alt={postData.title} />
                    <div className="font-public text-gray-500 tracking-wide">
                        <div>
                            <div className="flex mx-auto align-middle items-center my-5">
                                <img
                                    className="bg-indigo-100 rounded-full mr-4"
                                    src={urlFor(postData.authorImage).width(50).url()}
                                    alt={"Article published by: " + postData.name}
                                />
                                <div className="block">
                                    <p>Published by:</p>
                                    <h4 className="text-gray-100 font-publicb">
                                        {postData.name}
                                    </h4>
                                    <p className="text-gray-100">{postData.publishedAt}</p>
                                </div>
                            </div>
                        </div>
                        <BlockContent
                            blocks={postData.body}
                            projectId={sanityClient.clientConfig.projectId}
                            dataset={sanityClient.clientConfig.dataset}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
}
