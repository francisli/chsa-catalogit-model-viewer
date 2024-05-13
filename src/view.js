/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */
import '@google/model-viewer';
if ( window.self === window.top ) {
	const domReady = ( await import( '@wordpress/dom-ready' ) ).default;
	async function init() {
		const viewers = document.querySelectorAll( 'model-viewer' );
		const promises = [];
		for ( const viewer of viewers ) {
			viewer.autoRotate = viewer.dataset.autoRotate === 'true';
			viewer.ar = viewer.dataset.ar === 'true';
			viewer.cameraControls = viewer.dataset.cameraControls === 'true';
			const { entryId } = viewer.dataset;
			async function getEntry() {
				const response = await fetch(
					`https://api.catalogit.app/api/public/entries/${ entryId }`
				);
				const data = await response.json();
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
				if (src) {
					viewer.src = src;
				}
			}
			promises.push(getEntry());
		}
		await Promise.all(promises());
	}
	domReady( init );
}
