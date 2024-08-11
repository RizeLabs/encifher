import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useBlogPost} from '@docusaurus/theme-common/internal';
import type {Props} from '@theme/BlogPostItem/Header/Title';

import styles from './styles.module.css';

export default function BlogPostItemHeaderTitle({
  className,
}: Props): JSX.Element {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {permalink, title, frontMatter} = metadata;
  const TitleHeading = isBlogPostPage ? 'h1' : 'h2';
  
  return (
    <div className={clsx(styles.headerContainer, className)}>
      {isBlogPostPage && frontMatter.topic && (
        <h2 className={clsx("uppercase mb-1 text-[#A994FF] font-menseal")}>
          {frontMatter.topic}
        </h2>
      )}
      <TitleHeading className={clsx(styles.title)}>
        {isBlogPostPage ? title : <Link to={permalink}>{title}</Link>}
      </TitleHeading>
    </div>
  );
}
