import { Helmet } from 'react-helmet-async';

export default function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Michael Wilke',
    url: 'https://michaelwilke.com',
    jobTitle: 'IT Systems & Data Analyst',
    worksFor: {
      '@type': 'Organization',
      name: 'AION Management',
    },
    sameAs: [
      'https://github.com/flamespinner',
      'https://linkedin.com/in/michaelwfwilke',
    ],
    knowsAbout: [
      'SQL Server',
      'Power BI',
      'Python',
      'React',
      'PowerShell',
      'Azure',
      'Windows Server Administration',
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
