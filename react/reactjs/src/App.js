import React from 'react';
import './App.css';

// Components
function Header({ title }) {
  return <header>{title}</header>;
}

function Sidebar() {
  return (
    <aside>
      <nav>
        <ul>
          <li>Home</li>
          <li>Election Results</li>
          <li>Account Settings</li>
          <li>Privacy Policy</li>
          <li>Logout</li>
        </ul>
      </nav>
    </aside>
  );
}

function Candidate({ name, department }) {
  return (
    <div className="candidate">
      <div className="candidate-info">
        <div className="candidate-avatar"></div>
        <div className="candidate-name">{name}, {department}</div>
      </div>
      <button onClick={() => console.log(`Voted for ${name}`)}>Vote</button>
    </div>
  );
}

function ElectionManager({ manager }) {
  return <div className="election-manager">Election Manager: {manager}</div>;
}

function App() {
  return (
    <div className="app">
      <Header title="Gabriel Chung - IT Dept" />
      <Sidebar />
      <div className="main-content">
        <ElectionManager manager="Chua Zong Fu" />
        <div className="voting-section">
          <Candidate name="Jason Tan" department="Marketing Dept" />
          <Candidate name="Naomi Chow" department="Sales Dept" />
        </div>
      </div>
    </div>
  );
}


export default App;
