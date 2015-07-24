/* global FilePreviews $ */

var preview = new FilePreviews({
  apiKey: '4lMWtFxdBUeKBerOWFa0M858OyNCAz'
});

$(function() {
  var jobId = null;
  var $fileInput = $('#url');
  var $jobInput = $('#jobId');
  var $submitButton = $('#generate');
  var $checkButton = $("#status");
  var $logContainer = $('#logContainer');

  function log(message) {
    $logContainer.prepend(
      new Date() + '<br><strong>' + message + '</strong><br><hr><br>');
  }

  function save(key, value) {
    window.localStorage.setItem(key, value);
  }

  function get(key) {
    return window.localStorage.getItem(key);
  }

  if (get('url')) {
    $fileInput.val(get('url'));
  }

  if (get('jobId')) {
    $jobInput.val(get('jobId'));
  }

  $submitButton.click(function(event) {
    event.preventDefault();

    save('url', $fileInput.val());

    preview.generate($fileInput.val(), function(err, result) {
      if (err) {
        log('Error: ' + err);

      } else {
        $jobInput.val(result.id);
        save('jobId', result.id);
        log('jobId: ' + result.id);
        log('Status: ' + result.status);
      }

    });
  });

  $checkButton.click(function(event) {
    event.preventDefault();

    if (!get('jobId')) {
      log('ERROR: First submit a preview then retrieve results');

    } else {
      preview.retrieve(get('jobId'), function(err, result) {
        if (err) {
          log('Error: ' + err);
        }

        log('Result: ' + JSON.stringify(result, null, 2));
      });
    }
  });

});
