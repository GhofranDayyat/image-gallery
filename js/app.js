'use strict';
let keyArr1 = [];
let arr1=[];
let keyArr2 = [];
let arr2=[];
let totalArr= [];

function Image(gallery) {
  this.image_url = gallery.image_url;
  this.title = gallery.title;
  this.description = gallery.description;
  this.keyword = gallery.keyword;
  this.horns = gallery.horns;
}


Image.prototype.creatTemplate = function (){
  $('main').append(`
  <div> id="unit">
  <h2>${this.title}</h2>
  <img src="${this.image_url}" alt="${this.title}">
  <p>${this.dscription} </p>
</div>`);
};

//----------mustach----------------//
Image.prototype.renderTemplet =function(){
  let templet = $('#img-temp').html();
  let html = Mustache.render(templet, this);
  $('main').append(html);
};
const ajaxSetting = {
  method: 'get',
  dataType: 'json',
};

$.ajax('data/page-1.json',ajaxSetting).then((data)=>{
  data.forEach(element =>{
    let newhorn= new Image(element);
    // console.log(newhorn);
    newhorn.renderTemplet();
  });

  keyArr1.forEach((element)=>{
    $('select').append(`<option value=${element}>${element} </option>`);
  });
});

$('select').change(function(){
  $('main').html('');
  let selectedOption = $(this).val();
  totalArr = arr1+arr2;
  totalArr.forEach(element=>{
    if (selectedOption === element.keyword){
      element.renderTemplet();

    }
  });
});

$('#page1').on('click', function(){
  $.ajax('data/page-1.json',ajaxSetting).then((data)=>{
    $('main').html('');
    $('select').html('');
    $('select').append(`
    <option value="default">Filter by Keyword</option>`
    );
    data.forEach(element =>{
      let newImg = new Image(element);
      arr1.push(newImg);
      if (!keyArr1.includes(newImg.keyword)){
        keyArr1.push(newImg.keyword);
      }
      newImg.renderTemplet();
    });
    keyArr1.forEach(element=>{
      $('select'.append(`<option value=${element}>${element}</option>`));
    });
  });
});


$('#page2').on('click', function(){
  $.ajax('data/page-2.json',ajaxSetting).then((data)=>{
    $('main').html('');
    $('select').html('');
    $('select').append(`
    <option value="default">Filter by Keyword</option>`
    );
    data.forEach(element =>{
      let newImg = new Image(element);
      arr2.push(newImg);
      if (!keyArr2.includes(newImg.keyword)){
        keyArr2.push(newImg.keyword);
      }
      newImg.renderTemplet();
    });
    keyArr2.forEach(element=>{
      $('select'.append(`<option value=${element}>${element}</option>`));
    });
  });
});
