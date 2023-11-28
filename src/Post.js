import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    // Generate a random number to fetch a random photo from Lorem Picsum
    const randomPhotoId = Math.floor(Math.random() * 1000) + 1;

    // Construct the URL for the random photo
    const randomPhotoUrl = `https://picsum.photos/150/100?image=${randomPhotoId}`;

    return (
        <article className="post">
            <Link to={`/post/${post.id}`}>
                <div className="relative rounded-full overflow-hidden w-10 h-10 mr-4">
                    <img className="object-cover w-full h-full rounded-full" src={randomPhotoUrl} alt="Random" />
                </div>
                <div>
                    <h2>{post.title}</h2>
                    <p className="postDate">{post.datetime}</p>
                </div>
            </Link>
            <p className="postBody">
                {post.body.length <= 25 ? post.body : `${post.body.slice(0, 80)}...`}
            </p>
        </article>
    );
};

export default Post;
