import React from 'react';
import { TAPi18n } from 'meteor/tap:i18n';
import ReactTable from 'react-table';
import { withTracker } from 'meteor/react-meteor-data';
import { StandardsProducts } from 'meteor/igoandtrack:standards-products-collection';

class AdminStandard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: nextProps.loading
    });
  }

  getColumns() {
    return [
      {
        Header: TAPi18n.__('standard'),
        accessor: 'name'
      }, {
        Header: TAPi18n.__('view'),
        accessor: '_id',
        Cell: props => (
          <center>
            <a
              href={`/boards/standardProduct/view/${props.value}`}
              className="circular ui icon button teal tiny"
            >
              <i className="unhide icon"/>
            </a>
          </center>
        )
      }, {
        Header: TAPi18n.__('edit'),
        accessor: '_id',
        Cell: props => (
          <center>
            <a
              href={`/boards/standardProduct/edit/${props.value}`}
              className="circular ui icon button blue tiny"
            >
              <i className="edit icon"/>
            </a>
          </center>
        )
      }, {
        Header: TAPi18n.__('delete'),
        accessor: '_id',
        Cell: props => (
          <center>
            <button 
              className="circular ui icon button red tiny"
              onClick={ () => this.clickDelete(props.value) }>
              <i className="remove icon"/>
            </button>
          </center>
        )
      },
    ];
  }

  clickDelete(standardId) {
    Session.set('OPTIONS_MESSAGE', TAPi18n.__('deleted_standard'));
    $('#modalOptions').modal({
        closable: false,
        onDeny() {

        },
        onApprove() {
          Meteor.call('deleteStandard', standardId, (err, result) => {        
            if(err){
              Session.set('ERROR_MESSAGE',TAPi18n.__('error_removing_standard'));
              $('#modalError').modal('show');
            } else if (result) {
              Session.set('SUCCESS_MESSAGE',TAPi18n.__('standard_successfully_removed'));
              $('#modalSuccess').modal('show');
            }
          });
        }
    }).modal('show');
  }

  renderLoading() {
    return (
      <div className="ui active dimmer">
      <div className="ui text loader">{TAPi18n.__('loading')}</div>
      </div>
    );
  }

  renderNoData() {
    return (
      <div className="no-gembas noData-tell">
        <i className="warning circle icon ui centered huge" />
        <p className="title-noData">{TAPi18n.__('no_data_display')}</p>
      </div>
    )
  }

  render() {
    const standards = this.props.standards.map((standard, index) => {
      standard.index = index + 1;
      return standard;
    });

    const columns = this.getColumns();
        
    if (this.state.loading) {
      return this.renderLoading();
    }

    return (
      <div className="container">
        <div className="row">
          {this.state.loading ? this.renderLoading() : null}
          <div className="col-xs-6">
            <h3>
              <i className="cubes icon"></i>
              {TAPi18n.__("standards_by_products")}
            </h3>
          </div>
          <div className="col-sm-6 text-right">
            <a href="/boards/standardProduct/new">
              <button className="ui icon button teal" id="btnNewStandard">
                <i className="cubes icon"></i>  {TAPi18n.__("create_standard")}
              </button>
            </a>
          </div>
          <div className="col-xs-12">
            {standards.length > 0 ? <ReactTable
              data={standards}
              columns={columns}
              defaultPageSize={10}
              className="-striped -highlight"
            /> : this.renderNoData()}
          </div>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  const handles = [
    Meteor.subscribe('allStandards')
  ];

  const loading = handles.some(handle => !handle.ready());

  return {
    standards: StandardsProducts.find().fetch(),
    loading
  };
})(AdminStandard);
