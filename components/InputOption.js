function InputOption({ text, Icon, color, ...props }) {
	return (
		<div
			{...props}
			className='px-2 py-3 hover:bg-gray-100 rounded-lg flex items-center
    cursor-pointer'
		>
			<Icon className={`h-6 sm:h-7 ${color}`} />
			<p className='ml-2 text-gray-600 text-xs sm:text-base whitespace-nowrap'>
				{text}
			</p>
		</div>
	);
}

export default InputOption;
