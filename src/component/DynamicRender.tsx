import React, { Fragment } from 'react';

interface DynamicRendererProps {
  render: () => React.ReactNode | React.ReactNode[];
}

/**
 * Renders the content returned by the `render` prop as a fragment.
 *
 * @param {DynamicRendererProps} props - The component props.
 * @param {Function} props.render - The function that returns the content to be rendered.
 *                                 It can return a single ReactNode or an array of ReactNodes.
 * @returns {ReactNode} - The rendered content.
 */

const DynamicRenderer: React.FC<DynamicRendererProps> = ({ render }) => {
  const renderedContent = Array.isArray(render) ? render : [render];
  return <Fragment>{renderedContent}</Fragment>;
};
export default DynamicRenderer;
