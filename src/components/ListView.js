import React, {Component} from 'react';

class ListView extends Component {
    static defaultProps = {
        data: []
    };

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                List View
            </div>
        );
    }
}

export default ListView;