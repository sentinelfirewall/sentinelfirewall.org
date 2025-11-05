import React, { useEffect, useState } from 'react';

export default function RemoteChangelog() {
  const [entries, setEntries] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/sentinelfirewall/sentinel/refs/heads/main/csf/changelog.txt')
      .then((res) => res.text())
      .then((text) => {
        // ## are headers https://github.com/sentinelfirewall/sentinel/blob/main/csf/changelog.txt
        const rawEntries = text.split(/^##\s+/m).filter(Boolean);
        const parsedEntries = rawEntries.map(entry => {
          const [versionLine, ...rest] = entry.split('\n');
          return {
            version: versionLine.trim(),
            content: rest.join('\n').trim()
          };
        });
        setEntries(parsedEntries);
      })
      .catch(() => setEntries([{ version: 'Error', content: 'Please open: https://raw.githubusercontent.com/sentinelfirewall/sentinel/refs/heads/main/csf/changelog.txt' }]));
  }, []);

  if (!entries) return <p>Loading changelog...</p>;

  return (
    <div>
      {entries.map((entry, idx) => (
        <div key={idx} style={{ marginBottom: '2rem' }}>
          <h2>{entry.version}</h2>
          {entry.content.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
