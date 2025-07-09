import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => (
  <div>
    <h1>Welcome to My Portfolio</h1>
    <p>
      Explore some of my featured projects below. Each project leverages modern cloud and web technologies to deliver robust, scalable, and engaging user experiences.
    </p>
    <ul style={{ lineHeight: 2, listStyle: 'none', padding: 0 }}>
      <li>
        <Link to="/work" className="project-link-card">
          Student Management Dashboard
        </Link>
        <br />
        <span>
          A full-stack application built with <strong>React</strong> and <strong>.NET 8 (ASP.NET Core Web API)</strong>, hosted on <strong>Azure</strong> with CI/CD pipelines and Azure SQL for data storage. Manage and view student data in real time.
        </span>
      </li>
      <li>
        <a
          href="https://main.d21iopdt05d7sj.amplifyapp.com/"
          className="project-link-card"
          target="_blank"
          rel="noopener noreferrer"
        >
          Online Game Portal
        </a>
        <br />
        <span>
          A cloud-hosted game website running on <strong>AWS</strong>, featuring interactive games built with <strong>JavaScript</strong> and <strong>React</strong>. Deployed using AWS Amplify for seamless updates and scalability.
        </span>
      </li>
    </ul>
  </div>
);

export default HomePage;