'use server'

import { DynamoDBClient,
         GetItemCommand,
         PutItemCommand,
         UpdateItemCommand } from '@aws-sdk/client-dynamodb';

import { unmarshall } from '@aws-sdk/util-dynamodb';
import { validPassword, genPassword } from '../utils/password_utils.mjs';

const dynamodbclient = new DynamoDBClient(
    {
      region: 'us-west-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    });


export const CreateUser = async (username, password) => {

    let newSaltHash = genPassword(password);

    let params = {
        TableName: 'user_nextauth_tutorial',
        Item: {
            username: {S: username.toString()},
            hashstring: {S: newSaltHash.hashstring},
            salt: {S: newSaltHash.salt},
            rolename: {S: 'basic'}
        }
    }

    try {

        const putItemCommand = new PutItemCommand(params);
        let putitemResponse = await dynamodbclient.send(putItemCommand);

        if(putitemResponse && putitemResponse.$metadata.httpStatusCode === 200) {
            console.log('Item successfully added to Dynamo db')
            return true
        } else {
            console.log('Unexpected response from Dynamo db')
            return false
        }

    } catch (error) {
        console.error('Error creating new user in DynamoDB', error)
        throw error
    };

};


export const VerifyUser = async (username, password) => {

    let params = {
        TableName: 'user_nextauth_tutorial',
        Key: {
            username: {S: username.toString()}
        }
    };

    try {

        const getItemCommand = new GetItemCommand(params);
        let userdata = await dynamodbclient.send(getItemCommand);
        userdata = userdata?.Item ? unmarshall(userdata?.Item) : null;
        const isValid = validPassword(password, userdata.hashstring, userdata.salt)

        return isValid ? userdata : null;


    } catch (error) {
        console.error('Error fetching item from Dynamo db', error)
        throw error
    };


};



export const UpdateUser = async (username, rolename) => {

    let params = {
        TableName: 'user_nextauth_tutorial',
        Key: {
            username: {S: username.toString()}
        },
        UpdateExpression: 'SET rolename = :rolevalue',
        ExpressionAttributeValues: {
            ':rolevalue': {S: rolename.toString()}
        },
        ReturnValues: 'UPDATED_NEW'
    };

    try {

        const updateItemCommand = new UpdateItemCommand(params);
        let updateItemCommandResponse = await dynamodbclient.send(updateItemCommand);

        if(updateItemCommandResponse && updateItemCommandResponse.$metadata.httpStatusCode === 200) {
            console.log('Item successfully updated in Dynamo db')
            return true;
        } else {
            console.log('Unexpected response from Dynamo db')
            return false
        }

    } catch (error) {

        console.error('Error updating item from Dynamo db', error)
        throw error

    }

};