import React from 'react';

// Minimal timeline data – replace with your own events
const events = [
  { year: '2024', title: 'Senior Engineer at Acme Corp', description: 'Led the migration to a cloud‑native stack.' },
  { year: '2023', title: 'Open‑Source Contributor', description: 'Merged 15 PRs to the React community toolkit.' },
  { year: '2022', title: 'Freelance UI/UX Designer', description: 'Built responsive dashboards for fintech startups.' },
  // add more events here …
];

export default function Timeline() {
  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: 12 }}>
        Professional Timeline
      </h2>
      <ul style={{ paddingLeft: 20, listStyle: 'none' }}>
        {events.map((e, i) => (
          <li key={i} style={{ marginBottom: 18 }}>
            <div style={{ fontWeight: '600' }}>{e.year}</div>
            <div style={{ fontSize: '1rem' }}>{e.title}</div>
            <p style={{ margin: 0, color: '#555' }}>{e.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}