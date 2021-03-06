/**
 * Mon Feb 13, 2012 23:43:08 added by Thanh Son 
 * Email: thanhson1085@gmail.com 
 */


var jkmegamenu={

effectduration: 100, //duration of animation, in milliseconds
delaytimer: 300, //delay after mouseout before menu should be hidden, in milliseconds

//No need to edit beyond here
megamenulabels: [],
megamenus: [], //array to contain each block menu instances
zIndexVal: 1000, //starting z-index value for drop down menu
$shimobj: null,

addshim:function($){
	$(document.body).append('<!--IFRAME id="outlineiframeshim" src="'+(location.protocol=="https:"? 'blank.htm' : 'about:blank')+'" style="display:none; left:0; top:0; z-index:999; position:absolute; filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)" frameBorder="0" scrolling="no"></IFRAME-->')
	this.$shimobj=$("#outlineiframeshim")
},

alignmenu:function($, e, megamenu_pos){
	var megamenu=this.megamenus[megamenu_pos]
	var $anchor=megamenu.$anchorobj
	var $menu=megamenu.$menuobj
	var menuleft=($(window).width()-(megamenu.offsetx-$(document).scrollLeft())>megamenu.actualwidth)? megamenu.offsetx : megamenu.offsetx-megamenu.actualwidth+megamenu.anchorwidth //get x coord of menu
	//var menutop=($(window).height()-(megamenu.offsety-$(document).scrollTop()+megamenu.anchorheight)>megamenu.actualheight)? megamenu.offsety+megamenu.anchorheight : megamenu.offsety-megamenu.actualheight
	var menutop=megamenu.offsety+megamenu.anchorheight  //get y coord of menu
	menuleft = megamenu.$anchorobj.offset().left
	$menu.css({left:menuleft+"px", top:menutop+"px"})
	//alert(menuleft)
	this.$shimobj.css({width:megamenu.actualwidth+"px", height:megamenu.actualheight+"px", left:menuleft+"px", top:menutop+"px", display:"block"})
},

showmenu:function(e, megamenu_pos){
	var megamenu=this.megamenus[megamenu_pos]
	var $menu=megamenu.$menuobj
	var $menuinner=megamenu.$menuinner
	if ($menu.css("display")=="none"){
		this.alignmenu(jQuery, e, megamenu_pos)
		$menu.css("z-index", ++this.zIndexVal)
		$menu.show(this.effectduration, function(){
			$menuinner.css('visibility', 'visible')
		})
	}
	else if ($menu.css("display")=="block" && e.type=="click"){ //if menu is hidden and this is a "click" event (versus "mouseout")
		this.hidemenu(e, megamenu_pos)
	}
	return false
},

hidemenu:function(e, megamenu_pos){
	var megamenu=this.megamenus[megamenu_pos]
	var $menu=megamenu.$menuobj
	var $menuinner=megamenu.$menuinner
	$menuinner.css('visibility', 'hidden')
	this.$shimobj.css({display:"none", left:0, top:0})
	$menu.hide(this.effectduration)
},

definemenu:function(anchorid, menuid, revealtype){
	this.megamenulabels.push([anchorid, menuid, revealtype])
},

render:function($){
	for (var i=0, labels=this.megamenulabels[i]; i<this.megamenulabels.length; i++, labels=this.megamenulabels[i]){
		if ($(labels[0]).length!=1 || $(labels[1]).length!=1) //if one of the two elements are NOT defined, exist
			return
		this.megamenus.push({$anchorobj:$(labels[0]), $menuobj:$(labels[1]), $menuinner:$(labels[1]).children('ul:first-child'), revealtype:labels[2], hidetimer:null})
		var megamenu=this.megamenus[i]	
		megamenu.$anchorobj.add(megamenu.$menuobj).attr("_megamenupos", i+"pos") //remember index of this drop down menu
		megamenu.actualwidth=megamenu.$menuobj.outerWidth()
		megamenu.actualheight=megamenu.$menuobj.outerHeight()
		megamenu.offsetx=megamenu.$anchorobj.offset().left
		megamenu.offsety=megamenu.$anchorobj.offset().top
		megamenu.anchorwidth=megamenu.$anchorobj.outerWidth()
		megamenu.anchorheight=megamenu.$anchorobj.outerHeight()
		$(document.body).append(megamenu.$menuobj) //move drop down menu to end of document
		megamenu.$menuobj.css("z-index", ++this.zIndexVal).hide()
		megamenu.$menuinner.css("visibility", "hidden")
		megamenu.$anchorobj.bind(megamenu.revealtype=="click"? "click" : "mouseenter", function(e){
			var menuinfo=jkmegamenu.megamenus[parseInt(this.getAttribute("_megamenupos"))]
			clearTimeout(menuinfo.hidetimer) //cancel hide menu timer
			return jkmegamenu.showmenu(e, parseInt(this.getAttribute("_megamenupos")))
		})
		megamenu.$anchorobj.bind("mouseleave", function(e){
			var menuinfo=jkmegamenu.megamenus[parseInt(this.getAttribute("_megamenupos"))]
			if (e.relatedTarget!=menuinfo.$menuobj.get(0) && $(e.relatedTarget).parents(menuinfo.$menuobj.get(0).id).length==0){ //check that mouse hasn't moved into menu object
				menuinfo.hidetimer=setTimeout(function(){ //add delay before hiding menu
					jkmegamenu.hidemenu(e, parseInt(menuinfo.$menuobj.get(0).getAttribute("_megamenupos")))
				}, jkmegamenu.delaytimer)
			}
		})
		megamenu.$menuobj.bind("mouseenter", function(e){
			var menuinfo=jkmegamenu.megamenus[parseInt(this.getAttribute("_megamenupos"))]
			clearTimeout(menuinfo.hidetimer) //cancel hide menu timer
		})
		megamenu.$menuobj.bind("click mouseleave", function(e){
			var menuinfo=jkmegamenu.megamenus[parseInt(this.getAttribute("_megamenupos"))]
			menuinfo.hidetimer=setTimeout(function(){ //add delay before hiding menu
				jkmegamenu.hidemenu(e, parseInt(menuinfo.$menuobj.get(0).getAttribute("_megamenupos")))
			}, jkmegamenu.delaytimer)
		})
	} //end for loop
	if(/Safari/i.test(navigator.userAgent)){ //if Safari
		$(window).bind("resize load", function(){
			for (var i=0; i<jkmegamenu.megamenus.length; i++){
				var megamenu=jkmegamenu.megamenus[i]
				var $anchorisimg=(megamenu.$anchorobj.children().length==1 && megamenu.$anchorobj.children().eq(0).is('img'))? megamenu.$anchorobj.children().eq(0) : null
				if ($anchorisimg){ //if anchor is an image link, get offsets and dimensions of image itself, instead of parent A
					megamenu.offsetx=$anchorisimg.offset().left
					megamenu.offsety=$anchorisimg.offset().top
					megamenu.anchorwidth=$anchorisimg.width()
					megamenu.anchorheight=$anchorisimg.height()
				}
			}
		})
	}
	else{
		$(window).bind("resize", function(){
			for (var i=0; i<jkmegamenu.megamenus.length; i++){
				var megamenu=jkmegamenu.megamenus[i]	
				megamenu.offsetx=megamenu.$anchorobj.offset().left
				megamenu.offsety=megamenu.$anchorobj.offset().top
			}
		})
	}
	jkmegamenu.addshim($)
}

}
function display(){ 
	if (milisec == 0 && seconds == 0){
		jQuery('#i-submit-form').submit();
	}
 if (milisec<=0){ 
    milisec=60
    seconds-=1 
 } 
 if (seconds<=-1){ 
    milisec=0 
    seconds+=1 
 } 
  else 
    milisec-=1 
	if (milisec < 10){
		milisecs = '0' + milisec;
	}
	else{
		milisecs = milisec;
	}
	 if (seconds < 10){
		second = '0' + seconds;
	}
	else{
		second = seconds;
	}
    jQuery('#clock').html(second+":"+milisecs); 
    setTimeout("display()",1000) 
}
 
var milisec=0 
var seconds;
var question_list="";
var current_question = 1;
var passed_list="<span> Những câu hỏi đã làm xong:</span>";
jQuery(document).ready(function($){
	//alert(jQuery('#max-time').html());

	jQuery('#i-submit-form').submit(function(){
		
		if ( jQuery('input[name="yourname"]').val() == "" && jQuery('input[name="yourclass"]').val() == ""){
			jQuery('.q-message').html('Vui lòng nhập tên và lớp học của bạn!');
			jQuery('.q-message').fadeIn(300);
			//setTimeout("jQuery('#q-message').fadeOut(300)",10000)
			return false;
		}
	})
	seconds = jQuery('#max-time').html(); 
	jkmegamenu.render($)
//Timer
	
	//document.getElementById("clock").firstChild.nodeValue ='30' 
	if(typeof jQuery('#clock').attr('id') != 'undefined'){
		display(); 
	}
//end
	jQuery('.megamenu').each(function(){ 
		var found = jQuery(this).find('.column ul li');
		if(found.length == 0){
			var sub_menu = jQuery(this).find('.column h3');
			sub_menu.css('font-weight','normal');
		}
		found = jQuery(this).find('.s-current-menu');
		if(found.length != 0){
			var strsubmenu = jQuery(this).attr('id');
			var strparrentmenu = strsubmenu.replace('sub','');
			jQuery('#'+strparrentmenu).parent().attr('class','s-current-menu');
		}
	});
	
	jQuery('.d-page-container').css('height',jQuery(window).height());
	jQuery('#page').css('min-height',jQuery(window).height());

	jQuery('.d-page').css('top',jQuery(window).height()/2 - jQuery('.d-page').height()/2);
	jQuery('.tq-content-container .q-content-container').each(function(){ 
		jQuery(this).fadeIn(300);
		return false;
	});
	
	
	jQuery('.btn-next').click(function(){
		
		var oThis = jQuery(this).parent().parent();
		
		var oTrues = jQuery(this).parent().parent().find('.True input');
		var b = true;
		oTrues.each(function(){
			//var iTrue = jQuery(this).find('input');
			if (!jQuery(this).attr('checked')){
				//alert('thanh son');
				b = false;
			}
		});
		var oFalses = jQuery(this).parent().parent().find('.False input');
		var c = true;;
		oFalses.each(function(){
			//var iFalse = jQuery(this).find('input');
			if (jQuery(this).attr('checked')){
			
				c = false;
			}
		});
		var oTexts = jQuery(this).parent().parent().find('p input[type="text"]');
		var d = true;;
		oTexts.each(function(){
			var iP = jQuery(this).parent();
			if (jQuery(this).val().trim().toUpperCase() != iP.attr('class').trim().toUpperCase()){
				d = false;
			}
		});
		var oNext = jQuery(this).parent().parent().next('.q-content-container.notyet');
		if (b && c && d){
			jQuery('#i-message').css('display','none');
			oThis.css('display','none');
			if (typeof oNext.attr('class') !== 'undefined'){
				oNext.fadeIn(300);
				var i = jQuery('#true-answers').html();
				i++;
				jQuery('#i-passed-list').fadeIn(300);
				jQuery('#true-answers').html(i);
				oThis.attr('class','q-content-container true');
				oThis.find('input').attr('disabled','disabled');
				passed_list += '<span>'+jQuery('.'+oThis.attr('id')).html()+', </span>';
				jQuery('#i-passed-list').html(passed_list);
				current_question++;
				jQuery('#no-answers').html(current_question);
			
		
			}		
			else{
				var i = jQuery('#true-answers').html();
				i++;
				jQuery('#true-answers').html(i);
				oThis.attr('class','q-content-container true');
				oThis.find('input').attr('disabled','disabled');
				passed_list += '<span>'+jQuery('.'+oThis.attr('id')).html()+', </span>';
				jQuery('#i-passed-list').html(passed_list);
				var e = true;
				jQuery('.q-content-container.notyet').each(function(){
					
					jQuery('.q-content-container').css('display','none');
					jQuery(this).fadeIn(300);
					current_question = jQuery(this).attr('id').substring(7);
					jQuery('#no-answers').html(current_question);

					e = false;
					return;
				});
				if (e){
					jQuery('#i-message').css('display','none');
					jQuery('#i-message').html('Chúc mừng! Bạn đã hoàn thành bài kiểm tra.');
					jQuery('#i-message').fadeIn(1000);
				}
				//jQuery('#i-message').fadeOut(1000);
			}
		}
		else{
			jQuery('#i-message').css('display','none');
			jQuery('#i-message').html('Bạn trả lời chưa đúng! Vui lòng thử lại.');
			jQuery('#i-message').fadeIn(1000);
			//jQuery('#i-message').fadeOut(1000);
		}
	});
	jQuery('.btn-bypass').click(function(){
		var oThis = jQuery(this).parent().parent();
		oThis.css('display','none');
		var oNext = jQuery(this).parent().parent().next('.q-content-container.notyet');
		if (typeof oNext.attr('class') !== 'undefined'){
			jQuery('#i-message').css('display','none');
			oNext.fadeIn(300);
			current_question++;
			jQuery('#no-answers').html(current_question);
				
		}		
		else{
			jQuery('#i-message').css('display','none');
				var e = true;
				jQuery('.q-content-container.notyet').each(function(){
					
					jQuery('.q-content-container').css('display','none');
					jQuery(this).fadeIn(300);
					current_question = jQuery(this).attr('id').substring(7);
					jQuery('#no-answers').html(current_question);

					e = false;
					return;
				});
			
				if (e){
					jQuery('#i-message').css('display','none');
					jQuery('#i-message').html('Chúc mừng! Bạn đã hoàn thành bài kiểm tra.');
					jQuery('#i-message').fadeIn(1000);
				}
		}
	});
	var i = 0;
		jQuery('.q-content-container').each(function(){
		i ++;
		question_list += '<span class="'+jQuery(this).attr('id')+'">Câu '+i+'</span> ';	
		});
	jQuery('#i-question-list').html(question_list);
	jQuery('#i-question-list span').click(function(){
		jQuery('.q-content-container').css('display','none');
		jQuery('#'+jQuery(this).attr('class')).fadeIn(300);
		current_question = jQuery(this).attr('class').substring(7);
		jQuery('#no-answers').html(current_question);
		
	});

})



