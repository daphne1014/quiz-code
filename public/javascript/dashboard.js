// make fetch request to /api/users/:id
// include scores in results - done
// format your data for chart.js

// fetch('/api/users/')
const user_id = document.querySelector('body').getAttribute('data-user_id');

const getData = fetch(`/api/users/${user_id}`)
    .then(res => res.json())
    .then(res => {

        let scoresArray = res.scores;

        let labels = scoresArray.map((score, index) => 'Attempt: ' + (index + 1));
        let scores = scoresArray.map(score => score.score);
        console.table({ labels, scores });

        const data = {
            labels: labels,
            datasets: [{
                label: 'My test results',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: scores,
            }]
        };

        const config = {
            type: 'line',
            data: data,
            options: {}
        };

        const chart = new Chart(
            document.getElementById('myChart'),
            config
        );
    });

    

// console.log(scores)// 


// will need to change the data and data sets so that it gets it from db
