import React from 'react';

class Logged extends React.Component {
    render() {
        return (
            <div>
                <p>Logged as {this.props.token}</p>
                <button onClick={this.props.unsetToken}>Log out</button>
            </div>
        )
    }
};

export default Logged;