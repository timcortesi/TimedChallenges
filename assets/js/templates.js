var templates = {
main:
`
    {{#mode === 'welcome'}}
        {{>welcome}}
    {{/}}
    {{#mode === 'clue'}}
        {{>clue}}
    {{/}}
    {{#mode === 'timer'}}
        {{>timer}}
    {{/}}
    {{#mode === 'timeout'}}
        {{>timeout}}
    {{/}}
    {{#mode === 'correct'}}
        {{>correct}}
    {{/}}
    {{#mode === 'incorrect'}}
        {{>incorrect}}
    {{/}}
    {{#mode === 'penalty'}}
        {{>penalty}}
    {{/}}
    {{#mode === 'complete'}}
        {{>complete}}
    {{/}}


    {{>_modal}}

    <center><video style="{{#mode!=='timer'}}display:none;{{/}}max-width:100%;max-height:400px;" id="scanner-preview"></video></center>
`,
welcome:
`
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">{{#config.headers.welcome}}{{config.headers.welcome}}{{/}}{{^config.headers.welcome}}Welcome{{/}}</h3>
        </div>
        <div class="panel-body">
            <p>{{{config.overview}}}</p>
            <div class="btn btn-primary pull-right" id="begin-btn">{{#config.buttons.begin}}{{config.buttons.begin}}{{/}}{{^config.buttons.begin}}Begin{{/}}</div>
        </div>
    </div>
`,
clue:
`
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">{{#config.headers.clue}}{{config.headers.clue}}{{/}}{{^config.headers.clue}}Clue{{/}}</h3>
        </div>
        <div class="panel-body">
        {{#config.clue}}{{config.clue}}{{/}}{{^config.clue}}Get ready for the next clue{{/}}  
            <div class="btn btn-primary pull-right" id="start-timer-btn">{{#config.buttons.start}}{{config.buttons.start}}{{/}}{{^config.buttons.start}}Start{{/}}</div>
        </div>
        <div class="panel-footer">
            <div class="badge">You will have {{current_clue.seconds}} seconds for the next assignment</div>
        </div>
    </div>
`,
timer:
`
    <center><h1>You have {{seconds_left}} seconds left!</h1></center>
    <div class="panel panel-default">
        <div class="panel-body">
            {{{current_clue.clue}}}
        </div>
    </div>
`,
timeout:
`
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">{{#config.headers.timeout}}{{config.headers.timeout}}{{/}}{{^config.headers.timeout}}Out of Time{{/}}</h3>
        </div>
        <div class="panel-body">
            <p>{{{current_clue.timeout}}}</p>
            <div class="btn btn-danger" id="over-btn">{{#config.buttons.quit}}{{config.buttons.quit}}{{/}}{{^config.buttons.quit}}Quit{{/}}</div>
            <div class="btn btn-primary pull-right" id="penalty-btn">Take Penalty</div>
        </div>
    </div>
`,
correct:
`
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">{{#config.headers.correct}}{{config.headers.correct}}{{/}}{{^config.headers.correct}}Correct{{/}}</h3>
        </div>
        <div class="panel-body">
            <p>{{{current_clue.correct}}}</p>
            <div class="btn btn-primary pull-right" id="begin-btn">Next</div>
        </div>
    </div>
`,
incorrect:
`
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">{{#config.headers.incorrect}}{{config.headers.incorrect}}{{/}}{{^config.headers.incorrect}}Incorrect{{/}}</h3>
        </div>
        <div class="panel-body">
            <p>{{{current_clue.incorrect}}}</p>
            <div class="btn btn-danger" id="over-btn">{{#config.buttons.quit}}{{config.buttons.quit}}{{/}}{{^config.buttons.quit}}Quit{{/}}</div>
            <div class="btn btn-primary pull-right" id="penalty-btn">Take Penalty</div>
        </div>
    </div>
`,
penalty:
`
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">{{#config.headers.penalty}}{{config.headers.penalty}}{{/}}{{^config.headers.penalty}}Penalty{{/}}</h3>
        </div>
        <div class="panel-body">
            <p>{{{current_penalty}}}</p>
            <div class="btn btn-primary pull-right" id="begin-btn">Next</div>
        </div>
    </div>
`,
complete:
`
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">{{#config.headers.complete}}{{config.headers.complete}}{{/}}{{^config.headers.complete}}You Succeeded!{{/}}</h3>
        </div>
        <div class="panel-body">
            <p>{{{config.complete}}}</p>
        </div>
    </div>
`,
_modal:
`
<!-- Modal -->
<div class="modal fade" id="app-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{{_modal.title}}}</h4>
        </div>
        <div class="modal-body">{{{_modal.content}}}</div>
        <div class="modal-footer">
            {{{_modal.footer}}}
            {{#_modal.close}}<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>{{/_modal.close}}
            {{#_modal.refresh}}<button type="button" class="btn btn-default btn-refresh">Refresh</button>{{/_modal.refresh}}
        </div>
    </div>
    </div>
</div>
`
};