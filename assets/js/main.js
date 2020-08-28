app.data.penalty = 0;
app.data.clue = -1;
app.data.current_clue = app.data.config.clues[app.data.clue];
app.interval = 0;
app.timeout_timer = 0;

var main = function() {
    var config_json = '';
    if (window.location.hash !== '') {
        config_json = decodeURI(decodeURI(window.location.hash.substr(1)));
    } else {
        var prompt_info = window.prompt('Enter Config')
        if (prompt_info !== null) {
            config_json = prompt_info
        }
    }
    if (config_json != '') {
        app.data.config = JSON.parse(config_json)
        localStorage.setItem("config",config_json)
    } else if (localStorage.getItem("config") !== null) {
        app.data.config = JSON.parse(localStorage.getItem("config"))
    }
    // Start Here
    app.data.mode = 'welcome';
    app.update();

    app.click('#begin-btn',function() {
        next();
        if (app.data.over === true) {
            app.data.mode = 'complete';
        } else {
            app.data.mode = 'clue';
        }
        app.update();
    })
    app.click('#over-btn',function() {
        window.alert(app.data.config.quit)
    })
    app.click('#penalty-btn',function() {
        app.data.mode = 'penalty';
        app.update();
    })
    app.click('#start-timer-btn',function() {
        app.data.mode = 'timer';
        app.update();
        app.qrScanner.start();
        app.timeout_timer = setTimeout(function(){ 
            if (typeof app.data.config.penalties[app.data.penalty] !== 'undefined') {
                app.data.current_penalty = app.data.config.penalties[app.data.penalty];
            } else {
                app.data.current_penalty = app.data.config.penalties_exceeded;
            }
            app.data.penalty++;
            app.data.mode = 'timeout';
            app.update();
            app.qrScanner.stop();
        }, app.data.current_clue.seconds*1000);
        app.data.seconds_left = app.data.current_clue.seconds;
        app.update();
        app.interval = setInterval(function() {
            app.data.seconds_left--;
            app.update()
            if (app.data.seconds_left <= 0) {
                app.data.seconds_left = 0;
                app.update();
                clearInterval(app.interval)
            }
        },1000)
    })
}
main();

var next = function() {
    app.data.clue++;
    if (app.data.clue > app.data.config.clues.length-1) {
        app.data.over = true;
    } else {
        app.data.current_clue = app.data.config.clues[app.data.clue];
    }
}

var init_scanner = function() {
    app.qrScanner = new QrScanner(document.getElementById('scanner-preview'), function(result){
        clearTimeout(app.timeout_timer);
        clearInterval(app.interval);
        app.data.scan = result;
        if (app.data.scan == app.data.current_clue.answer) {
            app.data.mode = 'correct';
        } else {
            app.data.mode = 'incorrect';
            if (typeof app.data.config.penalties[app.data.penalty] !== 'undefined') {
                app.data.current_penalty = app.data.config.penalties[app.data.penalty];
            } else {
                app.data.current_penalty = app.data.config.penalties_exceeded;
            }
            app.data.penalty++;
        }
        app.update();
        app.qrScanner.stop();
    });
}

init_scanner();