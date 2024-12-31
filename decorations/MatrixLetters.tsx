'use client';

/**
 * Author: Tanishq Sharma – https://tanishq.xyz or @tanishqxyz on X, @tanishqsh on GitHub
 * Attribution required: please leave this comment in the code if you use it.
 */

import React, { useEffect, useRef } from 'react';

interface Point {
	x: number;
	y: number;
	originalX: number;
	originalY: number;
	color: string;
	hoverColor: string;
	isMoving: boolean;
	opacity: number;
	character: string;
}

const MatrixLetters: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let animationFrameId: number;

		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		resizeCanvas();
		window.addEventListener('resize', resizeCanvas);

		const spacing = 50;
		const rows = Math.ceil(window.innerHeight / spacing) + 2;
		const cols = Math.ceil(window.innerWidth / spacing) + 2;
		const maxTravelDistance = spacing / 3;
		const influenceRadius = 250;

		const dimmedWhite = 'rgba(100, 100, 100, 0.01)';
		const fullWhite = 'rgb(100, 100, 100, 0.01)';

		const getRandomMatrixColor = (): string => {
			const green = Math.floor(Math.random() * 128 + 128);
			const grayscale = Math.floor(Math.random() * 64);
			return `rgb(${grayscale}, ${green}, ${grayscale})`;
		};

		const getRandomCharacter = (): string => {
			const characters = 'E@N_C!I/F|H^E&R';
			return characters.charAt(Math.floor(Math.random() * characters.length));
		};

		const points: Point[] = [];
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				points.push({
					x: j * spacing,
					y: i * spacing,
					originalX: j * spacing,
					originalY: i * spacing,
					color: dimmedWhite,
					hoverColor: 'rgba(80, 36, 255, 0.2)',
					isMoving: false,
					opacity: 0,
					character: getRandomCharacter(),
				});
			}
		}

		let mousePos = { x: 0, y: 0 };
		let isPhone = window.innerWidth <= 768;

		const animate = () => {
			ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			const isMouseOutside = mousePos.x <= 0 || mousePos.y <= 0 || mousePos.x > canvas.width || mousePos.y > canvas.height;
			const currentInfluenceRadius = isMouseOutside ? 0 : influenceRadius;

			points.forEach((point) => {
				const dx = mousePos.x - point.x;
				const dy = mousePos.y - point.y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (point.opacity < 1) {
					point.opacity = Math.min(1, point.opacity + 0.01);
				}

				if (distance < currentInfluenceRadius) {
					const force = (influenceRadius - distance) / influenceRadius;
					let newX = point.x + dx * force * 0.05;
					let newY = point.y + dy * force * 0.05;

					const travelDistance = Math.sqrt(Math.pow(newX - point.originalX, 2) + Math.pow(newY - point.originalY, 2));
					if (travelDistance > maxTravelDistance) {
						const angle = Math.atan2(newY - point.originalY, newX - point.originalX);
						newX = point.originalX + Math.cos(angle) * maxTravelDistance;
						newY = point.originalY + Math.sin(angle) * maxTravelDistance;
					}

					point.isMoving = newX !== point.x || newY !== point.y;
					point.x = newX;
					point.y = newY;

					point.color = point.isMoving ? point.hoverColor : fullWhite;

					if (point.isMoving && Math.random() < 0.1) {
						point.character = getRandomCharacter();
					}
				} else {
					point.x += (point.originalX - point.x) * 0.1;
					point.y += (point.originalY - point.y) * 0.1;
					point.isMoving = Math.abs(point.x - point.originalX) > 0.01 || Math.abs(point.y - point.originalY) > 0.01;
					point.color = point.isMoving ? point.hoverColor : dimmedWhite;
				}

				ctx.fillStyle = point.color;
				ctx.globalAlpha = point.opacity;
				ctx.font = '12px Monospace';
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(point.character, point.x, point.y);
			});

			animationFrameId = requestAnimationFrame(animate);
		};

		animate();

		const handleMouseMove = (e: MouseEvent) => {
			if (!isPhone) {
				mousePos = { x: e.clientX, y: e.clientY };
			}
		};

		const handleResize = () => {
			resizeCanvas();
			isPhone = window.innerWidth <= 768;
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', resizeCanvas);
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				zIndex: -1,
			}}
		/>
	);
};

export default MatrixLetters;
