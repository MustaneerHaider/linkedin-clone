import Head from 'next/head';
import Header from '../components/Header';
import { getSession, useSession } from 'next-auth/react';
import Login from '../components/Login';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Widgets from '../components/Widgets';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

export default function Home({ posts }) {
	const { data: session } = useSession();
	if (!session) return <Login />;

	return (
		<div className='h-screen bg-gray-100 overflow-y-scroll pb-10'>
			<Head>
				<title>LinkedIn Clone</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Header />

			<main className='flex flex-col md:flex-row mt-8 max-w-7xl mx-auto'>
				<Sidebar />
				<Feed posts={posts} />
				<Widgets />
			</main>
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);
	let docs = null;
	if (session) {
		const snapshot = await getDocs(
			query(collection(db, 'posts'), orderBy('timestamp', 'desc'))
		);

		docs = snapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
			timestamp: null
		}));
	}

	return {
		props: {
			session,
			posts: docs
		}
	};
}
