###Component-LifeCycle-Ex

초기 렌더링 : 기본 속성 설정 -> 기본 상태 설정 -> componentWillMount -> redner -> componentDidMount
상태 변경   : shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate
속성 변경   : componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate
언마운트    : componentWillUnmount
