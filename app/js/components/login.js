/** @jsx React.DOM */

var React = require('react');
var Modal = require('./modal');
var Icon  = require('./icon');

var Login = module.exports = React.createClass({

  getInitialState: function() {
    return {
      loginOpen: false
    };
  },

  toggleLoginOpen: function() {
    this.setState({
      loginOpen: !this.state.loginOpen
    });
  },

  onLogin: function(event) {
    event.preventDefault();
    this.props.onLogin();
    this.setState({loginOpen: false});
  },

  render: function() {
    return (
      <div className='login-container'>
        <p className="login-status">
          {this.props.auth ?
            <div>
              <img className="gravatar" src="http://www.gravatar.com/avatar/279f5b4c5c781eb6aaa5c3f09c974acf.jpg?s=64&d=identicon" />
              <span>Hans-Kristian</span>
            </div>
            : <a onClick={this.toggleLoginOpen} className='login-button'><Icon name='lock'/>Logg inn</a>}
        </p>
        <div className={'login-form ' + (!this.state.loginOpen ? 'hidden' : '')}>
          <form onSubmit={this.onLogin}>
            <input placeholder='Username' />
            <input placeholder='Password' />
            <button type='submit'>Logg inn</button>
          </form>
        </div>
      </div>
    );
  }
});