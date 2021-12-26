import Image from 'next/image';
import {
	DotsHorizontalIcon,
	ThumbUpIcon,
	ShareIcon,
	ChatIcon
} from '@heroicons/react/outline';
import {
	PaperAirplaneIcon,
	ThumbUpIcon as LikedIcon
} from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { setDoc, deleteDoc, doc, query, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';

function Post({ id, userImg, image, username, date, text }) {
	const [hasLiked, setHasLiked] = useState(false);
	const { data: session } = useSession();
	const [snapshot] = useCollection(
		query(collection(db, 'posts', id, 'likes'))
	);

	useEffect(() => {
		setHasLiked(
			snapshot?.docs.findIndex(like => like.id === session.user.email) !==
				-1
		);
	}, [snapshot]);

	const likePost = async () => {
		if (!hasLiked) {
			await setDoc(doc(db, 'posts', id, 'likes', session.user.email), {
				username: session.user.name
			});
		} else {
			await deleteDoc(doc(db, 'posts', id, 'likes', session.user.email));
		}
	};

	return (
		<article className='bg-white rounded-lg border'>
			<div className='flex items-center p-3'>
				<Image
					src={userImg}
					width={40}
					height={40}
					layout='fixed'
					className='cursor-pointer rounded-full'
				/>
				<div className='flex-grow ml-2'>
					<p className='font-semibold text-sm'>{username}</p>
					{date ? (
						<p className='text-xs text-gray-600'>
							{date?.toDate().toLocaleDateString()}
						</p>
					) : (
						<p>Loading...</p>
					)}
				</div>
				<div
					className='h-8 w-8 hover:bg-gray-100 rounded-full cursor-pointer
        flex items-center justify-center'
				>
					<DotsHorizontalIcon className='h-6 text-gray-500' />
				</div>
			</div>

			<p className='text-sm pl-3 pb-3'>{text}</p>

			{image && (
				<img
					loading='lazy'
					src={image}
					className='w-full object-cover'
				/>
			)}

			{snapshot?.docs.length > 0 && (
				<div
					className='text-xs text-gray-600 p-3 border-b
      flex items-center space-x-1'
				>
					<div
						className='h-4 w-4 flex items-center justify-center bg-blue-200
        rounded-full cursor-pointer'
					>
						<LikedIcon className='h-3 text-blue-500' />
					</div>
					<p>{snapshot?.docs.length}</p>
				</div>
			)}

			<div className='flex items-center mt-2 px-3 pb-2'>
				<div className='inputIcon' onClick={likePost}>
					{hasLiked ? (
						<LikedIcon className='h-5 text-blue-500' />
					) : (
						<ThumbUpIcon className='h-5' />
					)}
					<p
						className={`text-xs sm:text-sm xl:text-base ${
							hasLiked && 'text-blue-500 font-semibold'
						}`}
					>
						Like
					</p>
				</div>
				<div className='inputIcon'>
					<ChatIcon className='h-5' />
					<p className='text-xs sm:text-sm xl:text-base'>Comment</p>
				</div>
				<div className='inputIcon'>
					<ShareIcon className='h-5' />
					<p className='text-xs sm:text-sm xl:text-base'>Share</p>
				</div>
				<div className='inputIcon'>
					<PaperAirplaneIcon className='h-5 rotate-45' />
					<p className='text-xs sm:text-sm xl:text-base'>Send</p>
				</div>
			</div>
		</article>
	);
}

export default Post;
