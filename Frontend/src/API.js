import { AwsClient } from "aws4fetch";


export const sendRequest = async (data, path, method) => {
  const values = localStorage.getItem('tokens');
  const { accessKey, sessionToken, secretAccessKey } = JSON.parse(values) || {};

  const aws = new AwsClient({
    service: 'execute-api',
    region: 'ap-south-1',
    accessKeyId: accessKey,
    secretAccessKey,
    sessionToken
  });

  
  var url = `${process.env.REACT_APP_API_URL}/${path}`; // replace with your api.
  const request = await aws.sign(url, {
    method: method || 'PUT',
    headers: {
      'content-type': "application/json"
    },
    body: JSON.stringify(data)
  });
  return await (await fetch(request)).json();
}