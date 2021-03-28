const fetch = require("node-fetch");

exports.handler = async (event) => {
    const res = await fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.1447,-86.8027&radius=1500&type=restaurant&key=AIzaSyApj79iUp3HB9Z8RGLAOrVc7WT45m12iDQ');
    const resJson = await res.json();
    const results = resJson.results;

    // TODO implement
    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({items: results}),
    };
    console.log(response);
    return response;
};
