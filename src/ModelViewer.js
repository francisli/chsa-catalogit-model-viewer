import classNames from 'classnames';

function renderPropertyValue( property ) {
	if ( property.value_text ) {
		return property.value_text;
	} else if ( property.value_reference ) {
		return property.value_reference.reference_value;
	} else if ( property.value_hreference_list ) {
		return renderPropertyValue( property.value_hreference_list );
	} else if ( property.value_length ) {
		return property.value_length.length_value;
	}
	return '';
}

function renderPropertyBlock( property ) {
	return (
		<>
			<h3>{ property.label }</h3>
			{ Object.keys( property.value ).map( ( key ) => (
				<p key={ key }>
					<b>{ property.value[ key ].label }:</b>{ ' ' }
					{ renderPropertyValue( property.value[ key ] ) }
				</p>
			) ) }
		</>
	);
}

function ModelViewer( { alt, entryId, src, align, properties } ) {
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
							data-entry-id={entryId}
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
			<div className="wp-block-chsa-catalogit-model-viewer__metadata">
				{ !! properties?.hasName && (
					<h2>{ renderPropertyValue( properties.hasName ) }</h2>
				) }
				{ !! properties?.hasDescription && (
					<p>{ renderPropertyValue( properties.hasDescription ) }</p>
				) }
				{ !! properties?.hasCreateOrManufactureInfo &&
					renderPropertyBlock(
						properties.hasCreateOrManufactureInfo
					) }
				{ !! properties?.hasDimensions &&
					renderPropertyBlock( properties.hasDimensions ) }
			</div>
		</>
	);
}
export default ModelViewer;
