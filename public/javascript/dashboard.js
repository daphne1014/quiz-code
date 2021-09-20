// will need to change the data and data sets so that it gets it from db
const data = {
    labels: ['January',
    'February',
    'March',
    'April',
    'May',
    'June'],
    datasets: [{
        label: 'My test results',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {}
};

const chart = new Chart(
    document.getElementById('myChart'),
    config
);