/**
 * Created by chandransh on 21/12/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import './graphTableView.css';
// import * as AddData from '../../reducers/addData';
import Input from '../../components/Input/Input';
import ReactDatepicker from 'react-datepicker/dist/react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Moment from 'moment';

class graphTableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedData: [],
      chartData: {},
      startDate: null,
      endDate: null
    }
  }

  checkForm = () => {
    let f = document.forms["add-form"].elements;
    let cansubmit = true;

    for (let i = 0; i < f.length; i++) {
      if (f[i].value.length == 0) cansubmit = false;
    }

    document.getElementById('submit').disabled = !cansubmit;
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    let formData = {
      name: document.getElementsByName('name')[0].value,
      value: document.getElementsByName('value')[0].value,
      startDate: document.getElementById('start-date').value,
      endDate: document.getElementById('end-date').value
    };

    this.setState({
      addedData: [...this.state.addedData, formData],
      startDate: null,
      endDate: null
    });

    document.forms["add-form"].reset();
  };

  handleListClick = (item, e) => {
    e.stopPropagation();
    let tableItems = document.getElementsByClassName('table-item');

    this.setState({
      chartData: item
    });

    //remove all active classes
    for(var i = 0; i < tableItems.length; i++) {
      tableItems[i].classList.remove('active');
    }

    if(e.target.classList.contains('table-item')) {
      //add class if item is clicked
      return e.target.classList.add('active');
    } else {
      //handle addition of active class if item's children are clicked
      while ((e.target = e.target.parentNode) && !e.target.classList.contains('table-item'));
      return e.target.classList.add('active');
    }
  };

  handleChangeStart = (date) => {
    this.checkForm();
    this.setState({
      startDate: date
    });
  };

  handleChangeEnd = (date) => {
    this.checkForm();
    this.setState({
      endDate: date
    });
  };

  render() {
    const _self = this;
    const {addedData, chartData, startDate, endDate} = this.state;

    let addedItems = addedData.length>0 ? addedData.map(function(item, i) {
      return <li key={i} className="table-item"
          onClick={_self.handleListClick.bind(null, item)}>
        {item.name} = {item.value}
        <p><small>{item.startDate} - {item.endDate}</small></p>
      </li>}) : <li className="table-item">No added data</li>;

    return (
      <div className="graph-container center-block">
        <h2>Add new data</h2>
        <form name="add-form"
              className="add-form"
              onSubmit={this.handleFormSubmit}>
          <Input className="full-width"
                 type="text"
                 name="name"
                 placeholder="Entry name"
                 maxLength="10"
                 onKeyUp={this.checkForm}/>
          <Input className="full-width"
                 type="number"
                 name="value"
                 placeholder="Enter value"
                 maxLength="3"
                 onKeyUp={this.checkForm}
                 min="1"
                 max="100"/>
          <ReactDatepicker dateFormat="DD/MM/YYYY"
                           todayButton="Today"
                           selected={startDate}
                           onChange={this.handleChangeStart}
                           id="start-date"
                           className="input"
                           placeholderText="Enter start date"/>
          <ReactDatepicker dateFormat="DD/MM/YYYY"
                           selected={endDate}
                           disabled={startDate == null}
                           minDate={Moment(startDate)}
                           maxDate={Moment(startDate).add(100, "years")}
                           onChange={this.handleChangeEnd}
                           id="end-date"
                           className="input"
                           placeholderText="Enter end date"/>

          <input id="submit"
                 className="btn btn-primary full-width"
                 type="submit"
                 value="Add"
                 disabled/>
        </form>
        <div>
          <h2>Added data</h2>
          <div className="table-container full-width">
            <ul className="table-row">
              {addedItems}
            </ul>
            <div className="graph">
              {Object.keys(chartData).length>0 && <svg width="100%" height="100%" viewBox="0 0 100 100">
                <circle cx="50%" cy="50%" r="40" fill="transparent" strokeWidth="20" stroke="#673ab7"/>
                {/*strokeDashoffset = % needed * strokeDasharray(=perimeter)*/}
                <circle cx="50%" cy="50%" r="40" fill="transparent" strokeWidth="20" stroke="#eeeeee" strokeDasharray="251.2" strokeDashoffset={chartData.value*2.512}/>
                <text x="34.5%" y="53%" fill="black" fontSize="16">{chartData.value + "%"}</text>
              </svg>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // addData: state.addData
});

const mapActionToProps = (dispatch) => ({
  // AddData: bindActionCreators(AddData, dispatch)
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(graphTableView);