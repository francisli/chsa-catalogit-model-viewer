/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

import { PanelBody, TextControl } from '@wordpress/components';
import { useRefEffect } from '@wordpress/compose';

import { useEffect } from 'react';
import ModelViewer from './ModelViewer';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param  root0
 * @param  root0.attributes
 * @param  root0.setAttributes
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { entryId, alt, src, align } = attributes;

	useEffect( () => {
		let isCancelled = false;
		async function getEntry() {
			try {
				if ( isCancelled ) {
					return;
				}
				const response = await fetch(
					`https://api.catalogit.app/api/public/entries/${ entryId }`
				);
				if ( isCancelled ) {
					return;
				}
				const data = await response.json();
				if ( isCancelled ) {
					return;
				}
				let src;
				if ( data?.media ) {
					for ( const obj of data.media ) {
						if (
							obj.derivatives?.public_original?.path?.endsWith(
								'.glb'
							)
						) {
							src = obj.derivatives.public_original.path;
							break;
						}
					}
				}
				const alt =
					data?.properties?.hasDescription?.value_text ??
					data?.properties?.hasName?.value_text;
				setAttributes( { src, alt } );
			} catch ( error ) {
				console.error( error );
				setAttributes( { src: null, alt: null } );
			}
		}
		if ( entryId ) {
			getEntry();
		}
		return () => ( isCancelled = true );
	}, [ entryId, setAttributes ] );

	const setupRef = useRefEffect( ( element ) => {
		const { ownerDocument } = element;
		let { href } = ownerDocument.defaultView.location;
		if ( href.startsWith( 'blob:' ) ) {
			href = href.substring( 5 );
		}
		const url = new URL( href );
		const src = `${ url.origin }/wp-content/plugins/chsa-catalogit-model-viewer/build/view.js`;
		if ( ! ownerDocument.body.querySelector( `script[src="${ src }"]` ) ) {
			const script = ownerDocument.createElement( 'script' );
			script.setAttribute( 'src', src );
			ownerDocument.body.appendChild( script );
		}
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Settings', 'chsa-catalogit-model-viewer' ) }
				>
					<TextControl
						label={ __(
							'Entry ID',
							'chsa-catalogit-model-viewer'
						) }
						value={ entryId || '' }
						onChange={ ( newValue ) =>
							setAttributes( { entryId: newValue } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps( { ref: setupRef } ) }>
				<ModelViewer
					alt={ alt }
					entryId={ entryId }
					src={ src }
					align={ align }
				/>
			</div>
		</>
	);
}
