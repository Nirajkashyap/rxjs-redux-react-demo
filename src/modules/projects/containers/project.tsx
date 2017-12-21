import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ProjectActions from '../actions/projects';
import { ProjectState } from '../reducers';
// import { Header, MainSection } from '../../components';


export namespace Project {
    export interface Props {
        Projects: any;
        actions: typeof ProjectActions;

    }

    export interface State {
        /* empty */
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class ProjectComponent extends React.Component<Project.Props, Project.State> {

  render() {
    const { Projects, actions , children} = this.props;
    return (
      <div >
       
      </div>
    );
  }
}


function mapStateToProps(state: ProjectState) {
    return {
        Projects: state.Projects
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ProjectActions as any, dispatch)
    };
}
