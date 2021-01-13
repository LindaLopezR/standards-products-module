import React from 'react';
import { TAPi18n } from 'meteor/tap:i18n';
import { Router } from 'meteor/iron:router';
import { withTracker } from 'meteor/react-meteor-data';
import { StandardsProducts } from 'meteor/igoandtrack:standards-products-collection';

class ViewStandard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      standard: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: nextProps.loading,
      standard: nextProps.standard
    });
  }

  renderLoading() {
    return (
      <div className="ui active dimmer">
       <div className="ui text loader">{TAPi18n.__('loading')}</div>
      </div>
    );
  }

  render() {
    const { loading, standard } = this.state;

    if (loading || !standard) {
      return (
        <div className="container">
          {this.renderLoading()}
        </div>
      );
    }

    return (
      <div className="container">
        <div className="col-xs-12">
          <div className="pannell">
            <div className="cabeza-panel-azul">
              <h3>
                <i className="cubes icon"></i>
                {TAPi18n.__("standard")}
              </h3>
            </div>
            <div className="cuerpo-panel-azul view-location">
              <div className="row">
                <div className="col-sm-6">
                  <h3 className="titulo">{TAPi18n.__('name')}</h3>
                  <p className="parrafo-view">{standard.name}</p>
                </div>
                <div className="col-sm-6">
                  <h3 className="titulo">{TAPi18n.__('standard')}</h3>
                  <p className="parrafo-view">{standard.standard}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  const url = Router.current().originalUrl;
  const tokens = url.split('/');
  const standardId = tokens[ tokens.length -1 ];
  
  const handles = [
    Meteor.subscribe('standardById', standardId)
  ];

  const loading = handles.some(handle => !handle.ready());
  return {
    standard: StandardsProducts.findOne(standardId),
    loading
  }
})(ViewStandard);
