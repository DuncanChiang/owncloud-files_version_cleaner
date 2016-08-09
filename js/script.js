(function ($, OC) {

$(document).ready(function() {
  FilesVersionCleaner = {};

  FilesVersionCleaner.view= {
    input: $('#files_version_cleaner_personal_input'),
    loading: $('#files_version_cleaner_loader'),
    msg: {"success": $('#files_version_cleaner_msg_success'), "fail": $('#files_version_cleaner_msg_fail')},
    input_historic: $('#files_version_cleaner_personal_input_historic'),
    loading_historic: $('#files_version_cleaner_loader_historic'),
    msg_historic: {"success": $('#files_version_cleaner_msg_success_historic'), "fail": $('#files_version_cleaner_msg_fail_historic')},
  };

  FilesVersionCleaner.setVersionNumber = function(){
    var self = $(this);
    var key = self.data('key');

    if(key === "versionNumber") {
      var loader = FilesVersionCleaner.view.loading.show();
      var msg = FilesVersionCleaner.view.msg;
    }
    else {
      var loader = FilesVersionCleaner.view.loading_historic.show();
      var msg = FilesVersionCleaner.view.msg_historic;
    }

    $.ajax({
      url: OC.generateUrl('apps/files_version_cleaner/set_number'),
      method: 'POST',
      data: {"versionNumber" : self.val(), "key" : key},
    })
    .then(function(data) {
      msg = data.success ? msg.success : msg.fail;
      msg.show();
      msg.delay(2000).fadeOut(1000);
    })
    .done(function(){
      loader.hide();
    });
  };

  FilesVersionCleaner.view.input.change(FilesVersionCleaner.setVersionNumber);
  FilesVersionCleaner.view.input_historic.change(FilesVersionCleaner.setVersionNumber);
});
})(jQuery, OC);
