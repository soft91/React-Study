### Component-LifeCycle-Ex

초기 렌더링 : 기본 속성 설정 -> 기본 상태 설정 -> componentWillMount -> render -> componentDidMount<br />
상태 변경   : shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate<br />
속성 변경   : componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate<br />
언마운트    : componentWillUnmount

1. constructor(props)<br />
=> 맨 처음에 실행될 때 한 번만 호출됨.<br />
=> state 또는 객체 변수를 선언할 때 사용됨.<br />
=> 함수를 정의할 때는 항상 super() 함수를 가장 위에 호출해야 함.<br />
=> super 함수는 프로퍼티와 생명 주기 상태 등을 초기화 하는 중요한 과정을 포함함.<br />
<br />
2. render()<br />
=> 데이터가 변경되어 새 화면을 그려야 할 때 자동으로 호출 됨.<br />
=> Component에서 DOM을 그릴때 가장 중요한 함수<br />
<br />
3. static getDerviedStateFromProps(props, state)<br />
=> 정적 함수이기 때문에 this.props나 this.state등을 사용해 접근 할 수 없음.<br />
=> 각 값에 접근 하기 위해서는 인자로 전달된 props, state를 사용<br />
=> 주로 전달받은 프로퍼티로 state 값을 연동할 때 사용되며 return 값으로 state를 변경함.<br />
<br />
4. componentDidMount()<br />
=> render() 함수로 화면을 그린 이후에 호출되는 함수.<br />
=> 주로 비동기 처리를 할 때 여기서 많이 사용 됨.<br />

5. shouldComponentUpdate(nextProps, nextState)<br />
=> 프로퍼티를 변경하거나 setState() 함수를 호출하여 state를 변경할 때 '화면을 새로 출력해야 하는지 판단 함'<br />
=> 화면 변경을 위해서 이 함수를 사용하면 됨.<br />
=> 출력 여부 및 데이터 변화를 비교하는 작업에 많이 쓰이며, 리액트 성능에 가장 영향을 많이 주는 함수.<br />
<br />
6. getSnapshotBeforeUpdate(prevProps, prevState)<br />
=> 컴포넌트의 변경된 내용이 가상 화면에 완성된 이후 호출 됨.<br />
=> 화면에 실제로 출력되기 전에 호출됨.<br />
=> 주로 출력될 Element의 Size나 Scroll 위치 등의 DOM 정보에 접근할 때 사용 됨.<br />
<br />
7. componentDidUpdate(prevProps, prevState, snapshot)<br />
=> 컴포넌트가 실제 화면에 출력된 이후 호출되는 함수.<br />
=> 부모 컴포넌트로부터 전달된 prevProps나 prevState, getSnapshotBeforeUpdate 함수에서 return된 값을 인자로 받음.<br />
=> 주로 Scroll 위치를 옮기거나 커서를 이동시키는 DOM 정보 변경 시 사용.<br />
<br />
8. componentWillUnmount()<br />
=> 컴포넌트가 소멸되기 직전에 호출하는 함수.<br />
=> 주로 setInterval() 함수 사용 후 clearInterval() 함수 처리를 할 때 메모리 누수 발생을 막을 때 사용.<br />
