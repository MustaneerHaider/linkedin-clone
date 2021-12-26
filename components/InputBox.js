import { useSession } from 'next-auth/react';
import Image from 'next/image';
import InputOption from './InputOption';
import {
	PhotographIcon,
	VideoCameraIcon,
	CalendarIcon,
	ClipboardIcon
} from '@heroicons/react/solid';
import { useRef, useState } from 'react';
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	updateDoc
} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

function InputBox() {
	const { data: session } = useSession();
	const filePickerRef = useRef(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [input, setInput] = useState('');

	const addImageToPost = e => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}
		reader.onload = readerEvent => {
			setSelectedFile(readerEvent.target.result);
		};
	};

	const sendPost = async e => {
		e.preventDefault();

		if (loading || !input) return;
		setLoading(true);

		const docRef = await addDoc(collection(db, 'posts'), {
			text: input,
			username: session.user.name,
			userImg: session.user.image,
			timestamp: serverTimestamp()
		});

		console.log('doc added with ID', docRef.id);

		if (selectedFile) {
			const imageRef = ref(storage, `posts/${docRef.id}/image`);

			await uploadString(imageRef, selectedFile, 'data_url').then(
				async () => {
					const downloadURL = await getDownloadURL(imageRef);
					await updateDoc(doc(db, 'posts', docRef.id), {
						image: downloadURL
					});
				}
			);
		}

		setLoading(false);
		setInput('');
		setSelectedFile(null);
	};

	return (
		<div className='bg-white p-3 border rounded-lg'>
			<div className={`flex items-center ${loading && 'opacity-75'}`}>
				<Image
					src={session.user.image}
					width={50}
					height={50}
					className='rounded-full cursor-pointer'
				/>
				<form className='flex-grow flex'>
					<input
						value={input}
						onChange={e => setInput(e.target.value)}
						type='text'
						placeholder='Start a post'
						className='flex-grow
        bg-transparent outline-none ml-2 placeholder-gray-500 px-4 py-3 rounded-full border 
        border-gray-400'
					/>
					<button onClick={sendPost} type='submit' hidden>
						Send
					</button>
				</form>
				{selectedFile && (
					<div
						onClick={() => setSelectedFile(null)}
						className='filter hover:brightness-75 cursor-pointer transition transform
            hover:scale-105 ml-1.5'
					>
						<img
							src={selectedFile}
							className='object-contain h-12'
						/>
						<p className='text-xs text-red-500 text-center'>
							Remove
						</p>
					</div>
				)}
			</div>

			<div className='flex items-center justify-between mt-2'>
				<InputOption
					text='Photo'
					color='text-blue-500'
					Icon={PhotographIcon}
					onClick={() => filePickerRef.current.click()}
				/>
				<input
					type='file'
					hidden
					ref={filePickerRef}
					onChange={addImageToPost}
				/>
				<InputOption
					text='Video'
					color='text-green-500'
					Icon={VideoCameraIcon}
				/>
				<InputOption
					text='Event'
					color='text-orange-400'
					Icon={CalendarIcon}
				/>
				<InputOption
					text='Write Article'
					color='text-pink-400'
					Icon={ClipboardIcon}
				/>
			</div>
		</div>
	);
}

export default InputBox;
