var document, moment, React;
var socket = io();

var CURRENT_USER = 'User' + Math.floor((Math.random() * 100) + 1);

var ChatStatus = React.createClass({
    render: function () {
        return (
            <span></span>
        );
    }
});

var MessageForm = React.createClass({
    getInitialState: function () {
        return {
            text: ''
        };
    },
    handleChange: function (e) {
        this.setState({
            text: e.target.value
        });
    },
    handleSubmit: function (e) {
        e.preventDefault();

        if (this.state.text && this.state.text.trim().length !== 0) {
            this.props.onMessageSend(this.state.text);
            this.setState({
                text: ''
            });
        }
    },
    render: function () {
        var message = this.state.text;
        return (
            <form onSubmit={ this.handleSubmit }>
                <input type="text" autoComplete="false" onChange={ this.handleChange } value={ message } />
                <input type="submit" value="Send" />
            </form>
        );
    }
});

var Message = React.createClass({
    propTypes: {
        message: React.PropTypes.object
    },
    render: function () {
        var datetime = moment.unix(this.props.message.sent).format();
        var time = moment.unix(this.props.message.sent).format('HH:mm:ss');

        return (
            <li><time className="timestamp" dateTime={ datetime }>{ time }</time> { this.props.message.payload }</li>
        );
    }
});

var MessageFeed = React.createClass({
    propTypes: {
        messages: React.PropTypes.array
    },
    render: function () {
        if (Object.keys(this.props.messages).length < 1) {
            return (
                <p>No messages.</p>
            );
        }

        var nodes = [];

        for (var key in this.props.messages) {
            nodes.push(<Message key={ key } message={this.props.messages[key]} />);
        }

        return (
            <ol>{ nodes }</ol>
        );
    }
});

var ChatApp = React.createClass({
    getInitialState: function () {
        socket.emit('connected', CURRENT_USER);
        socket.on('message', this.messageRecieve);

        return {
            messages: []
        };
    },
    messageRecieve: function (message) {
        var messages = this.state.messages;

        this.setState({
            messages: messages.concat([message])
        });
    },
    messageSend: function (data) {
        var messages = this.state.messages;
        var message = {
            sent: moment().unix(),
            user: CURRENT_USER,
            payload: data
        };

        socket.emit('message', message);

        this.setState({
            messages: messages.concat([message])
        });
    },
    render: function () {
        return (
            <div className="chatApp">
                <h1>SocketChat</h1>
                <MessageFeed messages={ this.state.messages } />
                <MessageForm onMessageSend={ this.messageSend } />
                <ChatStatus />
            </div>
        );
    }
});

React.render(
    <ChatApp />,
    document.getElementById('app')
);
