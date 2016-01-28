var exports = module.exports = {};


exports.defaultFields = function() {
    return {
        'nsider_id': 1,
        'title': 1,
        'published_date': 1,
        'spill': 1,
        'style': 1,
        'feature': 1,
        'feature_blurb': 1,
        'feature_img': 1,
        'linked_type': 1,
        'linked_id': 1,
        'finished': 1,
        'date_created': 1,
        'date_updated': 1,
        'last_modified_by': 1,
        'deleted': 1,
        'pages': 1,
        'authors': 1
    };
};


exports.defaultFilter = function() {
    return {
        'finished': 'Y',
        'published_date': {
            '$ne': null
        }
    };
};


exports.defaultSort = function() {
    return {
        'published_date': -1
    };
};
