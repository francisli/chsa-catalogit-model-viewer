import classNames from 'classnames';

function ModelViewer( { alt, entryId, src, align } ) {
	return (
		<>
			<div
				className={ classNames(
					'wp-block-chsa-catalogit-model-viewer__container',
					{
						'wp-block-chsa-catalogit-model-viewer__container--wide':
							align === 'wide',
					}
				) }
			>
				<div className="wp-block-chsa-catalogit-model-viewer__content">
					{ !! src && (
						<model-viewer
							class="wp-block-chsa-catalogit-model-viewer__model"
							alt={ alt }
							src={ src }
							autoplay
							ar-modes="webxr scene-viewer quick-look"
							tone-mapping="commerce"
							shadow-intensity="1"
							auto-rotate
							data-auto-rotate
							ar
							data-ar
							camera-controls
							data-camera-controls
						></model-viewer>
					) }
					{ ! src && (
						<div className="wp-block-chsa-catalogit-model-viewer__placeholder">
							<div className="wp-block-chsa-catalogit-model-viewer__message">
								<b>Model not found for Entry ID:</b>
								<br />
								{ entryId }
							</div>
						</div>
					) }
				</div>
			</div>
		</>
	);
}
export default ModelViewer;
