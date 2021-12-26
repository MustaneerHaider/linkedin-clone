import Image from 'next/image';
import { SearchIcon } from '@heroicons/react/outline';
import {
	HomeIcon,
	UsersIcon,
	BriefcaseIcon,
	ChatAltIcon,
	BellIcon
} from '@heroicons/react/solid';
import HeaderOption from './HeaderOption';
import { signOut, useSession } from 'next-auth/react';

function Header() {
	const { data: session } = useSession();
	return (
		<header
			className='bg-white sticky top-0 z-50 shadow-sm p-2 border-b flex
    items-center justify-evenly'
		>
			{/* Left */}
			<div className='flex items-center'>
				<Image
					src='https://cdn-icons-png.flaticon.com/512/174/174857.png'
					width={40}
					height={40}
					className='cursor-pointer'
				/>
				<div className='flex items-center ml-2 px-3 py-2 rounded-lg bg-gray-100'>
					<SearchIcon className='h-5 text-gray-600' />
					<input
						type='text'
						placeholder='Search'
						className='hidden md:inline-flex outline-none ml-2 text-gray-500 
            placeholder-gray-400 bg-transparent'
					/>
				</div>
			</div>

			{/* Right */}
			<div className='flex items-center space-x-2 sm:space-x-6'>
				<div className='flex items-center space-x-6 md:space-x-10'>
					<HeaderOption active title='Home' Icon={HomeIcon} />
					<HeaderOption title='My Network' Icon={UsersIcon} />
					<HeaderOption title='Jobs' Icon={BriefcaseIcon} />
					<HeaderOption title='Messaging' Icon={ChatAltIcon} />
					<HeaderOption title='Notifications' Icon={BellIcon} />
				</div>

				<div className='flex flex-col items-center'>
					<Image
						src={session.user.image}
						width={30}
						height={30}
						layout='fixed'
						className='rounded-full cursor-pointer'
						onClick={signOut}
					/>
					<p className='hidden md:inline-flex text-gray-600 text-sm mt-1'>
						Me
					</p>
				</div>
			</div>
		</header>
	);
}

export default Header;
