import React, { useEffect, useState } from 'react';

export default function RemoteChangelog() {
  const [content, setContent] = useState('Loading changelog...');

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/sentinelfirewall/sentinel/refs/heads/main/csf/changelog.txt')
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch(() => setContent('❌ Failed to load changelog.'));
  }, []);

  return (
    <pre style={{ whiteSpace: 'pre-wrap', background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
      {content}
    </pre>
  );
}
