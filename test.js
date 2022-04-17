const axios = require('axios')
const API_URL = 'http://localhost:3401'
axios({
    url: API_URL + '/api/groups',
    method: 'GET',
    headers: {
        "X-Token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzRlZmI0NzYtNDAxYS00ZmU4LThmMzgtOWU5ZmM0ZTlmNWFiIiwiaWF0IjoxNjUwMjA1MjI3fQ.LWG49-JEe-OzQZQhTjhQs0ZsGRlnAy0Z3SR16-hEQng'
    }
}).then(x => {
    console.log(x.headers)
})