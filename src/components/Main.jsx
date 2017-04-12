import React from 'react';
// import Navbar from './Navbar';
import Card from './Card';

/**
 * @param {Array} projectData containing all the repos
 * filter the key value
 * @param {String} searchInput the search input submitted by the user
 * both strings are normalized with toLowerCase() for better filtering
 * @param {Boolean} isDev true if user has freeCodeCamp cookie, else false
 * @returns {ReactElement} containing repos that pass the filter
 * to be used to map the <Card /> components
 */
const renderProjects = (projectData, searchInput, isDev) => {
  if (searchInput) {
    return projectData.filter((project) => {
      const keyWords = project.title.toLowerCase().split(' ');
      const searchWords = searchInput.toLowerCase().split(' ');
      for (let i = 0; i < searchWords.length; i++) {
        if (keyWords.indexOf(searchWords[i]) !== -1) { return true; }
      }
      return false;
    })
    .map(project =>
      <Card
        project={project}
        isDev={isDev}
        key={project.full_name}
      />);
  }
  return projectData.map(project => <Card
    project={project}
    isDev={isDev}
    key={project.full_name}
  />);
};

const Main = ({ projectData, searchInput, isDev }) => (
  <main className="main">
    <div className="content-center">
      {/* <Navbar /> */}
      <div className="content-container">
        <div className="card-container">
          {projectData.length ?
          renderProjects(projectData, searchInput, isDev)
          : null}
        </div>
      </div>
    </div>
  </main>
);

Main.propTypes = {
  projectData: React.PropTypes.arrayOf(React.PropTypes.object),
  searchInput: React.PropTypes.string,
  isDev: React.PropTypes.bool,
};

Main.defaultProps = {
  projectList: [],
  projectData: [],
  searchInput: '',
  isDev: false,
};

export default Main;
