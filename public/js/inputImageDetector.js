function previewFile() {
    var preview = document.getElementById('input-image-preview');
    var file    = document.getElementById('input-image').files[0];
    var reader  = new FileReader();
  
    reader.onloadend = function () {
      preview.src = reader.result;
    }
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  }