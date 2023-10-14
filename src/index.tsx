/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import SourceList from './source-list';
import './editor.scss';
import type { BlockAttributes } from './types';

const addImageSourceAttributes = ( settings: { [ key: string ]: any } ) => {
	if ( 'core/image' !== settings.name ) {
		return settings;
	}

	const newSettings = {
		...settings,
		attributes: {
			...settings.attributes,
			sources: {
				type: 'array',
				items: {
					type: 'number',
				},
				default: [],
			},
		},
	};
	return newSettings;
};

addFilter(
	'blocks.registerBlockType',
	'enable-responsive-image/add-image-source-attributes',
	addImageSourceAttributes
);

const withInspectorControl =
	( BlockEdit: React.ComponentType< BlockEditProps< BlockAttributes > > ) =>
	(
		props: BlockEditProps< BlockAttributes > & {
			name: string;
		}
	) => {
		return props.name === 'core/image' ? (
			<>
				<BlockEdit { ...props } />
				<InspectorControls>
					<SourceList { ...props } />
				</InspectorControls>
			</>
		) : (
			<BlockEdit { ...props } />
		);
	};

addFilter(
	'editor.BlockEdit',
	'enable-responsive-image/with-inspector-control',
	withInspectorControl
);
