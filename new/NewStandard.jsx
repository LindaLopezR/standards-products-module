import React from 'react';
import { TAPi18n } from 'meteor/tap:i18n';
import { Router } from 'meteor/iron:router';

class NewStandard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      standard: '',
      loading: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { name, standard } = this.state;

    if (!name) {
      Session.set('ERROR_MESSAGE', TAPi18n.__("enter_a_name"));
      $('#modalError').modal('show');
      return;
    }

    if (!standard) {
      Session.set('ERROR_MESSAGE', TAPi18n.__("error_standard"));
      $('#modalError').modal('show');
      return;
    }

    const data = {
      name,
      standard
    };

    this.setState({ loading: true });
  
    Meteor.call('createStandard', data, (error, respose) => {
      this.setState({ loading: false });
      if (error) {
        console.log('Error => ', error);
        Session.set('ERROR_MESSAGE', TAPi18n.__('error_saving_standard'));
        $('#modalError').modal('show');
      }

      if (respose) {
        console.log('Response => ', respose);
        Router.go('adminStandard');
      }
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
    return (
      <div className="container">
        {this.state.loading ? this.renderLoading() : null}
        <div className="col-xs-12">
          <div className="pannell">
            <div className="cabeza-panel-azul">
              <h3>
                <i className="cubes icon"></i>
                {TAPi18n.__("create_standard")}
              </h3>
            </div>
            <div className="cuerpo-panel-azul">
              <div className="row">
                <form
                  className="ui form"
                  id="formStandard"
                  onSubmit={this.handleSubmit.bind(this)}
                >
                  <div className="col-md-1"><p>&nbsp;</p></div>
                  <div className="col-md-10">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="field">
                          <label>{TAPi18n.__('name')}</label>
                          <input
                            type="text"
                            name="name"
                            onChange={(e) => this.handleChange(e)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="field">
                          <label>{TAPi18n.__('standard')}</label>
                          <input
                            type="number"
                            name="standard"
                            min={0}
                            onChange={(e) => this.handleChange(e)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row content-btns-rule">
                      <div className="col-md-12">
                        <hr className="linea-azul" />
                        <button className="ui submit button btnsave float-right" type="submit">
                          {TAPi18n.__("save")}
                        </button>
                        <button
                          className="ui button float-right"
                          id="btnCancel"
                          onClick={() => Router.go('adminStandard')}
                        >
                          {TAPi18n.__("cancel")} 
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-1"><p>&nbsp;</p></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewStandard;
