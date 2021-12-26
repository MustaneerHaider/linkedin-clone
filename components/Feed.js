import InputBox from './InputBox';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import Post from './Post';

function Feed({ posts }) {
	const [snapshot] = useCollection(
		query(collection(db, 'posts'), orderBy('timestamp', 'desc'))
	);

	return (
		<div className='flex-[0.8] lg:flex-[0.6] mt-4 md:mt-0 md:ml-4'>
			<InputBox />

			<section className='mt-4 space-y-3'>
				{snapshot
					? snapshot?.docs.map(doc => (
							<Post
								key={doc.id}
								id={doc.id}
								username={doc.data().username}
								userImg={doc.data().userImg}
								date={doc.data().timestamp}
								image={doc.data().image}
								text={doc.data().text}
							/>
					  ))
					: posts.map(post => (
							<Post
								key={post.id}
								id={post.id}
								username={post.username}
								userImg={post.userImg}
								text={post.text}
								date={post.timestamp}
								image={post.image}
							/>
					  ))}
			</section>
		</div>
	);
}

export default Feed;
