import React, { Component } from 'react';

// ForceUpdate 함수를 통한 강제 state 변경(별로 추천하지 않음)
class ForceUpdate extends Component {
    constructor(props){
        super(props);

        this.loading = true;
        this.formData = 'no data';

        this.handledata = this.handledata.bind(this);
        setTimeout(this.handledata, 400);
    }

    handledata(){
        const data = 'new Data';

        this.loading = false;
        this.formData = data + this.formData;
        this.forceUpdate();
    }
    render() {
        return (
            <div>
                <span>로딩중 : {String(this.loading)}</span>
                <span>결과   : {this.formData}</span>
            </div>
        );
    }
}

export default ForceUpdate;