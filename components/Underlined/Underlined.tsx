'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function UnderlinedText({ children, color = '#5024FF' }: { children: React.ReactNode; color?: string }) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.span
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className='relative cursor-default'
			style={{
				textDecoration: 'none',
			}}
		>
			<motion.span
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					width: '100%',
					height: '4px',
					backgroundColor: color,
				}}
				initial={{ scaleX: 0 }}
				animate={{ scaleX: isHovered ? 0.6 : 0.9 }}
				transition={{ duration: 0.5, ease: 'easeInOut' }}
			/>
			{children}
		</motion.span>
	);
}