const AWS = require('aws-sdk');
const DynamoDB = new AWS.DynamoDB.DocumentClient();

const sendResponse = (message, code) => {
    const response = {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ message })
    };
    return response;
};


const update_likes = (id, val) => {
    var params = {
        Key: {
            book_id: id,
        },
        UpdateExpression: `set likes = :value`,
        ExpressionAttributeValues: {
            ":value": val,
        },
        TableName: 'Book_Table'
    };
    return params;
};

const add_book = (item) => {
    var params = {
        Item: {
            ...item
        },
        TableName: 'Book_Table'
    };
    return params;
};


exports.handler = async(event) => {
    try {
        const { count, book_id } = JSON.parse(event.body);
        // console.log(event);

        if (event && event.resource === '/addbook') {
            const getItems = JSON.parse(event.body);
            await DynamoDB.put(add_book(getItems)).promise();
            return sendResponse('Updated', 200);
        };
        console.log('hihi');
        await DynamoDB.update(update_likes(book_id, count)).promise();
        return sendResponse('Updated', 200);
    }
    catch (e) {
        console.log(e);
    }
};
