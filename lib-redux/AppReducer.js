const AppReducer = (state = {
    articles: [],
    articlesApproved: [],
    message: ''
}, action) => {
    console.log(action.actionType)
    let newState = {};

    switch (action.actionType) {
        case 'SUBMIT_ARTICLE':
            newState = Object.assign({},state , submitArticle(action.value,state))
            break;
        case 'APPROVE_ARTICLE':
            newState = Object.assign({},state , approveArticle(action.value,state))           
            break;
        case 'REMOVE_ARTICLE':
            newState = Object.assign({},state , removeArticle(action.value,state))             
            break;
        default:
            return state;
    }

    return newState;
};


const submitArticle = (article, state) => {
    let _articles = [];
    let _message = '';
    if (state.articles.length < 5) {
        _articles = [...state.articles, article];
        _message = '';
    }
    else {
        _articles = state.articles;
        _message = 'You have exceeded the number of articles you can submit,You cannot add more articles'
    }
    return { articles: _articles, message: _message }
};


const approveArticle = (article, state) => {
    let _articleStatus = (article.length <= 10) ? '[Approved]' : '[Rejected]';
    let _articlesApproved = [];

    if (state.articlesApproved.length < 5) {
        _articlesApproved = [...state.articlesApproved, article + _articleStatus];
    }else   
    {
        _articlesApproved = state.articlesApproved;
    }

    return { articlesApproved: _articlesApproved }
};

const removeArticle = (key, state) => {
    let _articlesApproved = state.articlesApproved.slice().filter((item, index) => (index !== key));
    let _articles = state.articles.slice().filter((item, index) => (index !== key));
    return { articles: _articles, articlesApproved: _articlesApproved, message: '' }
};


export default AppReducer;