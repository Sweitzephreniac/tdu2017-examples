function initTabs() {
	$('.template-name-id').each(function() {
		var templatedata = this.value.split('|');
		$('#templateselector').append('<option value="' + templatedata[1] + '">' + templatedata[0] + '</option>');
	});
	$('#templateselector').change(function() {
		if (this.value != 0) {importTemplate(this.value);}
	});
}

function importTemplate(docid) {
	var confirmimport = confirm('Import the selected template?');
	if (confirmimport) {
		$('iframe[title="Rich Text Editor, brochure_content"]').each(function() {
			var curcontent = $('body', this.contentWindow.document||this.contentDocument).html();
			$('body', this.contentWindow.document||this.contentDocument).load('index.cfm?FuseAction=PublicDocuments.View&File_ID=' + docid + ' #brochure-tabs-content', function () {
				$('iframe[title="Rich Text Editor, brochure_content"]').each(function() {
					if (curcontent != '' && curcontent.indexOf('brochure-tabs-content') == -1) {
						$('.tab-content', this.contentWindow.document||this.contentDocument).first().html(curcontent);
					}
				});
			});
		});
	}
	$('#templateselector').val('0');
}

function showAddField() {
	$('#newtab').css('display','inline').prev().css('display','none').next().next().css('display','inline');
}

function addTab() {
	var newtabname = $('#newtab').val();
	if (newtabname != "") {
		newtabname = newtabname.replace(/ /g, '\u00a0');
		$('iframe[title="Rich Text Editor, brochure_content"]').each(function() {
			$('#brochure-tabs-content', this.contentWindow.document||this.contentDocument).append('<div class="tab-header"><h1>' + newtabname + '</h1></div><section class="tab-content" id="' + newtabname + '">Lorem ipsum</section><div class="tab-float-clear" style="display: table; clear: both;">&nbsp;</div>');
		});
		$('#newtab').val('').css('display','none').prev().css('display','inline').next().next().css('display','none');;
	}
}

function fetchTabs() {
	$('iframe[title="Rich Text Editor, brochure_content"]').each(function() {
		$('#tabselector').html('');
		$('.tab-content', this.contentWindow.document||this.contentDocument).each(function () {
			var tabname = $(this).attr('id');
			$('#tabselector').append('<option value="' + tabname + '">' + tabname + '</option>');
		});
		if ($('#tabselector').html() != '') {
			$('#tabselector').css('display','inline');
			$('#removetabbutton').css('display','inline');
			$('#fetchtabs').css('display','none');
		}
	});
}

function deleteTab() {
	var tabtodelete = $('#tabselector').find(":selected").text();
	tabtodelete = tabtodelete.replace(/ /g, '\u00a0');
	$('iframe[title="Rich Text Editor, brochure_content"]').each(function() {
		$('#' + tabtodelete, this.contentWindow.document||this.contentDocument).prev().remove();
		$('#' + tabtodelete, this.contentWindow.document||this.contentDocument).next().remove();
		$('#' + tabtodelete, this.contentWindow.document||this.contentDocument).remove();
	});
	$('#tabselector').css('display','none').html('');
	$('#removetabbutton').css('display','none');
	$('#fetchtabs').css('display','inline');	
}

function convertTemplate() {
	$('iframe[title="Rich Text Editor, brochure_content"]').each(function() {
		$('#brochure-tabs-content', this.contentWindow.document||this.contentDocument).find('div.tab-content').each(function(){
			var sectionid = $(this).attr('id');
			var sectioninnerhtml = $(this).html();
			var sectionhtml = '<section class="tab-content" id="' + sectionid + '">' + sectioninnerhtml + '</section>';
			$(this).before(sectionhtml);
		}).remove();
	});
}