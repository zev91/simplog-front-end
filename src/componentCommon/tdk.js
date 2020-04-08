import React from 'react';
import { Helmet } from 'react-helmet';

export default page => {
  return (
    <Helmet>
    <title>{page.title}</title>
    <meta name="description" content={page.description} />
    <meta name="keywords" content={page.keywords} />
  </Helmet>
  )
}
 
