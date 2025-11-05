import React, { useEffect, useState } from 'react';

export default function RemoteChangelog() {
  const [entries, setEntries] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/sentinelfirewall/sentinel/refs/heads/main/csf/changelog.txt')
      .then((res) => res.text())
      .then((text) => {
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
      .catch(() =>
        setEntries([
          {
            version: 'Error',
            content:
              'Please open: https://raw.githubusercontent.com/sentinelfirewall/sentinel/refs/heads/main/csf/changelog.txt'
          }
        ])
      );
  }, []);

  if (!entries) return <p>Loading changelog...</p>;

  const parseMarkdownLinks = (line) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }
      parts.push(
        <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer" style={{ color: '#1a0dab' }}>
          {match[1]}
        </a>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    return parts;
  };

  return (
    <div>
      {entries.map((entry, idx) => (
        <div key={idx} style={{ marginBottom: '2rem' }}>
          <h2>{entry.version}</h2>
          {entry.content.split('\n').map((line, i) => (
            <p key={i}>{parseMarkdownLinks(line)}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
