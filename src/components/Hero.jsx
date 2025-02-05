import React, { useState, useRef, useEffect } from "react";

const Hero = () => {
	const [currentIndex, setCurrentIndex] = useState(1);
	const [hasClicked, setHasClicked] = useState(false);
	const [loading, setLoading] = useState(true);
	const [loadedVideos, setLoadedVideos] = useState(0);

	const totalVideos = 4;
	// this is a ref matcher in terms
	const upcomingVideoIndex = (currentIndex % totalVideos) + 1;
	const nextVideoRef = useRef(null);

	useEffect(() => {
		if (loadedVideos === totalVideos - 1) {
			setLoading(false);
		}
	}, [loadedVideos]);

	const handleMiniVdClick = () => {
		setHasClicked(true);
		// Previous parameter
		// (prev) => prev + 1)
		setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
	};

	const handleVideoLoad = () => {
		setLoadedVideos((prev) => prev + 1);
	};

	const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

	return (
		<div className="relative h-dvh w-screen overflow-x-hidden">
			<div
				id="video-frame"
				className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
			>
				<div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
					<div
						onClick={handleMiniVdClick}
						className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
					>
						<video
							ref={nextVideoRef}
							src={getVideoSrc((currentIndex % totalVideos) + 1)}
							loop
							muted
							id="current-video"
							className="size-64 origin-center scale-150 object-cover object-center"
							onLoadedData={handleVideoLoad}
						/>
					</div>
				</div>
				<video
					ref={nextVideoRef}
					src={getVideoSrc(currentIndex)}
					loop
					muted
					id="next-video"
					className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
					onLoadedData={handleVideoLoad}
				/>

				<video
					src={getVideoSrc(currentIndex)}
					autoPlay
					loop
					muted
					className="absolute left-0 top-0 size-full object-cover object-center"
					onLoadedData={handleVideoLoad}
				/>
			</div>
		</div>
	);
};

export default Hero;
