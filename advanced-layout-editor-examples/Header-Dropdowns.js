document.addEventListener('DOMContentLoaded', function() {
	//"use strict"
	var i=0;
	var dropdownTrigger=document.querySelectorAll('.menulist .dropdown');
	for(i=0;i<dropdownTrigger.length;i++){
		dropdownTrigger[i].addEventListener('mouseover',dropdownMouseover,false);
		dropdownTrigger[i].addEventListener('mouseout',dropdownMouseout,false);
	}
	var dropdownMenu=document.querySelectorAll('.menulist .dropdown-menu');
	for(i=0;i<dropdownMenu.length;i++){
		dropdownMenu[i].addEventListener('mouseover',dropdownMouseover,false);
		dropdownMenu[i].addEventListener('mouseout',dropdownMouseout,false);
	}
	function dropdownMouseover(){
		// This could be the trigger or the dropdown menu.
		// Add isOver
		this.classList.add('isOver');
		// Determine whether we are hovering in the dropdown or over the trigger
		var menu;
		if (this.classList.contains('dropdown-menu')) {
			// We are in the dropdown. The menu is this.
			menu = this;
			menu.classList.add('isOver');
		} else {		
			// We are in the trigger. Locate the menu
			menu = this.querySelector('.dropdown-menu');
		}
		
		
		menu.style.display='block';
	}
	function dropdownMouseout(){
		// This could be the trigger or the dropdown menu.
		// Remove isOver
		this.classList.remove('isOver');
		// Determine whether we are hovering in the dropdown or over the trigger
		var menu;
		var parent = this;
		if (this.classList.contains('dropdown-menu')) {
			// We are in the dropdown. The menu is this.
			menu = this;
			menu.classList.remove('isOver');
			// We need to check the over state of the parent to be
			// sure the cursor has not moved back over the trigger.
			parent = this.parentNode;
		} else {		
			// We are in the trigger. Locate the menu
			menu = this.querySelector('.dropdown-menu');
		}
		
		// do not close if cursor is over menu.
		// We delay momentarily to give the cursor time to move.
		setTimeout(function(){
			if (!menu.classList.contains('isOver') && !parent.classList.contains('isOver')) {
				menu.style.display='none';
			}
		},100);
	}
	
});// JavaScript Document