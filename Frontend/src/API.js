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

  
  var url = `https://ihr60cnqe1.execute-api.ap-south-1.amazonaws.com/dev/${path}`; // replace with your api.
  const request = await aws.sign(url, {
    method: method || 'PUT',
    headers: {
      'content-type': "application/json"
    },
    body: JSON.stringify(data)
  });
  return await (await fetch(request)).json();
}