# Chrome Store API
An unofficial api to get chrome extension data built using typescript and serverless framework for aws.

## How to use

Make a GET rquest to api with extension id to 
https://2nr40ykqbl.execute-api.us-east-1.amazonaws.com/dev/extension?id={EXTENSION_ID}

### For Example-

Chrome Extension Url - https://chrome.google.com/webstore/detail/just-monika-screen-saver/akeglhepbonjicpgbjialkmnpdnpbeid

make a GET request to - 
https://2nr40ykqbl.execute-api.us-east-1.amazonaws.com/dev/extension?id=akeglhepbonjicpgbjialkmnpdnpbeid

## Response

Response will be JSON object

### If Id is missing, 
```js
{
    message: 'ID is missing'
}
```
### If id is not available on chrome store
```js
{
    message: 'ID is missing'
}
```
### If request is successful
```js
{
    raw: ..., // actual response returned from underlying request to chrome store
    formatted: ... // response formatted to human readable format of type FormattedExtensionData
}
```

## Types

### FormattedExtensionData
```js
{
    id: string,
    name: string,
    developer_display_name: string,
    icon_small: string,
    promotional_tile_small: string,
    promotional_tile_large: string,
    description: string,
    category: string,
    permalink: string,
    avg_rating: number,
    ratings: number,
    weekly_users: string,
    icon_large: string,
    price: string,
    websites: string,
    version: string,
    developer_details: [string|null, string|null, string|null],
    last_updated: string,
    size: string,
    support_url: string,
    reviews_url: string,
    schema: string,
    languages: string[],
    type: string,
    website_link: string,
    detailed_description: string,
    screenshots: Array<ScreenshotImage|ScreenshotVideo>,
    reviews: string,
    owner: string,
}
```

### ScreenshotImage
```js
{
    type: string,
    image_large: string,
    image_small: string
}
```

### ScreenshotVideo
```js
{
    type: string,
    thumbnail: string,
    url: string
}
```

For Example, the above rquest will return
```js
{
    "raw": [...],
    "formatted": {
        "id": "hppnbppdiehgcoimkhlanppgnpgoaiak",
        "name": "Quora Login Popup Blocker",
        "developer_display_name": "kronosdevstudio",
        "icon_small": "https://lh3.googleusercontent.com/rWlCN83AkAHr83en0KzRNHmHxZG2rQi0nYIwK5mi2NyziUfP12mWFKsj2uKxSsn8r3J_rD-mEg=w26-h26-e365",
        "promotional_tile_small": "https://lh3.googleusercontent.com/K4e7hEpfhcDTAiq8-WR7mQqNxf1aTqaoXJn6hQn84SX3WbHKE5aV7KN94osB_ZeCJmclKpd3Lg=w220-h140-e365",
        "promotional_tile_large": null,
        "description": "This extension removes the login popup from Quora.",
        "category": "Productivity",
        "permalink": "http://chrome.google.com/extensions/permalink?id=hppnbppdiehgcoimkhlanppgnpgoaiak",
        "avg_rating": 0,
        "ratings": 0,
        "weekly_users": "0",
        "icon_large": "https://lh3.googleusercontent.com/rWlCN83AkAHr83en0KzRNHmHxZG2rQi0nYIwK5mi2NyziUfP12mWFKsj2uKxSsn8r3J_rD-mEg=w128-h128-e365",
        "price": "Free",
        "websites": "kronosdevstudio.com",
        "version": "0.2",
        "developer_details": [
            "kronosdevstudio@gmail.com",
            null,
            "http://justmonika.ml/just-monika-screen-saver.html"
        ],
        "last_updated": "May 20, 2018",
        "size": "11.48KiB",
        "support_url": "https://chrome.google.com/webstore/detail/quora-login-popup-blocker/hppnbppdiehgcoimkhlanppgnpgoaiak/support?hl=en&gl=US",
        "reviews_url": "https://chrome.google.com/webstore/detail/quora-login-popup-blocker/hppnbppdiehgcoimkhlanppgnpgoaiak/reviews?hl=en&gl=US",
        "schema": "http://schema.org/OtherApplication",
        "languages": [
            "English"
        ],
        "type": "Extension",
        "website_link": "https://kronosdevstudio.com/extensions/quora-login-popup-blocker.html",
        "detailed_description": "This extension removes those annoying login popup from Quora.\n\nFor more info - \nhttps://kronosdevstudio.com/extensions/quora-login-popup-blocker.html\n\nFirefox - \nhttps://addons.mozilla.org/en-US/firefox/addon/quora-login-popup-blocker\n\nDeveloped By-\n\nTwitter - https://twitter.com/kronosdevstudio\nGoogle+ - https://plus.google.com/+kronosdevelopmentstudio\nFacebook - https://www.facebook.com/kronosdevstudio",
        "screenshots": [
            {
                "type": "image",
                "image_large": "https://lh3.googleusercontent.com/F_2JTgGoxLqDLOR3UJaSERaQ0a2kn7pgUTGwB5aZCLow3kIt7gb0bDlEGk2IipCrD9V_qNQysg=w640-h400-e365",
                "image_small": "https://lh3.googleusercontent.com/F_2JTgGoxLqDLOR3UJaSERaQ0a2kn7pgUTGwB5aZCLow3kIt7gb0bDlEGk2IipCrD9V_qNQysg=w120-h90-e365"
            },
            {
                "type": "video",
                "thumbnail": "https://i.ytimg.com/vi/jplfhtZaeLY/default.jpg",
                "url": "https://www.youtube.com/embed/jplfhtZaeLY?rel=0&wmode=opaque&enablejsapi=1"
            }
        ],
        "reviews": "38",
        "owner": "http://kronosdevstudio.com"
    }
}
```

### LICENSE
MIT

# NOTE - This is an UnOfficial API and is not endorsed or supported by google in any form.