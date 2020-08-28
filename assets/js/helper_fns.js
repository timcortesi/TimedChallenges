window.app = {
    data:{},
    update:{},
}

var ractive = Ractive({
    target: '#main_target',
    template: templates.main,
    partials: templates,
    data: app.data
});

app.update = function(newdata) {
    if (typeof newdata !== 'undefined') {
        for (new_data_key in newdata) {
            app.data[new_data_key] = newdata[new_data_key]
        }
    } 
    ractive.set(app.data)
    for (data_key in app.data) {
        gform.collections.update(data_key, app.data[data_key])
    }
};

app.get = function(url,data,callback_success) {
    $.get(url,data,callback_success)
}

app.fetch = function(callback) {
    app.get('config.php',{},function(resp_data){
        app.update(resp_data);
        callback();
    })
}

app.findForm = function(form_name) {
    if (typeof window.forms[form_name] !== 'undefined') {
        return window.forms[form_name]
    } else {
        return null;
    }
}

app.render = function(template_name, data) {
    var local_ractive = Ractive({
        template: templates[template_name],
        partials: templates,
        data: data
    });
    return local_ractive.toHTML();
}

toastr.options = {
    "positionClass": "toast-bottom-right",
  }
app.alert = function(config) {
    if (typeof config === 'string') {
        toastr.info(config)
    } else {
        if (typeof config.status === 'undefined') {
            config.status = 'success'
        }
        if (typeof config.title === 'undefined') {
            config.title = ''
        }
        if (typeof config.content === 'undefined') {
            config.content = ''
        }
        toastr[config.status](config.title, config.content)
    }
}

$('#app-modal').on('hide.bs.modal', function (e) {
    if (typeof app.slider_interval !== 'undefined') {
        clearInterval(app.slider_interval);
    }
    app.data._modal.content = '';
    app.update();
})
app.modal = function(config,callback) {
    if (typeof config === 'string') {
        app.data._modal.title = '';
        app.data._modal.content = config;
    } else {
        app.data._modal = config;
        if (typeof app.data._modal.title === 'undefined') {
            app.data._modal.title = '';
        }
        if (typeof app.data._modal.content === 'undefined') {
            app.data._modal.content = '';
        }
    }
    app.update();
    $('#app-modal').modal('show')
    $('#app-modal').on('shown.bs.modal', function () {
        if (typeof callback !== 'undefined') {
            callback();
        }
    })
}

app.click = function(selector, callback) {
    $(document).on("click", selector, callback);
}

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})