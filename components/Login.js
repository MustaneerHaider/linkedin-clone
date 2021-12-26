import { signIn } from 'next-auth/react';
import Image from 'next/image';

function Login() {
	return (
		<div className='min-h-screen flex flex-col items-center justify-center'>
			<Image
				src='https://cdn-icons-png.flaticon.com/512/174/174857.png'
				width={150}
				height={150}
				objectFit='contain'
			/>
			<h1
				className='w-36 py-3 rounded-full bg-blue-500 text-white cursor-pointer
         mt-6 text-center'
				onClick={signIn}
			>
				Login
			</h1>
		</div>
	);
}

export default Login;
