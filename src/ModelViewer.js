function ModelViewer( { alt, src } ) {
	return (
		<>
			<div className="wp-block-chsa-catalogit-model-viewer__container">
				<div className="wp-block-chsa-catalogit-model-viewer__content">
					<model-viewer
						className="wp-block-chsa-catalogit-model-viewer__model"
						alt={ alt }
						src={ src }
						autoplay
						ar-modes="webxr scene-viewer quick-look"
						tone-mapping="commerce"
						shadow-intensity="1"
						data-auto-rotate
						data-ar
						data-camera-controls
					></model-viewer>
				</div>
			</div>
		</>
	);
}
export default ModelViewer;
