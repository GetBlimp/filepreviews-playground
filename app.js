/* global FilePreviews $ */

var preview = new FilePreviews({
  apiKey: '4lMWtFxdBUeKBerOWFa0M858OyNCAz'
});

$(function() {
  var jobId = null;
  var $fileInput = $('#url');
  var $jobInput = $('#jobId');
  var $generateForm = $('#generate');
  var $retrieveForm = $('#retrieve');
  var $resetButton = $('#reset');
  var $logContainer = $('#logContainer');

  function log(message) {
    $logContainer.prepend(
      new Date() + '<br><strong>' + message + '</strong><br><hr><br>');
  }


  function set(key, value) {
    window.localStorage.setItem(key, value);
  }

  function get(key) {
    return window.localStorage.getItem(key);
  }


  if (get('url')) {
    $fileInput.val(get('url'));
    log('Got "url" "' + get('url') + '" from localStorage');
  }

  if (get('jobId')) {
    $jobInput.val(get('jobId'));
    log('Got "jobId" "' + get('jobId') + '" from localStorage');
  }


  $resetButton.click(function(event) {
    event.preventDefault();

    set('url', '');
    set('jobId', '');

    $fileInput.val('');
    $jobInput.val('');
    $logContainer.html('');
  });

  $generateForm.submit(function(event) {
    event.preventDefault();

    set('url', $fileInput.val());

    preview.generate($fileInput.val(), function(err, result) {
      if (err) {
        log('Error: ' + JSON.stringify(err, null, 2));

      } else {
        $jobInput.val(result.id);
        set('jobId', result.id);
        log('jobId: ' + result.id);
        log('Status: ' + result.status);
      }

    });
  });

  $retrieveForm.submit(function(event) {
    event.preventDefault();

    if (!$jobInput.val()) {
      log('Error: Plase specify a jobId');

    } else {
      preview.retrieve($jobInput.val(), function(err, result) {
        if (err) {
          log('Error: ' + JSON.stringify(err, null, 2));

        } else {
          log('Result: ' + JSON.stringify(result, null, 2));
        }
      });
    }
  });

});
