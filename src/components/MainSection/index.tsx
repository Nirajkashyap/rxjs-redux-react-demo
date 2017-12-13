import * as React from 'react';
import * as TodoActions from '../../actions/todos';
import * as style from './style.css';
import { connect } from 'react-redux';
import { Footer } from '../Footer';
import { TodoItem } from '../TodoItem';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../../constants/filters';

import {AgGridReact} from 'ag-grid-react';
import SampleRowDataFactory from './SampleRowData';
import ColumnDefinitionFactory from './ColumnDefinitions';
//import "ag-grid-enterprise";

// import * as AGS from '../../../node_modules/ag-grid/dist/styles/ag-grid.css';
// import * as AGS2 from '../../../node_modules/ag-grid/dist/styles/theme-fresh.css';

// const css11 = require('../../../node_modules/ag-grid/dist/styles/ag-grid.css')
// const css12 = require('../../../node_modules/ag-grid/dist/styles/theme-fresh.css')

import '../../../node_modules/ag-grid/dist/styles/ag-grid.css';
import '../../../node_modules/ag-grid/dist/styles/theme-fresh.css';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

export namespace MainSection {
  export interface Props {
    todos: TodoItemData[];
    actions: typeof TodoActions;
  }

  export interface State {
    filter: TodoFilterType;
    columnDefs:any,
    rowData:any
  }
}

export class MainSection extends React.Component<MainSection.Props, MainSection.State> {

  constructor(props?: MainSection.Props, context?: any) {
    super(props, context);
    this.state = { 
      filter: SHOW_ALL, 
      columnDefs: new ColumnDefinitionFactory().createColDefs(),
            // set the row data to use inside the grid
      rowData: new SampleRowDataFactory().createRowData()
    };
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleClearCompleted() {
    const atLeastOneCompleted = this.props.todos.some(todo => todo.completed);
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted();
    }
  }

  handleShow(filter: TodoFilterType) {
    this.setState({ filter });
  }

  renderToggleAll(completedCount: number) {
    const { todos, actions } = this.props;
    if (todos.length > 0) {
      return (
        <input
          className={style.toggleAll}
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={actions.completeAll} />
      );
    }
  }

  renderFooter(completedCount: number) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer filter={filter}
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={this.handleClearCompleted}
          onShow={this.handleShow} />
      );
    }
  }

  render() {
    const { todos, actions } = this.props;
    const { filter } = this.state;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce((count, todo) => {
      return todo.completed ? count + 1 : count;
    }, 0);
    // console.log(AGS);
    // console.log(AGS2);
    // const tempclass = AGS2["ag-fresh"]
    return (
      <div style={{height: 525, width: 900}} className="ag-fresh">
        {/* {this.renderToggleAll(completedCount)} */}
        <ul className={style.normal}>
          {filteredTodos.map(todo =>
            <TodoItem
              key={todo.id}
              todo={todo}
              completeTodo={actions.completeTodo}
              deleteTodo={actions.deleteTodo}
              editTodo={actions.editTodo} />
          )}
        </ul>
        {this.renderFooter(completedCount)}
        {/* <AgGridReact
                    // binding to array properties
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}

                    // no simple properties
                    suppressRowClickSelection={true}
                    rowSelection={"multiple"}
                    enableColResize={true}
                    enableSorting={true}
                    enableFilter={true}
                    animateRows={true}
                    
                    rowHeight={22}
                /> */}
      </div>
    );
  }
}
