import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { FormattedExtensionData, ScreenshotImage, ScreenshotVideo } from './types';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}

const defaults = {
  id: 'akeglhepbonjicpgbjialkmnpdnpbeid',
  gl: 'US',
  hl: 'en_US'
};

export const handler: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {

  if (event.httpMethod === 'GET') {
    getExtensionData(event.queryStringParameters).then(result => {
      console.log('Success:', result);
      const response = { 
        headers: headers,
        statusCode: result.status,
        body: result.body
      };
      cb(null, response);
    }).catch(err => {
      console.log('Error:', err);
      const response = { 
        headers: headers,
        statusCode: err.status,
        body: err.body  
      };
      cb(null, response);
    });
  } else {
    cb(null, {
      statusCode: 403,
      headers: headers,
      body: 'Only GET is supported'
    });
  }
}

/*
* Get data by making a http call to google
*/
function getExtensionData(data = {}): Promise<{ status: number, body: string }> {
  return new Promise((resolve, reject) => {
      if (!data || !data['id']) {
          reject({ status: 401, body: JSON.stringify({ message: 'ID is missing' }) });
      }
      
      const params = Object.assign({}, defaults, data);
      console.log('params', params)
      const url = `https://chrome.google.com/webstore/ajax/detail?hl=${params.hl}
          &gl=${params.gl}&pv=20180301&mce=atf%2Cpii%2Crtr%2Crlb%2Cgtc%2Chcn%2Csv
          p%2Cwtd%2Cnrp%2Chap%2Cnma%2Cc3d%2Cncr%2Cctm%2Cac%2Chot%2Ceuf%2Cmac%2Cfcf
          %2Crma&id=${params.id}&container=CHROME&rt=j`;
      const config: AxiosRequestConfig = {
        method: 'post',
        url,
        data: '',
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
      }
      return axios(config).then(res => {
          const raw = JSON.parse(res.data.substring(res.data.indexOf('['), res.data.lastIndexOf(']')+1))[0][1][1];
          const formatted = getFormattedExtensionData(raw);
          resolve({ status: 200, body: JSON.stringify({ raw, formatted }) });
      }).catch(err => {
        console.log('Error:', err);
        reject({ status: 404,  body: JSON.stringify({ message: 'ID Not Found' }) });
      });
  });
}


/*
* Format the raw response from google to a more human readable form
*/
function getFormattedExtensionData(raw: Object): FormattedExtensionData {
  const baseUrl = 'https://chrome.google.com';
  return {
      id: raw[0][0],
      name: raw[0][1],
      developer_display_name: raw[0][2],
      icon_small: raw[0][3],
      promotional_tile_small: raw[0][4],
      promotional_tile_large: raw[0][5],
      description: raw[0][6],
      category: raw[0][10],
      permalink: raw[0][11],
      avg_rating: raw[0][12],
      ratings: raw[0][22],
      weekly_users: raw[4],
      icon_large: raw[0][25],
      price: raw[0][30],
      websites: raw[0][35],
      version: raw[6],
      developer_details: raw[35],
      last_updated: raw[7],
      size: raw[25],
      support_url: baseUrl + raw[22],
      reviews_url: baseUrl + raw[38],
      schema: raw[21],
      languages: raw[8],
      type: raw[10],
      website_link: raw[3],
      detailed_description: raw[1],
      screenshots: getScreenshots(raw[11]),
      reviews: raw[0][58],
      owner: raw[0][81],
  };
}

function getScreenshots(data: any[]): Array<ScreenshotImage|ScreenshotVideo> {
  return data.map(screenshot => {
    const screenshots = screenshot.filter(val => (typeof val === 'string' && val.substr(0,4) === 'http'));
    if (screenshots[0].substr(0, 19) === 'https://i.ytimg.com') {
      return {
        type: "video",
        thumbnail: screenshots[0],
        url: screenshots[1]
      }
    } else {
      return {
        type: 'image',
        image_large: screenshots[0],
        image_small: screenshots[1]
      }
    }
  });
}