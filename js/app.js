'use strict';

let allGalleryImg;
function Image(gallery) {
  this.image_url = gallery.image_url;
  this.title = gallery.title;
  this.description = gallery.description;
  this.keyword = gallery.keyword;
  this.horns = gallery.horns;
  allGalleryImg.push(this);
}
allGalleryImg=[];

Image.prototype.renderAuto=function() {
  let templetClone=$('#img-temp').clone();
  templetClone.find('h2').text(this.title);
  templetClone.find('p').text(this.description);
  templetClone.find('img').attr('src',this.image_url);
  templetClone.removeAttr('id','img-temp').attr('src',this.title);
  $('main').append(templetClone);
};

$('document').ready(function(){
  console.log('JQuery is ready');
});

const ajaxSetting = {
  method: 'get',
  dataType: 'json',
};

let arrOption=[];
$.ajax('../data/page-1.json',ajaxSetting).then((data)=>{
  data.forEach(element =>{
    let newhorn= new Image(element);
    console.log(newhorn);
    newhorn.renderAuto();
    newhorn.renderFilter();
  });
  for (let i = 0; i < data.length; i++) {
    arrOption.push(data[i].keyword);
  } var unique = arrOption.filter(function(itm, i, a) {
    return i === arrOption.indexOf(itm);
  });
  for (let i=0; i<unique.length; i++) {
    var options = $(`<option value=""></option>`).text(unique[i]);
    $(`#filteration`).append(options);
  }
});

Image.prototype.renderFilter=function(){
  $('#filteration').on('change', function(event) {
    var chosenName = $('#filteration').find(':selected').text();
    console.log( chosenName);
    function remitem() {
      for(let i=0; i<allGalleryImg.length; i++) {
        console.log(allGalleryImg);
        if (allGalleryImg[i].keyword === chosenName) {
          let templetClone=$('#img-temp').clone();
          templetClone.find('h2').text(this.title);
          templetClone.find('p').text(this.description);
          templetClone.find('img').attr('src',this.image_url);
          templetClone.removeAttr('id','img-temp').attr('src',this.title);
          $('main').append(templetClone);
        }
      }
    }
    remitem();
  });
};
