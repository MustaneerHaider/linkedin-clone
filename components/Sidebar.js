import { useSession } from 'next-auth/react';
import Image from 'next/image';

function Sidebar() {
	const { data: session } = useSession();

	const recentItem = item => (
		<div
			className='flex items-center p-2 rounded-lg hover:bg-gray-100 
    cursor-pointer text-gray-600 text-sm'
		>
			<span>#</span>
			<p className='ml-3'>{item}</p>
		</div>
	);

	return (
		<div className='flex-[0.2] flex flex-col'>
			<div
				className='flex flex-col items-center border-l border-t border-r rounded-t-lg
      bg-white border-b pb-2'
			>
				<img
					src='/cover.jpg'
					className='w-full object-cover h-20 -mb-5 rounded-t-lg'
				/>
				<div className='rounded-full border-2 border-white'>
					<Image
						src={session.user.image}
						width={60}
						height={60}
						layout='fixed'
						className='rounded-full cursor-pointer'
					/>
				</div>
				<h2 className='font-semibold text-sm sm:text-base mt-2'>
					{session.user.name}
				</h2>
				<h4 className='text-gray-500 text-xs mt-1'>
					{session.user.email}
				</h4>
			</div>

			<div className='bg-white border-l border-r px-3 py-2 border-b'>
				<div className='flex items-center justify-between'>
					<p className='text-xs'>Who viewed you profile</p>
					<p className='text-blue-500 text-xs'>2,443</p>
				</div>
				<div className='flex items-center justify-between mt-2'>
					<p className='text-xs'>Views on posts</p>
					<p className='text-blue-500 text-xs'>2,456</p>
				</div>
			</div>

			<div className='hidden md:inline bg-white px-3 py-2 border rounded-t-lg mt-3'>
				<h2 className='font-semibold text-gray-700'>Recent</h2>
				{recentItem('react')}
				{recentItem('programming')}
				{recentItem('softwareengineer')}
				{recentItem('fullstack')}
				{recentItem('developer')}
			</div>
		</div>
	);
}

export default Sidebar;
