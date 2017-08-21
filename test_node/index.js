let async = require('async'),
    express = require('express'),
    app = express();

app.get('/html', function (req, res) {
    addTask('html');
    res.end('Html requested.');
});

app.get('/pdf', function (req, res) {
    addTask('pdf');
    res.end('pdf requested.');
});


app.listen(3000);

let queue = async.queue(function(task, done) {
    worker[task.format](done);
}, 1);

let worker = {
    pdf: (done) => {
        setTimeout(() => {
            done();
        }, 5000);
    },
    html: (done) => {
        setTimeout(() => {
            done();
        }, 1000);
    }
};

function addTask(format) {
    queue.push({format: format}, () => {
        console.log(`Finished processing ${format}`);
    });
}

for (let i = 0; i < 10; i++) {
    let val = Math.random() >= 0.5 ? 'pdf' : 'html';
    console.log('added task ' + val);
    addTask(val);
}