var React = require('react');

class Header extends React.Component {
  handleChange() {
    this.props.onUserInput(this.refs.filterTextInput.value);
  }
  render() {
    return (
      <div>
        <h2>BullsEYe</h2>
      </div>

    );
  }

}

class Targets extends React.Component {

  constructor(props) {
    super(props);

    //  this.state.targets = [];
    this.state = {};
    this.state.filterText = "";
    this.state.targets = [
      {
        id: 1,
        name: "Company A",
        status: "researching",
        valuation: "$7,000,000",
        pe: 15.4,
        dcf: "+1%",
        contact: "lisa@abc.com"
      }, {
        id: 2,
        name: "Company B",
        status: "declined",
        valuation: "$22,000,000",
        pe: 16.9,
        dcf: "-4%",
        contact: "robin@xyz.com"
      }, {
        id: 3,
        name: "Company C",
        status: "researching",
        valuation: "$17,000,000",
        pe: 20.9,
        dcf: "+2%",
        contact: "derk@qrs.com"
      }, {
        id: 4,
        name: "Company D",
        status: "approved",
        valuation: "$10,000,000",
        pe: 19.6,
        dcf: "+8%",
        contact: "nemo@efg.com"
      }
    ];

  }

  handleRowDel(target) {
    var index = this.state.targets.indexOf(target);
    this.state.targets.splice(index, 1);
    this.setState(this.state.targets);
  };

  handleAddEvent(evt) {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var target = {
      id: id,
      name: "",
      status: "",
      valuation: "",
      pe: 0,
      dcf: "",
      contact: ""
    }
    this.state.targets.push(target);
    this.setState(this.state.targets);

  }

  handleTargetTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    var targets = this.state.targets;

    var newTargets = targets.map(function(target) {
      for (var key in target) {
        if (key == item.name && target.id == item.id) {
          target[key] = item.value;

        }
      }
      return target;
    });
    this.setState(newTargets);
  };

  render() {

    return (
      <div>
        <Header />
        <TargetTable onTargetTableUpdate={this.handleTargetTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} targets={this.state.targets} filterText={this.state.filterText}/>
      </div>
    );

  }

}

class TargetTable extends React.Component {

  render() {
    var onTargetTableUpdate = this.props.onTargetTableUpdate;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var target = this.props.targets.map(function(target) {
      if (target.name.indexOf(filterText) === -1) {
        return;
      }
      return (<TargetRow onTargetTableUpdate={onTargetTableUpdate} target={target} onDelEvent={rowDel.bind(this)} key={target.id}/>)
    });
    return (
      <div>


      <button type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">Add</button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Valuation</th>
              <th>P/E</th>
              <th>DCF</th>
              <th>Contact</th>
            </tr>
          </thead>

          <tbody>
            {target}

          </tbody>

        </table>
      </div>
    );
  }
}

class TargetRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.target);
  }

  render() {

    return (
      <tr className="eachRow">
        <EditableCell onTargetTableUpdate={this.props.onTargetTableUpdate} cellData={{
          "type": "name",
          value: this.props.target.name,
          id: this.props.target.id
        }}/>
        <EditableCell onTargetTableUpdate={this.props.onTargetTableUpdate} cellData={{
          type: "status",
          value: this.props.target.status,
          id: this.props.target.id
        }}/>
        <EditableCell onTargetTableUpdate={this.props.onTargetTableUpdate} cellData={{
          type: "valuation",
          value: this.props.target.valuation,
          id: this.props.target.id
        }}/>
        <EditableCell onTargetTableUpdate={this.props.onTargetTableUpdate} cellData={{
          type: "pe",
          value: this.props.target.pe,
          id: this.props.target.id
        }}/>
        <EditableCell onTargetTableUpdate={this.props.onTargetTableUpdate} cellData={{
          type: "dcf",
          value: this.props.target.dcf,
          id: this.props.target.id
        }}/>
        <EditableCell onTargetTableUpdate={this.props.onTargetTableUpdate} cellData={{
          type: "contact",
          value: this.props.target.contact,
          id: this.props.target.id
        }}/>
        <td className="del-cell">
          <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn"/>
        </td>
      </tr>
    );

  }

}

class EditableCell extends React.Component {

  render() {
    return (
      <td>
        <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onTargetTableUpdate}/>
      </td>
    );

  }

}

React.render( < Targets / > , document.getElementById('container'));
