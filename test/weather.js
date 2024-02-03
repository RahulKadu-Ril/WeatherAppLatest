const axios = require('axios');
// const chai = require('chai');
const sinon = require('sinon');
// const request = require('supertest');
const app = require('../server'); 
const router = require('../router/router');
const {expect} = require('chai');
const supertest = require('supertest');


process.env.API_URI = 'https://api.openweathermap.org/data/2.5';
process.env.API_KEY = '8bae54c61fefc64ee5b000c24776418a';


describe('weather Api', ()=>{
    describe("GET /weather", ()=>{
        it("should get the current weather data", (done)=>{
            // const validCity = 'hyderabad';
            supertest(router)
                .get(`/weather`)
                .end((err,res)=>{
                    if(err) return done(err);
                done();
                })
        })
    })

    // describe('Example Test Suite', () => {
    //     it('should handle HTTP response', async () => {
    //       // Mock the axios.get method
    //       const axiosGetStub = sinon.stub(axios, 'get');
      
    //       // Sample data for the response
    //       const responseData = {
    //         "coord": {
    //           "lon": 78.4744,
    //           "lat": 17.3753
    //         },
    //         "weather": [
    //           {
    //             "id": 721,
    //             "main": "Haze",
    //             "description": "haze",
    //             "icon": "50d"
    //           }
    //         ],
    //         "base": "stations",
    //         "main": {
    //           "temp": 19.23,
    //           "feels_like": 19.22,
    //           "temp_min": 19.23,
    //           "temp_max": 28.73,
    //           "pressure": 1014,
    //           "humidity": 77
    //         },
    //         "visibility": 5000,
    //         "wind": {
    //           "speed": 2.57,
    //           "deg": 230
    //         },
    //         "clouds": {
    //           "all": 40
    //         },
    //         "dt": 1705578918,
    //         "sys": {
    //           "type": 1,
    //           "id": 9214,
    //           "country": "IN",
    //           "sunrise": 1705540766,
    //           "sunset": 1705581156
    //         },
    //         "timezone": 19800,
    //         "id": 1269843,
    //         "name": "Hyderabad",
    //         "cod": 200
    //       };
      
    //       // Resolve the axios promise with the sample data
    //       axiosGetStub.resolves({ status: 200, data: responseData });
      
    //       // Your test logic
    //       let city = "Hyderabad";
    //       const response = await axios.get(`${process.env.API_URI}/weather?q=${city}&units=metric&&appid=${process.env.API_KEY}`);
      
    //     //   // Assertions
    //     //   sinon.assert(response.status).to.equal(200);
    //     //   sinon.assert(response.data).to.deep.equal(responseData);
      
    //       // Restore the stub after the test
    //       axiosGetStub.restore();
    //     });
    //   });
})

