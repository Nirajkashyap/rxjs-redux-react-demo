import * as React from 'react';
import { PureComponent } from 'react';

// import LoadingIndicator from 'commons/ui/components/LoadingIndicator';

import { from } from 'rxjs/observable/from';

export class AsyncComponent extends PureComponent<any,any> {
  constructor(props) {
    super(props);

    this.state = {
      Component: null
    }
  }

  componentWillMount() {
    if(!this.state.Component) {
      this.props.moduleProvider().then( ({Component}) => this.setState({ Component }));
    }
  }

  render() {
    const { Component } = this.state;

    // The magic happens here!
    return (
      <div>
        {Component ? <Component /> : <div> loading ...  </div>}
      </div>
    );
  }
};