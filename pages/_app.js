import '../styles/globals.css';
import { SessionProvider as Provider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<Provider session={session}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
