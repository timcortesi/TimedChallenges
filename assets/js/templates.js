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
    {{#mode === 'over'}}
        {{>over}}
    {{/}}


    {{>_modal}}

    <center><video style="{{#mode!=='timer'}}display:none;{{/}}max-width:100%;max-height:300px;" id="scanner-preview"></video></center>
`,
welcome:
`
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Welcome {{config.user}}</h3>
        </div>
        <div class="panel-body">
            <p>{{config.overview}}</p>
            <div class="btn btn-primary pull-right" id="begin-btn">Begin</div>
        </div>
    </div>
`,
clue:
`
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Clue</h3>
        </div>
        <div class="panel-body">
            <p>{{current_clue.clue}}</p>
            <div class="btn btn-primary pull-right" id="start-timer-btn">Start</div>
        </div>
        <div class="panel-footer">
            <div class="badge">You have {{current_clue.seconds}} seconds</div>
        </div>
    </div>
`,
timer:
`
    <center><h1>You have {{seconds_left}} seconds left!</h1></center>
`,
timeout:
`
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Out of Time</h3>
        </div>
        <div class="panel-body">
            <p>{{current_clue.timeout}}</p>
            <p>{{current_penalty}}</p>
            <div class="btn btn-danger" id="over-btn">Quit</div>
            <div class="btn btn-primary pull-right" id="begin-btn">Next</div>
        </div>
    </div>
`,
correct:
`
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Correct</h3>
        </div>
        <div class="panel-body">
            <p>{{current_clue.correct}}</p>
            <div class="btn btn-danger" id="over-btn">Quit</div>
            <div class="btn btn-primary pull-right" id="begin-btn">Next</div>
        </div>
    </div>
`,
incorrect:
`
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Incorrect</h3>
        </div>
        <div class="panel-body">
            <p>{{current_clue.incorrect}}</p>
            <p>{{current_penalty}}</p>
            <div class="btn btn-danger" id="over-btn">Quit</div>
            <div class="btn btn-primary pull-right" id="begin-btn">Next</div>
        </div>
    </div>
`,
over:
`
    It's over!
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