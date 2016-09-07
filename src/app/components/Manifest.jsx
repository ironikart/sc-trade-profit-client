import React from 'react';
import Cargo from './Cargo.jsx';
import Ship from './Ship.jsx';
import Ports from './Ports.jsx';
import Crew from './Crew.jsx';

class Manifest extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="manifest">
                <Ship {...this.props} />
                <Ports {...this.props} />
                <Crew {...this.props} />
                <Cargo {...this.props} />
            </div>
        );
    }
}

export default Manifest;