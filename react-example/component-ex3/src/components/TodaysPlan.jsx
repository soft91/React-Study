import React from 'react';
import PropTypes from 'prop-types';

class TodaysPlan extends React.Component {
    render(){
        const name = this.props.name;
        const isCheck = this.props.isCheck ? '갑시다' : '안갈래요'; // Boolean Property 예제.

        return(
            <div className="message-container">
                {name}씨 놀러갑시당~
                갈까요?? 답 : {isCheck}
            </div>
        );
    }
}

// 자료형을 선언하여 사전에 타입 오류를 체크
TodaysPlan.propTypes = {
    name: PropTypes.string,
    isCheck: PropTypes.bool
}

// 기본 프로퍼티 설정
TodaysPlan.defaultProps = {
    name : 'Yoon'
}

export default TodaysPlan;