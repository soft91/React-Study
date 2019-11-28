import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class User extends React.Component {
    UNSAFE_componentWillMount(){
        this.props.onMount(this.props.user);
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        if(this.props.user !== nextProps.user){
            this.props.onUpdate(nextProps.user);
        }
    }
    render(){
        const {category, repos, error} = this.props;
        const cardStyles = {
            width: 230,
            height: 200,
            marginRight: 10,
            marginBottom: 10,
            float: 'left'
        }
        return(
            <div>
                <h2>{
                    typeof category !== 'undefined'
                    ? `${category.name}의 리포지토리`
                    : ''
                }</h2>
                {(() => {
                    if(error){
                        return <p>오류가 발생하였습니다. 새로고침 해주세요.</p>;
                    }else if(typeof repos === 'undefined'){
                        return <p>데이터를 읽어 들이는중...</p>;
                    }else{
                        return repos.map((item, i) => (
                            <Card style = {cardStyles}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant = "h5" component = "h2">
                                            {item.name}
                                        </Typography>
                                        <Typography component = "p">{item.description}</Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size = "small" color = "primary" href = {item.url}>리포지토리로 이동하기</Button>
                                </CardActions>
                            </Card>
                        ))
                    }
                })()}
            </div>
        )
    }
}

User.propTypes = {
    user: PropTypes.string,
    onMount: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    category: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }),
    repos: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ),
    error: PropTypes.bool.isRequired
};

User.defaultProps = {
    user: 'apple'
}