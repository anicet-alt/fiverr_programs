import React from 'react';

export default function Home() {
  const services = [
    { name: "Hire a Web Developer", id: "web_development" },
    { name: "Hire a Graphic Designer", id: "graphic_design" },
    { name: "Hire an SEO Expert", id: "seo_specialist" }
  ];

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
      <h1>Freelance Project Routing Hub</h1>
      <p>Select a verified service provider below to launch your project:</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        {services.map((svc) => (
          <a
            key={svc.id}
            href={`/api/redirect?service=${svc.id}`}
            style={{
              padding: '15px',
              backgroundColor: '#0070f3',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            {svc.name} &rarr;
          </a>
        ))}
      </div>
    </div>
  );
}
