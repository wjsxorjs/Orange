import React from 'react';
import dynamic from 'next/dynamic';
import ReactQuill from 'react-quill';

const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: QuillComponent } = await import('react-quill');

    const Quill = ({ forwardedRef, ...props }) => (
      <QuillComponent ref={forwardedRef} {...props} />
    );

    return Quill;
  },
  { loading: () => <div>...loading</div>, ssr: false },
);

export default QuillNoSSRWrapper;
