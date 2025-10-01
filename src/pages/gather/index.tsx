import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';

const REDIRECT_LINK = 'https://openpanel.com?utm_source=sentinelfirewall.org';

function ContactForm() {
  React.useEffect(() => {
    setTimeout(() => window.location.assign(REDIRECT_LINK), 2000);
  }, []);

  return (
    <Layout title={`Contact`} description="Sentinel Firewall - Redirecting..">
      <main style={{ margin: '0 auto', width: 'max-content', paddingTop: '10vh' }}>
        <Heading
          as="h1"
          style={{ textAlign: 'center', marginBottom: 'calc(var(--ifm-leading) * 2)' }}
        >
          Redirecting to OpenPanel
        </Heading>

        <p>
          We are redirecting you to openpanel.com
        </p>
        <p>
          If you are not redirected, please use the following link:{' '}
          <Link to={REDIRECT_LINK}>Visit OpenPanel</Link>
        </p>
      </main>
    </Layout>
  );
}
export default ContactForm;
