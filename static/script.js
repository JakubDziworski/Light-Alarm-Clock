$(document).ready(() => {
    new Picker(document.querySelector('#startAtInput'), {
        format: 'HH:mm',
        inline:true,
        rows: 3
    });
    new Picker(document.querySelector('#fadeInMinutesInput'), {
        format: 'SS',
        inline:true,
        rows: 3
    });
});

function saveConfig() {
    const hourAndMinute = $('#startAtInput').val().split(":");
    const fadeInMinutes = $('#fadeInMinutesInput').val();
    const resultSpan = $('#saveConfigResultSpan');
    const hour = parseInt(hourAndMinute[0], 10);
    const minute = parseInt(hourAndMinute[1], 10);
    const fade = parseInt(fadeInMinutes, 10);
    const body = {
        startAtHour: hour,
        startAtMinute: minute,
        fadeInMinutes: fade
    };
    resultSpan.text("Saving...");
    $.ajax("/set-up", {
        data: JSON.stringify(body),
        contentType: 'application/json',
        type: 'POST'
    }).done(() => {
        resultSpan.text("Done!");
        resultSpan.addClass('label-success');
    }).fail((xhr) => {
        resultSpan.text("Fail! " + xhr.responseText);
        resultSpan.addClass('label-danger');
    })
}