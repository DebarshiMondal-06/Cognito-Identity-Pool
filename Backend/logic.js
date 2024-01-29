const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb')

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocument.from(client)

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


exports.handler = async (event) => {
    console.log(event);
    try {
        const { count, book_id } = JSON.parse(event.body);
        if (event && event.resource === '/addbook') {
            const getItems = JSON.parse(event.body);
            await ddbDocClient.put(add_book(getItems));
            return sendResponse('Updated', 200);
        };
        await ddbDocClient.update(update_likes(book_id, count));
        return sendResponse('Updated', 200);
    }
    catch (e) {
        console.log(e);
    }
};
