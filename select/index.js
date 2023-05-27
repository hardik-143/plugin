$(document).ready(function () {
    $('#city').select({
        search: true,
        data:[
            {value: '1', text: 'New York'},
            {value: '2', text: 'Los Angeles'},
            {value: '3', text: 'Chicago'},
            {value: '4', text: 'Houston'},
            {value: '5', text: 'Philadelphia'},
        ]
    });
})