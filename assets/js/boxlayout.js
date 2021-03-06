//@codekit-prepend "modernizr.BoxLayout.js"
//@codekit-prepend "jquery-1.9.1.js"

/**
 * boxlayout.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var Boxlayout = (function() {

	var $el = $('#bl-main'),
		$sections = $el.children( 'section' ),
		// works section
		// work items
		$items = $( '.item' ),
		// work panels
		// navigating the work panels
		$nextItem = $('.nextItem'),
		$prevItem = $('.prevItem'),
		// if currently navigating the work items
		isAnimating = false,
		// close work panel trigger
		$closeItem = $('.closeItem'),
		transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},
		// transition end event name
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		// support css transitions
		supportTransitions = Modernizr.csstransitions;

// additional variables by pdxiii
	//public to store the section
	var $currentSection,
			$currentPanel,
			$currentContainer,
			$currentItem,
			$panelIndex;

	function init() {
		initEvents();
	}

	function initEvents() {
		
		$sections.each( function() {
			
			var $section = $( this );

			// expand the clicked section and scale down the others
			$section.on( 'click', function() {
			$currentSection = $section;

				if( !$section.data( 'open' ) ) {
					$section.data( 'open', true ).addClass( 'bl-expand bl-expand-top' );
					$el.addClass( 'bl-expand-item' );
				}
			} ).find( 'button.closeSection' ).on( 'click', function() {
				
				
				// close the expanded section and scale up the others
				$section.data( 'open', false ).removeClass( 'bl-expand' ).on( transEndEventName, function( event ) {
					if( !$( event.target ).is( 'section' ) )
						{
							return false;
						}
					$( this ).off( transEndEventName ).removeClass( 'bl-expand-top' );
				} );

				if( !supportTransitions ) {
					$section.removeClass( 'bl-expand-top' );
				}

				$el.removeClass( 'bl-expand-item' );
				
				return false;

			} );

		} );

		// clicking on a work item: the current section scales down and the respective work panel slides up
		$items.on( 'click', function( event ) {

			// scale down main section
			$currentSection.addClass( 'bl-scale-down' );
			$currentContainer = $('.bl-panel-items.'+ $currentSection.attr('id'));
			// alert($currentContainer.attr('class'));

			// show panel for this work item
			$currentContainer.addClass( 'bl-panel-items-show' );

			$currentPanel = $currentContainer.find("[data-panel='" + $( this ).data( 'panel' ) + "']");
			$panelIndex = $currentPanel.index();
			$currentPanel.addClass( 'bl-show-work' );

			return false;

		} );

		// navigating the work items: current work panel scales down and the next work panel slides up
		$nextItem.on( 'click', function( event ) {

			
			if( isAnimating ) {
				return false;
			}
			isAnimating = true;

			var $panels = $currentContainer.children( 'div' );

			// var $currentPanel = $workPanels.eq( currentPanel );
			var $nextIndex = $panelIndex < $panels.length - 1 ? $panelIndex + 1 : 0;
			var $nextPanel = $panels.eq( $nextIndex );

			$currentPanel.removeClass( 'bl-show-work' ).addClass( 'bl-hide-current-work' ).on( transEndEventName, function( event ) {
				if( !$( event.target ).is( 'div' ) ) return false;
				$( this ).off( transEndEventName ).removeClass( 'bl-hide-current-work' );
				isAnimating = false;
			} );

			if( !supportTransitions ) {
				$currentPanel.removeClass( 'bl-hide-current-work' );
				isAnimating = false;
			}
			
			$nextPanel.addClass( 'bl-show-work' );

			$currentPanel = $nextPanel;
			$panelIndex = $nextIndex;

			return false;

		} );

		$prevItem.on( 'click', function( event ) {

			
			if( isAnimating ) {
				return false;
			}
			isAnimating = true;

			var $panels = $currentContainer.children( 'div' );

			// var $currentPanel = $workPanels.eq( currentPanel );
			var $prevIndex = $panelIndex === 0 ? $panels.length - 1 : $panelIndex - 1 ;
			var $prevPanel = $panels.eq( $prevIndex );

			$currentPanel.removeClass( 'bl-show-work' ).addClass( 'bl-hide-current-work' ).on( transEndEventName, function( event ) {
				if( !$( event.target ).is( 'div' ) ) return false;
				$( this ).off( transEndEventName ).removeClass( 'bl-hide-current-work' );
				isAnimating = false;
			} );

			if( !supportTransitions ) {
				$currentPanel.removeClass( 'bl-hide-current-work' );
				isAnimating = false;
			}
			
			$prevPanel.addClass( 'bl-show-work' );

			$currentPanel = $prevPanel;
			$panelIndex = $prevIndex;

			return false;

		} );

		// clicking the work panels close button: the current work panel slides down and the section scales up again
		$closeItem.on( 'click', function( event ) {

			// scale up main section
			$currentSection.removeClass( 'bl-scale-down' );
			$currentContainer.removeClass( 'bl-panel-items-show' );
			$currentPanel.removeClass( 'bl-show-work' );
			
			return false;

		} );

	}

	return { init : init };

})();