function HeaderOption({ title, Icon, active }) {
	return (
		<div className='flex flex-col items-center cursor-pointer group'>
			<Icon
				className={`h-6 sm:h-7 text-gray-600 group-hover:text-black ${
					active && 'text-black'
				}`}
			/>
			<p
				className={`hidden md:inline  text-sm mt-1 text-gray-600 
      group-hover:text-black ${active && 'text-black'}`}
			>
				{title}
			</p>
		</div>
	);
}

export default HeaderOption;
