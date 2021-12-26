import { HashtagIcon } from '@heroicons/react/outline';

function WidgetRow({ text }) {
	return (
		<div className='flex items-center'>
			<div
				className='border-blue-300 border-4 rounded-full h-14 w-14 flex items-center
    justify-center cursor-pointer bg-gray-100'
			>
				<HashtagIcon className='h-8 text-gray-600 ' />
			</div>

			<div className='ml-2 flex flex-col'>
				<div className='flex items-center'>
					<span className='text-gray-600 font-bold mr-1'>#</span>
					<h4 className='text-gray-600 font-semibold'>{text}</h4>
				</div>

				<button
					className='px-3 py-1 rounded-full border border-gray-600 text-center
        hover:bg-gray-100 hover:border-2 transition-all duration-150 ease-in'
				>
					Follow
				</button>
			</div>
		</div>
	);
}

export default WidgetRow;
