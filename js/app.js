'use strict';

// let allGalleryImg=[];
let arrImage1=[];
let arrImage2=[];
let arrKeyWord=[];
let arrKeyWord2=[];
let options1;
let options2;
let newhorn;
let newhorn2;


function Image(gallery) {
  this.image_url = gallery.image_url;
  this.title = gallery.title;
  this.description = gallery.description;
  this.keyword = gallery.keyword;
  this.horns = gallery.horns;
}


Image.prototype.renderAuto = function() {
  let tamplete = $('#horn-template1').html();
  let html = Mustache.render(tamplete, this);
  $('#img-temp').append(html);
};




Image.prototype.filtiration = function() {
  if(!arrKeyWord.includes(this.keyword)){
    arrKeyWord.push(this.keyword);
    options1 = $(`<option value="${this.keyword}"></option>`).text(this.keyword);
    $(`#filteration1`).append(options1);
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
    newhorn= new Image(element);
    arrImage1.push(newhorn);
    newhorn.renderAuto();
    newhorn.filtiration();

  });
});

//----------filtir listOption 1---------------//
$('#filteration1').change(function() {
  console.log( this.value);
  arrImage1.forEach((element)=>{
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


//------------lab03----------------//

//-----------render the page2----------//

Image.prototype.renderWithMustache = function() {
  let tamplete = $('#horn-template2').html();
  let html = Mustache.render(tamplete, this);
  $('#mastachsec').append(html);
};

//---create list of option 2  -----------//

Image.prototype.filtiration2 = function() {
  if(!arrKeyWord2.includes(this.keyword)){
    arrKeyWord2.push(this.keyword);
    options2 = $(`<option value="${this.keyword}"></option>`).text(this.keyword);
    $(`#filteration2`).append(options2);

  }
};

const ajaxSetiings1 = {
  method: 'get',
  dataType: 'json'
};

$.ajax('data/page-2.json', ajaxSetiings1).then((data) => {
  data.forEach(element => {
    newhorn2= new Image(element);
    arrImage2.push(newhorn2);
    newhorn2.renderWithMustache();
    newhorn2.filtiration2();
  });

});

//----------filtir listOption 2---------------//
$('#filteration2').change(function() {
  console.log(this.value);
  arrImage2.forEach((element)=>{
    // console.log(element.keyword);
    if (this.value === element.keyword){
      $(`.${element.keyword}`).show();
    }else if (element.keyword !== this.value){
      $(`.${element.keyword}`).hide();
    } else {
      $(`.${element.keyword}`).show();
    }
  });
});



//-----default---------//
$('#mastachsec').hide();
$('#img-temp').show();
$('#filteration1').show();
$('#filteration2').hide();


//------click page1-------------//
$('#page1').on('click', function() {
  $('#filteration1').show();
  $('#mastachsec').hide();
  $('#img-temp').show();
  $('#filteration2').hide();

});



//------click page2-------------//
$('#page2').on('click', function() {
  $('#filteration2').show();
  $('#img-temp').hide();
  $('#mastachsec').show();
  $('#filteration1').hide();
  $('.filter2').hide();
  $('.animal2').hide();

  if($('#horns').is(':checked')) { 
    $('#horns').prop('checked', false);
  }

  $('#horns').change('click', function() {
    arrImage2.sort(function(a, b){return a.horns - b.horns;});
    arrImage2.forEach(element => {
      element.renderWithMustache();
    });
  });

  $('#title').change('click', function() {

    arrImage2.sort(function(a, b){
      // let aTit = ;
      // let bTit = ;
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    arrImage2.forEach(element => {
      element.renderWithMustache();
    });
  });
  arrImage2.forEach(element => {
    element.renderWithMustache();
  });
});


//-------horns sort page1 ---------------//
$('#horns').change('click', function() {
  $('.filter1').remove();
  $('.animal1').remove();
  arrImage1.sort(function(a, b){return a.horns - b.horns;});
  arrImage1.forEach(element => {
    element.renderAuto();
  });
});


$('#title').change('click', function() {
  $('.filter1').remove();
  $('.animal1').remove();
  arrImage1.sort(function(a, b){
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  arrImage1.forEach(element => {
    element.renderAuto();
  });
});
