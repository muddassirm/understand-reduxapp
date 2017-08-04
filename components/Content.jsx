import React from 'react'
import Button from './Button.jsx';
import List from './List.jsx'
//import AppActions from '../lib/AppActions';
//import AppStore from '../lib/AppStore'
import AppReduxStore from '../lib-redux/AppReduxStore'

class Content extends React.Component {

    constructor(props) {
        super(props);
        //this.state = { articles: [], articlesApproved: [], message: '' };
        this.state = AppReduxStore.getState(); //get initial state
        this.handleClick = this.handleClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);             
  
    }

    handleRemoveClick(key) {
        AppReduxStore.dispatch({
            actionType: 'REMOVE_ARTICLE',
            value: key
        });     
    }

    handleClick() {
        if (this.refs.simpletext.value.length > 0) {
            AppReduxStore.dispatch({
                actionType: 'SUBMIT_ARTICLE',
                value: this.refs.simpletext.value
            });

            AppReduxStore.dispatch({
               actionType: 'APPROVE_ARTICLE',
                value: this.refs.simpletext.value
            });

            this.refs.simpletext.value = ''
        }        
    }

    componentDidMount() {
        //AppStore.addChangeListener('STORE_SUBMIT_ARTICLE', this.onSubmit);
        //AppStore.addChangeListener('STORE_REMOVE_ARTICLE', this.onRemove);
        this.unsubscribe = AppReduxStore.subscribe(() =>
            this.setState(AppReduxStore.getState())
        );
    }

    onRemove() {
        //this.listArticles()
    }


    onSubmit() {
         //this.listArticles()
    }

    listArticles()
    {
        let usermessage = ''

        if (this.state.articles.length > 9) {
            usermessage = 'You have exceeded the number of articles you can submit,You cannot add more articles'
        }

        this.setState(AppReduxStore.getState());
    }

    componentWillUnmount() {
        //AppStore.removeChangeListener('STORE_SUBMIT_ARTICLE', this.onChange)
        //AppStore.removeChangeListener('STORE_REMOVE_ARTICLE', this.onRemove)
        this.unsubscribe();
    }

    render() {
        var simpleContent =
            <div>
                {this.props.text}
                <br />
                Enter text : <input type="text" ref="simpletext"/>
                <Button handleClick={this.handleClick} text="SUBMIT" />
                <br />
                <List articles={AppReduxStore.getState().articles} listHeader="Submitted Articles" handleRemoveClick={this.handleRemoveClick} />
                {this.state.message}
                <List articles={AppReduxStore.getState().articlesApproved} listHeader="Approval Status" handleRemoveClick={this.handleRemoveClick} />
            </div>;

        return simpleContent;
    }

}

export default Content;