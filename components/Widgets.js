import { LightBulbIcon } from '@heroicons/react/solid';
import WidgetRow from './WidgetRow';

function Widgets() {
	return (
		<div
			className='hidden lg:inline bg-white p-3 rounded-lg ml-4 flex-[0.2]
    max-h-80'
		>
			<div className='flex items-center justify-between'>
				<h2 className='font-semibold text-gray-600'>
					Add to your Feed
				</h2>
				<div
					className='h-5 w-5 bg-gray-600 flex items-center justify-center 
        cursor-pointer'
				>
					<LightBulbIcon className='h-4 text-white' />
				</div>
			</div>

			<div className='space-y-2 mt-3'>
				<WidgetRow text='LinkedIn' />
				<WidgetRow text='Video' />
				<WidgetRow text='ReactJS' />
				<WidgetRow text='JavaScript' />
			</div>
		</div>
	);
}

export default Widgets;
