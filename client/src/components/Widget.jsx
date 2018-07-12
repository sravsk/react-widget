import React from 'react';

class Widget extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			opened : false
		}
	}

	render() {
		return (
				<div className="docked-widget">
					 <div className="widget-dialog">
			          <div className="widget-title">
			            Title
			          </div>
			          <div className="widget-body">
			            Body
			          </div>
			          <div className="widget-footer">
			            Footer
			          </div>
			        </div>
            	</div>

			)
	}

}

export default Widget;