import React from 'react';
import { Icon, Row, Col} from 'antd';

class Chat extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return(
			<div>
				<div className="knowhow-chat-header">
						<Row className="widget-dialog widget-title-articles">
						<Col span={6} className="widget-title-arrow">
						<Icon
							type="arrow-left"
							style={{ fontSize: 24, 'marginTop': '10px'}}
							onClick={() => this.props.handleBackButton()}/>
						</Col>
						<Col span={18} className="widget-title-articles">
							<div className="knowhow-maintitle">Chat with us today!</div>
							<span className="widget-header-close-articles" onClick={() => this.props.handleToggleOpen()}>X</span>
						</Col>
						</Row>
				</div>
			</div>
			)
	}
}


export default Chat;