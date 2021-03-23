'use strict';
let allGalleryImg=[];
let arrKeyWord=[];
function Image(gallery) {
  this.image_url = gallery.image_url;
  this.title = gallery.title;
  this.description = gallery.description;
  this.keyword = gallery.keyword;
  this.horns = gallery.horns;
  allGalleryImg.push(this);

}

Image.prototype.renderAuto=function() {
  let templetClone=$('#img-temp').clone();
  templetClone.find('h2').text(this.title);
  templetClone.find('p').text(this.description);
  templetClone.find('img').attr('src',this.image_url);
  templetClone.attr('class',this.keyword);
  templetClone.removeAttr('id','img-temp').attr('src',this.title);
  $('main').append(templetClone);
};

Image.prototype.filtiration = function() {
  if(!arrKeyWord.includes(this.keyword)){
    arrKeyWord.push(this.keyword);
    const optionClone = $('#opt').clone();
    optionClone.removeAttr('id', 'opt');
    optionClone.removeAttr('value', 'default').attr('value', `${this.keyword}`);
    optionClone.text(this.keyword);
    $('#opt').after(optionClone);
  }
};
$('document').ready(function(){
  // console.log('JQuery is ready');
});

const ajaxSetting = {
  method: 'get',
  dataType: 'json',
};


$.ajax('data/page-1.json',ajaxSetting).then((data)=>{
  data.forEach(element =>{
    let newhorn= new Image(element);
    // console.log(newhorn);
    newhorn.renderAuto();
    newhorn.filtiration();
  });

});


$('#filteration').change(function() {
  console.log( this.value);
  allGalleryImg.forEach((element)=>{
    console.log(element.keyword);
    if (this.value === element.keyword){
      $(`.${element.keyword}`).show();
    }else if (element.keyword !== this.value){
      $(`.${element.keyword}`).hide();
    } else {
      $(`.${element.keyword}`).show();
    }
  });
});


