const AppReducer = (state = {
    _articles: [],
    _articlesApproved: [],
    message: ''
}, action) => {
    console.log(action.actionType)
    switch (action.actionType) {
        case 'SUBMIT_ARTICLE':
            submitArticle(action.value,state);
            return state;
        case 'APPROVE_ARTICLE':
            approveArticle(action.value,state);
            return state;
        case 'REMOVE_ARTICLE':
            removeArticle(action.value,state);
            return state;
        default:
                return state;
    }

};

const submitArticle = (article,state) => {
    if(state._articles.length < 10)
    {
        state._articles.push(article)
        state.message = ''
    }
    else
    {
         state.message = 'You have exceeded the number of articles you can submit,You cannot add more articles'
    }
};


const approveArticle = (article, state) => {
    if (state._articlesApproved.length < 10) {
        if (article.length <= 10) {
            state._articlesApproved.push('[Approved]:' + article);
        }
        else {
            state._articlesApproved.push('[Rejected]:' + article);
        }
    }
};

const removeArticle = (key,state) => {
    state._articles.splice(key, 1);
    state._articlesApproved.splice(key, 1)
    state.message = ''
};


export default AppReducer;