/**
 * Drop this into app/page.tsx of a Next.js 16 project.
 * Set NEXT_PUBLIC_ROXY_PUBLISHABLE_KEY in your .env.local to a publishable key (pk_live_...) with this site origin allowed; a secret key never goes in a browser bundle.
 */
'use client';

import { createRoxy } from '@roxyapi/sdk';
import {
	RoxyHoroscopeCard,
	RoxyLocationSearch,
	RoxyVedicKundli,
} from '@roxyapi/ui-react';
import { useState } from 'react';

const roxy = createRoxy(process.env.NEXT_PUBLIC_ROXY_PUBLISHABLE_KEY!);

export default function Page() {
	const [horoscope, setHoroscope] = useState<unknown>(null);
	const [kundli, setKundli] = useState<unknown>(null);

	const onLocation = async (
		e: CustomEvent<{ latitude: number; longitude: number; timezone: string }>,
	) => {
		const { data } = await roxy.vedicAstrology.generateBirthChart({
			body: { date: '1990-01-15', time: '14:30:00', ...e.detail },
		});
		setKundli(data);
	};

	const loadDaily = async () => {
		const { data } = await roxy.astrology.getDailyHoroscope({
			path: { sign: 'aries' },
		});
		setHoroscope(data);
	};

	return (
		<main style={{ maxWidth: 720, margin: '0 auto', padding: 32 }}>
			<h1>Roxy UI in React</h1>
			<button onClick={loadDaily} type="button">
				Load daily Aries
			</button>
			{horoscope && <RoxyHoroscopeCard data={horoscope} period="daily" />}

			<h2>Pick a birth city</h2>
			<RoxyLocationSearch
				placeholder="London"
				onroxy-location-select={onLocation}
			/>
			{kundli && <RoxyVedicKundli data={kundli} />}
		</main>
	);
}
